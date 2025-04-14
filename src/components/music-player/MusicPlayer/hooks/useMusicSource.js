"use client";

import { useState, useEffect } from 'react';
import { MusicSourceManager } from '../services/MusicSourceManager';

const musicSourceManager = new MusicSourceManager();

export const useMusicSource = () => {
  const [playlist, setPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPlaylist = async () => {
    try {
      setIsLoading(true);
      const source = musicSourceManager.getCurrentSource();
      const newPlaylist = await source.getPlaylist();
      console.log('加载播放列表成功:', newPlaylist.length, '首歌曲');
      setPlaylist(newPlaylist);
      setError(null);
    } catch (err) {
      console.error('加载播放列表失败:', err);
      setError(err.message);
      setPlaylist([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMetadata = async (trackId) => {
    try {
      const source = musicSourceManager.getCurrentSource();
      return await source.getMetadata(trackId);
    } catch (err) {
      console.error('Error loading metadata:', err);
      return null;
    }
  };

  const getAudioUrl = async (trackId) => {
    try {
      const source = musicSourceManager.getCurrentSource();
      const url = await source.getAudioUrl(trackId);
      console.log('获取音频URL成功:', url);
      return url;
    } catch (err) {
      console.error('Error getting audio URL:', err);
      // 尝试使用备选URL格式 - 适用于网易云
      const backupUrl = `https://music.163.com/song/media/outer/url?id=${trackId}.mp3`;
      console.log('使用备选URL:', backupUrl);
      return backupUrl;
    }
  };

  const switchSource = async (sourceName) => {
    try {
      console.log('切换音乐源:', sourceName);
      musicSourceManager.switchSource(sourceName);
      await loadPlaylist();
    } catch (err) {
      console.error('切换音乐源失败:', err);
      setError(err.message);
    }
  };

  // 初始加载播放列表
  useEffect(() => {
    loadPlaylist();
  }, []);

  return {
    playlist,
    isLoading,
    error,
    loadMetadata,
    getAudioUrl,
    switchSource,
    registerSource: musicSourceManager.registerSource.bind(musicSourceManager),
    reloadPlaylist: loadPlaylist
  };
}; 