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
        `https://music.163.com/api/song/detail?id=${trackId}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
            Referer: "https://music.163.com/",
          },
        }
      );
      if (!response.ok) throw new Error("获取歌曲详情失败");
      const data = await response.json();

      if (!data.songs || !data.songs[0]) {
        throw new Error("获取的歌曲详情格式不正确");
      }

      const song = data.songs[0];
      return {
        title: song.name,
        artist:
          (song.artists || song.ar)?.map((a) => a.name).join("/") || "未知歌手",
        album: (song.album || song.al)?.name || "未知专辑",
        cover: (song.album || song.al)?.picUrl || null,
        duration: song.duration || (song.dt ? song.dt / 1000 : 0),
      };
    } catch (error) {
      console.error("获取歌曲详情失败:", error);
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
    // 优先使用直连API
    const directUrl = `https://music.163.com/song/media/outer/url?id=${trackId}.mp3`;

    try {
      // 尝试直连API
      const directResponse = await fetch(directUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Referer: "https://music.163.com/",
        },
      });

      if (directResponse.ok) {
        return directUrl;
      }

      // 如果直连失败，尝试代理API
      const response = await fetch(`${this.apiBaseUrl}/song/url?id=${trackId}`);
      if (!response.ok) throw new Error("获取歌曲URL失败");
      const data = await response.json();

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
        // 如果代理API也失败，返回直连URL作为最后尝试
        return directUrl;
      }

      return url;
    } catch (error) {
      console.error("获取歌曲URL失败:", error);
      // 发生错误时返回直连URL作为最后尝试
      return directUrl;
    }
  }
}
