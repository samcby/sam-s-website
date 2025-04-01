"use client";
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { parseBlob } from 'music-metadata';
import Image from 'next/image';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentCover, setCurrentCover] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);
  const { isDarkMode } = useTheme();

  // 加载音乐列表
  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const response = await fetch('/api/music');
        if (!response.ok) throw new Error('Failed to load music list');
        const musicFiles = await response.json();
        setPlaylist(musicFiles);
        // 设置随机初始歌曲
        setCurrentTrackIndex(Math.floor(Math.random() * musicFiles.length));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading playlist:', error);
        setIsLoading(false);
      }
    };

    loadPlaylist();
  }, []);

  // 提取MP3文件的元数据（包括封面）
  const extractMetadata = async (trackIndex) => {
    try {
      // 检查playlist和trackIndex的有效性
      if (!playlist || !playlist.length || trackIndex === undefined || !playlist[trackIndex]) {
        console.log('Waiting for playlist to load...');
        return;
      }

      const response = await fetch(playlist[trackIndex].src);
      const buffer = await response.arrayBuffer();
      const metadata = await parseBlob(new Blob([buffer]));
      
      if (metadata.common.picture && metadata.common.picture.length > 0) {
        const picture = metadata.common.picture[0];
        const blob = new Blob([picture.data], { type: picture.format });
        const coverUrl = URL.createObjectURL(blob);
        setCurrentCover(coverUrl);
        
        // 清理之前的 URL
        return () => URL.revokeObjectURL(coverUrl);
      } else {
        setCurrentCover(null);
      }
    } catch (error) {
      console.error('Error extracting metadata:', error);
      setCurrentCover(null);
    }
  };

  // 当切换歌曲时提取新的元数据
  useEffect(() => {
    let cleanup;
    if (!isLoading && playlist.length > 0) {
      extractMetadata(currentTrackIndex).then(cleanupFn => {
        cleanup = cleanupFn;
      });
    }
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [currentTrackIndex, playlist, isLoading]);

  // 播放/暂停切换
  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  // 切换到下一首
  const playNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  // 切换到上一首
  const playPrevious = () => {
    setCurrentTrackIndex((prevIndex) => 
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
  };

  // 处理时间更新
  const handleTimeChange = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // 处理音量更新
  const handleVolumeChange = (e) => {
    const vol = Math.min(Math.max(parseFloat(e.target.value), 0), 1);
    audioRef.current.volume = vol;
    setVolume(vol);
  };

  // 格式化时间显示
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // 获取音量图标
  const getVolumeIcon = () => {
    if (volume === 0) {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
        />
      );
    } else if (volume <= 0.5) {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M15.536 8.464a5 5 0 010 7.072"
        />
      );
    }
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
      />
    );
  };

  useEffect(() => {
    const audio = audioRef.current;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      // 自动播放新加载的歌曲
      if (isPlaying) {
        audio.play().catch(error => {
          console.log("Playback failed:", error);
          setIsPlaying(false);
        });
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      playNext();
    };

    if (audio) {
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      }
    };
  }, [currentTrackIndex, isPlaying]);

  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center items-center pb-2 md:pb-8 z-50 pointer-events-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`pointer-events-auto w-full mx-2 md:mx-4 md:w-[600px] backdrop-blur-md rounded-xl md:rounded-2xl p-2 md:p-4 shadow-lg
                   ${isDarkMode 
                     ? 'bg-[#073642]/80 border-[#586e75]' 
                     : 'bg-[#eee8d5]/80 border-[#93a1a1]'}
                   border-2`}
      >
        {!isLoading && playlist.length > 0 && (
          <>
            <audio
              ref={audioRef}
              src={playlist[currentTrackIndex].src}
              preload="auto"
            />
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              {/* 专辑封面 */}
              <div className="w-16 h-16 md:w-20 md:h-20 relative rounded-lg overflow-hidden flex-shrink-0 order-first">
                {currentCover ? (
                  <Image
                    src={currentCover}
                    alt="Album Cover"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    isDarkMode ? 'bg-[#586e75]' : 'bg-[#93a1a1]'
                  }`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-8 w-8 md:h-8 md:w-8 ${
                        isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* 音乐信息和进度条 */}
              <div className="flex-1 min-w-0 w-full md:min-w-[200px] order-2 md:order-none">
                <div className={`text-sm md:text-sm font-medium mb-1 text-center md:text-left truncate ${
                  isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'
                }`}>
                  {playlist[currentTrackIndex].title}
                </div>
                <div className="flex items-center space-x-1 md:space-x-2">
                  <span className={`text-[10px] md:text-xs ${
                    isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'
                  }`}>
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleTimeChange}
                    className={`w-full h-1 md:h-1 rounded-lg appearance-none cursor-pointer
                               ${isDarkMode 
                                 ? 'bg-[#586e75] accent-[#93a1a1]' 
                                 : 'bg-[#93a1a1] accent-[#586e75]'}`}
                  />
                  <span className={`text-[10px] md:text-xs ${
                    isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'
                  }`}>
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* 控制按钮组 */}
              <div className="flex items-center space-x-2 md:space-x-2">
                {/* 上一首按钮 */}
                <motion.button
                  onClick={playPrevious}
                  className={`p-2 md:p-2 rounded-full border-2 transition-colors duration-300
                             ${isDarkMode 
                               ? 'border-[#586e75] hover:border-[#93a1a1]' 
                               : 'border-[#93a1a1] hover:border-[#586e75]'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 md:h-5 md:w-5 ${
                      isDarkMode 
                        ? 'text-[#93a1a1]' 
                        : 'text-[#586e75]'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                  </svg>
                </motion.button>

                {/* 播放/暂停按钮 */}
                <motion.button
                  onClick={togglePlay}
                  className={`p-2.5 md:p-3 rounded-full border-2 transition-colors duration-300
                             ${isDarkMode 
                               ? 'border-[#586e75] hover:border-[#93a1a1] bg-[#586e75]/30' 
                               : 'border-[#93a1a1] hover:border-[#586e75] bg-[#93a1a1]/30'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 md:h-7 md:w-7 ${
                        isDarkMode 
                          ? 'text-[#93a1a1]' 
                          : 'text-[#586e75]'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      {isPlaying ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                      )}
                    </svg>
                  </motion.div>
                </motion.button>

                {/* 下一首按钮 */}
                <motion.button
                  onClick={playNext}
                  className={`p-2 md:p-2 rounded-full border-2 transition-colors duration-300
                             ${isDarkMode 
                               ? 'border-[#586e75] hover:border-[#93a1a1]' 
                               : 'border-[#93a1a1] hover:border-[#586e75]'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 md:h-5 md:w-5 ${
                      isDarkMode 
                        ? 'text-[#93a1a1]' 
                        : 'text-[#586e75]'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* 音量控制 - 在移动端隐藏 */}
              <div className="hidden md:flex items-center space-x-2 ml-2">
                <button
                  onClick={() => handleVolumeChange({ target: { value: volume === 0 ? 1 : 0 } })}
                  className={`p-1.5 rounded-full hover:bg-[${isDarkMode ? '#586e75' : '#93a1a1'}]/20 transition-colors duration-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ${
                      isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {getVolumeIcon()}
                  </svg>
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className={`w-16 h-1 rounded-lg appearance-none cursor-pointer
                             ${isDarkMode 
                               ? 'bg-[#586e75] accent-[#93a1a1]' 
                               : 'bg-[#93a1a1] accent-[#586e75]'}`}
                />
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default MusicPlayer; 