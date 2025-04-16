"use client";

import { MusicSourceInterface } from "./MusicSourceInterface";

export class NeteaseMusicSource extends MusicSourceInterface {
  constructor(playlistId = "13153655441") {
    super();
    this.playlistId = playlistId;
    this.apiBaseUrl = "/api/netease"; // 需要创建的API端点
  }

  setPlaylistId(playlistId) {
    this.playlistId = playlistId;
  }

  async getPlaylist() {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/playlist?id=${this.playlistId}`
      );
      if (!response.ok) throw new Error("获取网易云歌单失败");
      const data = await response.json();

      // 处理网易云音乐API返回的不同可能的结构
      let tracks = [];

      // 方式1: 标准网易云API返回格式
      if (data.result && Array.isArray(data.result.tracks)) {
        tracks = data.result.tracks;
      }
      // 方式2: 直接歌曲数组
      else if (Array.isArray(data.tracks)) {
        tracks = data.tracks;
      }
      // 方式3: 歌曲数组可能在songs字段中
      else if (Array.isArray(data.songs)) {
        tracks = data.songs;
      }
      // 方式4: 单个歌曲对象
      else if (data.songs && Array.isArray(data.songs)) {
        tracks = data.songs;
      }

      if (!tracks.length) {
        throw new Error("获取的歌单格式不正确或歌单为空");
      }

      return tracks.map((track) => {
        // 处理不同的字段命名（标准API vs 第三方API）
        const artists = track.artists || track.ar || [];
        const album = track.album || track.al || {};
        const name = track.name || track.title || "未知歌曲";

        return {
          id: track.id.toString(),
          name: name,
          artists: artists.map((a) => ({
            id: a.id?.toString() || "",
            name: a.name || "未知歌手",
          })),
          album: {
            id: album.id?.toString() || "",
            name: album.name || "未知专辑",
            picUrl: album.picUrl || null,
          },
          duration: track.duration || track.dt || 0,
          fee: track.fee || 0,
          pop: track.pop || track.popularity || 0,
        };
      });
    } catch (error) {
      console.error("获取歌单失败:", error);
      return [];
    }
  }

  async getMetadata(trackId) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/song/detail?ids=${trackId}`
      );
      if (!response.ok) throw new Error("获取歌曲详情失败");
      const data = await response.json();

      // 打印完整的返回数据，便于调试
      console.log("歌曲详情返回数据:", JSON.stringify(data));

      // 检查不同可能的数据结构
      let song = null;

      // 尝试标准格式
      if (data.songs && data.songs[0]) {
        song = data.songs[0];
      }
      // 尝试result格式
      else if (data.result && data.result.songs && data.result.songs[0]) {
        song = data.result.songs[0];
      }
      // 直接使用歌单中的歌曲数据
      else if (data.result && data.result.tracks && data.result.tracks[0]) {
        // 如果是playlist/detail的数据，尝试查找匹配的歌曲
        const tracks = data.result.tracks;
        song =
          tracks.find((t) => t.id.toString() === trackId.toString()) ||
          tracks[0];
      }

      if (!song) {
        console.error("未找到歌曲详情,返回数据结构:", data);
        throw new Error("获取的歌曲详情格式不正确");
      }

      // 适应不同的字段命名
      return {
        title: song.name,
        artist:
          (song.artists || song.ar)?.map((a) => a.name).join("/") || "未知歌手",
        album: (song.album || song.al)?.name || "未知专辑",
        cover: (song.album || song.al)?.picUrl || null,
        duration: song.duration || (song.dt ? song.dt / 1000 : 0), // 将毫秒转换为秒
      };
    } catch (error) {
      console.error("获取歌曲详情失败:", error);
      // 返回基本信息，不中断播放
      return {
        title: `歌曲 ID: ${trackId}`,
        artist: "未知歌手",
        album: "未知专辑",
        cover: null,
        duration: 0,
      };
    }
  }

  async getAudioUrl(trackId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/song/url?id=${trackId}`);
      if (!response.ok) throw new Error("获取歌曲URL失败");
      const data = await response.json();

      // 打印完整的返回数据，便于调试
      console.log("歌曲URL返回数据:", JSON.stringify(data));

      // 尝试不同的数据结构
      let url = null;

      if (data.data && data.data[0] && data.data[0].url) {
        url = data.data[0].url;
      } else if (
        data.result &&
        data.result.data &&
        data.result.data[0] &&
        data.result.data[0].url
      ) {
        url = data.result.data[0].url;
      }

      if (!url) {
        console.error("未找到歌曲URL,返回数据结构:", data);
        // 备选方案：尝试使用固定URL格式
        return `https://music.163.com/song/media/outer/url?id=${trackId}.mp3`;
      }

      return url;
    } catch (error) {
      console.error("获取歌曲URL失败:", error);
      // 备选方案：尝试使用固定URL格式
      return `https://music.163.com/song/media/outer/url?id=${trackId}.mp3`;
    }
  }
}
