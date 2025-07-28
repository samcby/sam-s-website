"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { parseBlob } from "music-metadata";
import { SiNeteasecloudmusic } from "react-icons/si";
import { MdQueueMusic, MdLyrics } from "react-icons/md";
import Controls from "./Controls";
import AlbumCover from "./AlbumCover";
import ProgressControl from "./ProgressControl";
import LoadingState from "./LoadingState";
import { formatTime, getVolumeIcon } from "./utils";
import { useMusicSource } from "./hooks/useMusicSource";
import { usePlaylistCache } from "./hooks/usePlaylistCache";
import { NeteaseMusicSource } from "./services/NeteaseMusicSource";
import PlaylistView from "./PlaylistView";
import { useAudioPreload } from "./hooks/useAudioPreload";
import LyricView from "./LyricView";
import { useLyricCache } from "./hooks/useLyricCache";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentCover, setCurrentCover] = useState(null);
  const [playlistId, setPlaylistId] = useState("13583418396"); // Default playlist ID
  const [showSourceSelector, setShowSourceSelector] = useState(false);
  const [currentTrackUrl, setCurrentTrackUrl] = useState(""); // Store current track URL
  const [audioQuality, setAudioQuality] = useState("standard"); // Default to lowest quality
  const [playlistInfo, setPlaylistInfo] = useState(null); // Playlist info state
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false); // 控制歌词显示
  const [preloadedTracks, setPreloadedTracks] = useState(new Set());

  const audioRef = useRef(null);
  const { isDarkMode } = useTheme();
  const {
    playlist,
    isLoading,
    loadMetadata,
    getAudioUrl,
    switchSource,
    registerSource,
  } = useMusicSource();
  const { preloadNextAudio, clearPreload, preloadedTrackId } =
    useAudioPreload();
  const { preloadLyrics } = useLyricCache();

  // Function to safely get current track
  const getCurrentTrack = () => {
    if (
      !playlist ||
      !playlist.length ||
      currentTrackIndex < 0 ||
      currentTrackIndex >= playlist.length
    ) {
      return null;
    }
    return playlist[currentTrackIndex];
  };

  // Register Netease music source
  useEffect(() => {
    const initializePlayer = async () => {
      try {
        const neteaseSource = new NeteaseMusicSource(playlistId);
        registerSource("netease", neteaseSource);
        await switchSource("netease");
        setIsInitialized(true);
      } catch (err) {
        setError("Failed to initialize player");
      }
    };

    initializePlayer();
  }, []);

  // 添加新的逻辑在加载完成后自动播放
  useEffect(() => {
    // 只有当初始化完成且有音乐地址时才尝试播放
    if (isInitialized && currentTrackUrl && audioRef.current && !isPlaying) {
      // 延迟一点再开始播放，确保音频已加载
      const timer = setTimeout(() => {
        togglePlay();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isInitialized, currentTrackUrl]);

  // Update music source when playlist ID changes
  useEffect(() => {
    const neteaseSource = new NeteaseMusicSource(playlistId);
    registerSource("netease", neteaseSource);
    switchSource("netease");
  }, [playlistId]);

  // Ensure currentTrackIndex is always valid
  useEffect(() => {
    if (playlist && playlist.length > 0) {
      if (currentTrackIndex >= playlist.length) {
        setCurrentTrackIndex(0);
      }
    } else if (currentTrackIndex !== 0) {
      setCurrentTrackIndex(0);
    }
  }, [playlist, currentTrackIndex]);

  // Extract metadata from MP3 file (including cover)
  const extractMetadata = async (trackIndex) => {
    try {
      if (
        !playlist ||
        !playlist.length ||
        trackIndex === undefined ||
        !playlist[trackIndex]
      ) {
        return null;
      }

      const currentTrackId = playlist[trackIndex].id;
      const metadata = await loadMetadata(currentTrackId);

      // 验证返回的元数据是否匹配当前歌曲
      if (metadata && metadata.id === currentTrackId) {
        if (metadata.cover) {
          setCurrentCover(metadata.cover);
        } else if (playlist[trackIndex].album?.picUrl) {
          setCurrentCover(playlist[trackIndex].album.picUrl);
        } else {
          setCurrentCover(null);
        }
        return metadata;
      } else {
        console.warn("元数据不匹配当前歌曲，使用播放列表数据");
        // 使用播放列表中的数据作为备选
        setCurrentCover(playlist[trackIndex].album?.picUrl || null);
        return {
          id: currentTrackId,
          title: playlist[trackIndex].name,
          artist: playlist[trackIndex].artists?.[0]?.name || "未知歌手",
          album: playlist[trackIndex].album?.name || "未知专辑",
          cover: playlist[trackIndex].album?.picUrl || null,
          duration: playlist[trackIndex].duration || 0,
        };
      }
    } catch (error) {
      console.error("获取元数据失败:", error);
      setCurrentCover(null);
      return null;
    }
  };

  // Get and set current track URL
  const loadCurrentTrackUrl = async (trackIndex) => {
    if (
      !playlist ||
      !playlist.length ||
      trackIndex === undefined ||
      !playlist[trackIndex]
    ) {
      return;
    }

    try {
      setCurrentTrackUrl("");

      const proxyUrl = `/api/netease/song/url?id=${playlist[trackIndex].id}&level=${audioQuality}`;
      setCurrentTrackUrl(proxyUrl);
    } catch (error) {
      setCurrentTrackUrl("");
    }
  };

  // Extract new metadata and URL when changing tracks
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;
    const initialDelay = 1000; // 1 second delay for first load

    const loadTrackData = async () => {
      try {
        if (
          !isLoading &&
          playlist &&
          playlist.length > 0 &&
          currentTrackIndex >= 0 &&
          currentTrackIndex < playlist.length
        ) {
          // Add delay for initial load
          if (!currentTrackUrl && retryCount === 0) {
            await new Promise((resolve) => setTimeout(resolve, initialDelay));
          }

          const metadata = await extractMetadata(currentTrackIndex);

          // If metadata failed and we haven't exceeded max retries
          if (!metadata && retryCount < maxRetries) {
            retryCount++;
            console.log(
              `Retrying metadata load (${retryCount}/${maxRetries})...`
            );
            setTimeout(loadTrackData, 1000 * retryCount); // Exponential backoff
            return;
          }

          await loadCurrentTrackUrl(currentTrackIndex);
        }
      } catch (error) {
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(
            `Retrying after error (${retryCount}/${maxRetries}):`,
            error
          );
          setTimeout(loadTrackData, 1000 * retryCount);
        } else {
          console.warn("Failed to load track data after retries:", error);
        }
      }
    };

    loadTrackData();

    // Cleanup function
    return () => {
      retryCount = maxRetries; // Prevent any pending retries
    };
  }, [currentTrackIndex, playlist, isLoading]);

  // Handle music source change
  const handleSourceChange = (source) => {
    setCurrentSource(source);
    switchSource(source);
    setShowSourceSelector(false);
  };

  // Handle playlist ID change
  const handlePlaylistIdChange = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setPlaylistId(e.target.value);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current || !currentTrackUrl) {
      return;
    }

    if (audioRef.current.paused) {
      setTimeout(() => {
        audioRef.current.play().catch(() => {
          audioRef.current.load();
          setTimeout(() => {
            audioRef.current.play().catch(() => {
              if (playlist && playlist.length > 1) {
                playNext();
              }
            });
          }, 1000);
        });
      }, 500);
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  // Switch to next track
  const playNext = () => {
    if (!playlist || playlist.length === 0) {
      return;
    }
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  // Switch to previous track
  const playPrevious = () => {
    if (!playlist || playlist.length === 0) {
      return;
    }
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
  };

  // Handle time update
  const handleTimeChange = (e) => {
    if (!audioRef.current) return;
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Handle volume update
  const handleVolumeChange = (e) => {
    if (!audioRef.current) return;
    const vol = Math.min(Math.max(parseFloat(e.target.value), 0), 1);
    audioRef.current.volume = vol;
    setVolume(vol);
  };

  // When playlist loads, extract playlist info
  useEffect(() => {
    if (!isLoading && playlist && playlist.length > 0) {
      // Try to extract playlist info from API response
      const fetchPlaylistInfo = async () => {
        try {
          // Only try to get playlist info for Netease music source
          const response = await fetch(
            `/api/netease/playlist?id=${playlistId}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data.result) {
              setPlaylistInfo({
                name: data.result.name || "Unknown Playlist",
                description: data.result.description || "",
                trackCount: data.result.trackCount || playlist.length,
                creator: data.result.creator?.nickname || "Unknown User",
                coverImgUrl: data.result.coverImgUrl,
              });
              return;
            }
          }

          // If cannot get detailed info, use simple info
          setPlaylistInfo({
            name: "Playlist " + playlistId,
            trackCount: playlist.length,
            description: "",
          });
        } catch (error) {
          setPlaylistInfo({
            name: "Playlist " + playlistId,
            trackCount: playlist.length,
            description: "",
          });
        }
      };

      fetchPlaylistInfo();
    }
  }, [playlist, isLoading, playlistId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      if (isPlaying) {
        audio.play().catch(() => {
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

    const handleError = () => {
      const mediaError = audio.error;
      if (mediaError) {
        if (playlist && playlist.length > 0 && playlist[currentTrackIndex]) {
          setCurrentTrackUrl("");

          setTimeout(() => {
            const proxyUrl = `/api/netease/song/url?id=${playlist[currentTrackIndex].id}`;
            setCurrentTrackUrl(proxyUrl);

            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.load();
              }
            }, 500);
          }, 500);

          return;
        }
      }

      if (playlist && playlist.length > 1) {
        setTimeout(playNext, 2000);
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [currentTrackIndex, isPlaying, playlist.length]);

  // Handle track selection from playlist
  const handleTrackSelect = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  // 在当前歌曲加载完成后预加载下一首
  useEffect(() => {
    if (duration > 0 && playlist?.length > 1) {
      const nextIndex = (currentTrackIndex + 1) % playlist.length;
      const nextTrackId = playlist[nextIndex].id;

      if (nextTrackId !== preloadedTrackId) {
        preloadNextAudio(nextTrackId, audioQuality);
      }
    }
  }, [duration, currentTrackIndex, playlist]);

  // 切换播放列表时清理预加载
  useEffect(() => {
    clearPreload();
  }, [playlistId]);

  // Toggle lyrics display
  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };

  // Handle lyrics seek
  const handleLyricSeek = (time) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // 当歌曲变化时预加载歌词
  useEffect(() => {
    if (
      !isLoading &&
      playlist &&
      playlist.length > 0 &&
      currentTrackIndex >= 0
    ) {
      const currentTrack = playlist[currentTrackIndex];
      if (currentTrack && currentTrack.id) {
        // 预加载当前歌曲的歌词
        preloadLyrics(currentTrack.id);

        // 如果有下一首歌曲，也预加载它的歌词
        if (playlist.length > 1) {
          const nextIndex = (currentTrackIndex + 1) % playlist.length;
          const nextTrack = playlist[nextIndex];
          if (nextTrack && nextTrack.id) {
            preloadLyrics(nextTrack.id);
          }
        }
      }
    }
  }, [currentTrackIndex, playlist, isLoading, preloadLyrics]);

  const EmptyPlaylist = ({ isDarkMode }) => (
    <div
      className={`flex flex-col items-center justify-center h-16 space-y-2 ${
        isDarkMode ? "text-[#839496]" : "text-[#657b83]"
      }`}
    >
      <span className="text-sm">No songs in playlist</span>
      <span className="text-xs opacity-75">Please try another playlist ID</span>
    </div>
  );

  const ErrorState = ({ isDarkMode, message }) => (
    <div
      className={`flex flex-col items-center justify-center h-16 space-y-2 ${
        isDarkMode ? "text-[#839496]" : "text-[#657b83]"
      }`}
    >
      <span className="text-sm">Failed to load playlist</span>
      <span className="text-xs opacity-75">
        {message || "Please try again later"}
      </span>
    </div>
  );

  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center items-center pb-1 md:pb-8 z-50 pointer-events-none">
      <div className="relative w-[75%] md:w-[600px] max-w-[650px]">
        {/* LyricView component - positioned above the player */}
        {!isLoading && playlist && playlist.length > 0 && (
          <div className="absolute bottom-full left-0 right-0 flex justify-center w-full mb-8 px-2 md:px-0">
            <div style={{ width: "100%", maxWidth: "750px", margin: "0 auto" }}>
              <LyricView
                isDarkMode={isDarkMode}
                currentTrackId={getCurrentTrack()?.id}
                currentTime={currentTime}
                isVisible={showLyrics}
                onClose={() => setShowLyrics(false)}
                onSeek={handleLyricSeek}
                albumCover={currentCover}
              />
            </div>
          </div>
        )}

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`relative pointer-events-auto w-full backdrop-blur-md rounded-lg md:rounded-2xl p-1.5 md:p-4 shadow-lg
                   ${
                     isDarkMode
                       ? "bg-[#073642]/80 border-[#586e75]"
                       : "bg-[#eee8d5]/80 border-[#93a1a1]"
                   }
                   border`}
        >
          {/* Add playlist view */}
          {showPlaylist && !isLoading && playlist && playlist.length > 0 && (
            <PlaylistView
              isDarkMode={isDarkMode}
              playlist={playlist}
              currentTrackIndex={currentTrackIndex}
              onTrackSelect={handleTrackSelect}
              onClose={() => setShowPlaylist(false)}
            />
          )}

          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSourceSelector(!showSourceSelector)}
                className={`text-xs px-2 py-1 rounded-md hidden sm:block ${
                  isDarkMode
                    ? "bg-[#002b36] text-[#839496]"
                    : "bg-[#fdf6e3] text-[#657b83]"
                }`}
              >
                <div className="flex items-center gap-1">
                  <SiNeteasecloudmusic className="w-3 h-3" />
                  <span>Netease Music</span>
                </div>
              </button>

              {/* Display playlist name and track count */}
              {playlistInfo && (
                <div
                  className={`text-xs hidden sm:block ${
                    isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"
                  }`}
                >
                  {playlistInfo.name}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Lyrics button - Updated for better visibility */}
              {!isLoading && playlist && playlist.length > 0 && (
                <button
                  onClick={toggleLyrics}
                  className={`text-xs px-2 py-1.5 rounded-md flex items-center gap-1 transition-colors ${
                    isDarkMode
                      ? showLyrics
                        ? "bg-[#073642] text-[#93a1a1]"
                        : "hover:bg-[#073642] text-[#839496] bg-[#002b36]"
                      : showLyrics
                      ? "bg-[#eee8d5] text-[#586e75]"
                      : "hover:bg-[#eee8d5] text-[#657b83] bg-[#fdf6e3]"
                  }`}
                  aria-label="Show lyrics"
                >
                  <div className="flex items-center gap-1">
                    <MdLyrics className="w-4 h-4" />
                    <span className="hidden sm:inline">Lyrics</span>
                  </div>
                </button>
              )}

              {/* Playlist button and track counter combined */}
              {!isLoading && playlist && playlist.length > 0 && (
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className={`text-xs px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                    isDarkMode
                      ? showPlaylist
                        ? "bg-[#073642] text-[#93a1a1]"
                        : "hover:bg-[#073642] text-[#839496] bg-[#002b36]"
                      : showPlaylist
                      ? "bg-[#eee8d5] text-[#586e75]"
                      : "hover:bg-[#eee8d5] text-[#657b83] bg-[#fdf6e3]"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <MdQueueMusic className="w-4 h-4" />
                    <span className="hidden sm:inline">Playlist</span>
                  </div>
                  <span className="opacity-75">
                    {currentTrackIndex + 1}/{playlist.length}
                  </span>
                </button>
              )}
            </div>

            {/* Source selector popup */}
            {showSourceSelector && (
              <div
                className={`absolute top-0 transform -translate-y-full mt-[-8px] z-10 rounded-md shadow-lg p-2 hidden sm:block ${
                  isDarkMode
                    ? "bg-[#002b36] text-[#839496]"
                    : "bg-[#fdf6e3] text-[#657b83]"
                }`}
              >
                <div className="flex flex-col">
                  <div className="mt-2">
                    <div className="text-xs mb-2 opacity-80">
                      Enter your Netease Cloud Music playlist ID
                      <div className="text-[10px] mt-1 opacity-60">
                        (You can find it in the playlist URL:
                        music.163.com/playlist?id=...)
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter Playlist ID"
                        defaultValue={playlistId}
                        onKeyPress={handlePlaylistIdChange}
                        className={`text-xs flex-1 px-2 py-1.5 rounded-md outline-none border ${
                          isDarkMode
                            ? "bg-[#073642] text-[#839496] border-[#586e75] focus:border-[#839496]"
                            : "bg-[#eee8d5] text-[#657b83] border-[#93a1a1] focus:border-[#657b83]"
                        }`}
                      />
                      <button
                        onClick={() => {
                          const input = document.querySelector(
                            'input[placeholder="Enter Playlist ID"]'
                          );
                          if (input && input.value) {
                            setPlaylistId(input.value);
                            setShowSourceSelector(false);
                          }
                        }}
                        className={`text-xs px-4 py-1.5 rounded-md transition-colors ${
                          isDarkMode
                            ? "bg-[#268bd2] hover:bg-[#2aa198] text-[#fdf6e3]"
                            : "bg-[#268bd2] hover:bg-[#2aa198] text-[#fdf6e3]"
                        }`}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isInitialized || isLoading ? (
            <LoadingState isDarkMode={isDarkMode} />
          ) : error ? (
            <ErrorState isDarkMode={isDarkMode} message={error} />
          ) : !playlist || playlist.length === 0 ? (
            <EmptyPlaylist isDarkMode={isDarkMode} />
          ) : (
            <>
              <audio
                ref={audioRef}
                src={currentTrackUrl}
                preload="auto"
                crossOrigin="anonymous"
                onError={() => {
                  if (playlist && playlist.length > 1) {
                    setTimeout(playNext, 2000);
                  }
                }}
              />

              <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4">
                <AlbumCover
                  currentCover={currentCover}
                  isDarkMode={isDarkMode}
                  isPlaying={isPlaying}
                />

                <ProgressControl
                  isDarkMode={isDarkMode}
                  currentTime={currentTime}
                  duration={duration}
                  volume={volume}
                  title={getCurrentTrack()?.name || "Loading..."}
                  artist={
                    getCurrentTrack()?.artists?.[0]?.name || "Unknown Artist"
                  }
                  onTimeChange={handleTimeChange}
                  onVolumeChange={handleVolumeChange}
                  formatTime={formatTime}
                  getVolumeIcon={getVolumeIcon}
                />

                <Controls
                  isDarkMode={isDarkMode}
                  isPlaying={isPlaying}
                  onPlayPrevious={playPrevious}
                  onTogglePlay={togglePlay}
                  onPlayNext={playNext}
                />
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MusicPlayer;
