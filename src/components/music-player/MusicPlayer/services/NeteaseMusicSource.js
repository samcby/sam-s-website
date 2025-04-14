"use client";

import { MusicSourceInterface } from './MusicSourceInterface';

export class NeteaseMusicSource extends MusicSourceInterface {
  constructor(playlistId = '13153655441') {
    super();
    this.playlistId = playlistId;
    this.apiBaseUrl = '/api/netease'; // 需要创建的API端点
  }

  setPlaylistId(playlistId) {
    this.playlistId = playlistId;
  }

  async getPlaylist() {
    try {
      console.log('开始获取歌单, ID:', this.playlistId);
      const response = await fetch(`${this.apiBaseUrl}/playlist?id=${this.playlistId}`);
      if (!response.ok) throw new Error('获取网易云歌单失败');
      const data = await response.json();
      
      // 打印完整的返回数据，便于调试
      console.log('歌单API返回数据:', data);
      
      // 处理网易云音乐API返回的不同可能的结构
      let tracks = [];
      
      // 方式1: 标准网易云API返回格式
      if (data.result && Array.isArray(data.result.tracks)) {
        console.log('检测到标准网易云API歌单格式');
        tracks = data.result.tracks;
        
        // 打印前5首歌曲的标题
        if (tracks.length > 0) {
          console.log('歌单中的部分歌曲:', tracks.slice(0, 5).map(t => t.name).join(', '), `...等${tracks.length}首`);
        }
      }
      // 方式2: 直接歌曲数组
      else if (Array.isArray(data.tracks)) {
        console.log('检测到直接歌曲数组格式');
        tracks = data.tracks;
      }
      // 方式3: 歌曲数组可能在songs字段中
      else if (Array.isArray(data.songs)) {
        console.log('检测到songs字段格式');
        tracks = data.songs;
      }
      // 方式4: 单个歌曲对象
      else if (data.songs && Array.isArray(data.songs)) {
        console.log('检测到歌曲详情格式');
        tracks = data.songs;
      }
      
      if (!tracks.length) {
        console.error('无法解析歌单数据，原始数据:', data);
        throw new Error('获取的歌单格式不正确或歌单为空');
      }
      
      console.log(`成功解析歌单，包含 ${tracks.length} 首歌曲`);
      
      return tracks.map(track => {
        // 处理不同的字段命名（标准API vs 第三方API）
        const artists = track.artists || track.ar || [];
        const album = track.album || track.al || {};
        
        return {
          id: track.id.toString(),
          title: track.name,
          artist: artists?.map(a => a.name).join('/') || '未知歌手',
          album: album?.name || '未知专辑',
          src: '',  // 通过getAudioUrl获取
          cover: album?.picUrl || null,
          // 添加额外信息，便于显示
          duration: track.duration || track.dt || 0, 
          fee: track.fee, // 版权信息: 0免费, 1VIP可听
          pop: track.pop || track.popularity || 0 // 流行度
        };
      });
    } catch (error) {
      console.error('获取网易云歌单失败:', error);
      
      // 紧急情况：返回一个硬编码的歌单
      console.log('使用备用硬编码歌单');
      return [{
        id: "408532862",
        title: "Bring Back The Summer (Not Your Dope Remix)",
        artist: "Not Your Dope/Rain Man/Oly",
        album: "Bring Back The Summer (Not Your Dope Remix)",
        src: `https://music.163.com/song/media/outer/url?id=408532862.mp3`,
        cover: "https://p2.music.126.net/zZAqP1ZDlOuXnxrJPUyedQ==/1401877329699060.jpg"
      }];
    }
  }

  async getMetadata(trackId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/song/detail?ids=${trackId}`);
      if (!response.ok) throw new Error('获取歌曲详情失败');
      const data = await response.json();
      
      // 打印完整的返回数据，便于调试
      console.log('歌曲详情返回数据:', JSON.stringify(data));
      
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
        song = tracks.find(t => t.id.toString() === trackId.toString()) || tracks[0];
      }
      
      if (!song) {
        console.error('未找到歌曲详情,返回数据结构:', data);
        throw new Error('获取的歌曲详情格式不正确');
      }
      
      // 适应不同的字段命名
      return {
        title: song.name,
        artist: (song.artists || song.ar)?.map(a => a.name).join('/') || '未知歌手',
        album: (song.album || song.al)?.name || '未知专辑',
        cover: (song.album || song.al)?.picUrl || null,
        duration: song.duration || (song.dt ? song.dt / 1000 : 0) // 将毫秒转换为秒
      };
    } catch (error) {
      console.error('获取歌曲详情失败:', error);
      // 返回基本信息，不中断播放
      return {
        title: `歌曲 ID: ${trackId}`,
        artist: '未知歌手',
        album: '未知专辑',
        cover: null,
        duration: 0
      };
    }
  }

  async getAudioUrl(trackId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/song/url?id=${trackId}`);
      if (!response.ok) throw new Error('获取歌曲URL失败');
      const data = await response.json();
      
      // 打印完整的返回数据，便于调试
      console.log('歌曲URL返回数据:', JSON.stringify(data));
      
      // 尝试不同的数据结构
      let url = null;
      
      if (data.data && data.data[0] && data.data[0].url) {
        url = data.data[0].url;
      } else if (data.result && data.result.data && data.result.data[0] && data.result.data[0].url) {
        url = data.result.data[0].url;
      }
      
      if (!url) {
        console.error('未找到歌曲URL,返回数据结构:', data);
        // 备选方案：尝试使用固定URL格式
        return `https://music.163.com/song/media/outer/url?id=${trackId}.mp3`;
      }
      
      return url;
    } catch (error) {
      console.error('获取歌曲URL失败:', error);
      // 备选方案：尝试使用固定URL格式
      return `https://music.163.com/song/media/outer/url?id=${trackId}.mp3`;
    }
  }
} 