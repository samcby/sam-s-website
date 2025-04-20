import { useState, useEffect, useCallback } from "react";

export const useLyricCache = () => {
  // 缓存对象: { [trackId]: { lyrics: Array, info: Object } }
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(null);

  // 解析LRC格式歌词
  const parseLyric = (lrc) => {
    if (!lrc) return [];

    // 移除可能存在的BOM和空格
    const lyric = lrc.replace(/^\uFEFF/, "").replace(/^\s+|\s+$/g, "");

    // 按行分割
    const lines = lyric.split("\n");

    // 匹配时间标签的正则表达式：[00:00.000]
    const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?\]/g;

    const result = [];

    // 处理每一行歌词
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // 跳过空行
      if (!line) continue;

      // 重置正则匹配位置
      timeExp.lastIndex = 0;

      // 提取当前行的所有时间标签
      const timeMatches = [];
      let match;

      while ((match = timeExp.exec(line)) !== null) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const milliseconds = match[3]
          ? parseInt(match[3].padEnd(3, "0"), 10)
          : 0;

        // 转换为总秒数
        const time = minutes * 60 + seconds + milliseconds / 1000;
        timeMatches.push(time);
      }

      // 提取歌词文本（去除所有时间标签）
      const text = line.replace(timeExp, "").trim();

      // 如果没有文本内容，跳过
      if (!text) continue;

      // 每个时间标签对应一条歌词
      for (let j = 0; j < timeMatches.length; j++) {
        result.push({
          time: timeMatches[j],
          text: text,
        });
      }
    }

    // 按时间顺序排序
    result.sort((a, b) => a.time - b.time);

    return result;
  };

  // 获取歌词数据
  const fetchLyrics = useCallback(
    async (trackId) => {
      try {
        setLoading(true);

        // 如果已经缓存，直接返回
        if (cache[trackId]) {
          return cache[trackId];
        }

        // 获取歌词
        const response = await fetch(`/api/netease/lyric?id=${trackId}`);
        if (!response.ok) throw new Error("获取歌词失败");

        const data = await response.json();

        const result = {
          lyrics: [],
          translatedLyrics: [],
          songInfo: null,
        };

        if (data.lrc && data.lrc.lyric) {
          result.lyrics = parseLyric(data.lrc.lyric);

          // 解析翻译歌词
          if (data.tlyric && data.tlyric.lyric) {
            result.translatedLyrics = parseLyric(data.tlyric.lyric);
          }
        }

        // 获取歌曲信息
        const songResponse = await fetch(
          `/api/netease/song/detail?ids=${trackId}`
        );
        if (songResponse.ok) {
          const songData = await songResponse.json();
          if (songData.songs && songData.songs[0]) {
            const song = songData.songs[0];
            result.songInfo = {
              name: song.name,
              artist:
                (song.artists || song.ar)?.map((a) => a.name).join("/") ||
                "未知歌手",
            };
          }
        }

        // 更新缓存
        setCache((prev) => ({
          ...prev,
          [trackId]: result,
        }));

        return result;
      } catch (error) {
        console.error("获取歌词失败:", error);
        return { lyrics: [], translatedLyrics: [], songInfo: null };
      } finally {
        setLoading(false);
      }
    },
    [cache]
  );

  // 预加载特定歌曲ID的歌词
  const preloadLyrics = useCallback(
    async (trackId) => {
      if (!trackId || cache[trackId]) return;

      setCurrentTrackId(trackId);
      await fetchLyrics(trackId);
    },
    [fetchLyrics, cache]
  );

  // 获取当前加载的歌词
  const getLyrics = useCallback(
    (trackId) => {
      return (
        cache[trackId] || { lyrics: [], translatedLyrics: [], songInfo: null }
      );
    },
    [cache]
  );

  // 根据当前播放时间找到匹配的歌词索引
  const findLyricIndex = useCallback((lyrics, currentTime) => {
    if (!lyrics || !lyrics.length) return -1;

    // 如果当前时间小于第一句歌词的时间，返回-1
    if (currentTime < lyrics[0].time) return -1;

    // 如果当前时间大于最后一句歌词的时间，返回最后一句
    if (currentTime >= lyrics[lyrics.length - 1].time) return lyrics.length - 1;

    // 二分查找匹配的歌词
    let left = 0;
    let right = lyrics.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (mid === lyrics.length - 1) return mid;

      // 找到在当前时间和下一句开始时间之间的歌词
      if (
        currentTime >= lyrics[mid].time &&
        currentTime < lyrics[mid + 1].time
      ) {
        return mid;
      }

      if (currentTime < lyrics[mid].time) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return -1;
  }, []);

  // 清除特定歌曲的缓存
  const clearCache = useCallback((trackId) => {
    if (trackId) {
      setCache((prev) => {
        const newCache = { ...prev };
        delete newCache[trackId];
        return newCache;
      });
    } else {
      setCache({});
    }
  }, []);

  return {
    preloadLyrics,
    getLyrics,
    findLyricIndex,
    clearCache,
    loading,
    hasCache: (trackId) => !!cache[trackId],
    currentTrackId,
  };
};
