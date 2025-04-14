"use client";
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { parseBlob } from 'music-metadata';
import Controls from './Controls';
import AlbumCover from './AlbumCover';
import ProgressControl from './ProgressControl';
import { formatTime, getVolumeIcon } from './utils';
import { useMusicSource } from './hooks/useMusicSource';
import { NeteaseMusicSource } from './services/NeteaseMusicSource';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentCover, setCurrentCover] = useState(null);
  const [currentSource, setCurrentSource] = useState('netease'); // Default to Netease Music
  const [playlistId, setPlaylistId] = useState('13583418396'); // Default playlist ID
  const [showSourceSelector, setShowSourceSelector] = useState(false);
  const [currentTrackUrl, setCurrentTrackUrl] = useState(''); // Store current track URL
  const [audioQuality, setAudioQuality] = useState('standard'); // Default to lowest quality
  const [playlistInfo, setPlaylistInfo] = useState(null); // Playlist info state
  
  const audioRef = useRef(null);
  const { isDarkMode } = useTheme();
  const { 
    playlist, 
    isLoading, 
    loadMetadata, 
    getAudioUrl, 
    switchSource, 
    registerSource 
  } = useMusicSource();

  // Function to safely get current track
  const getCurrentTrack = () => {
    if (!playlist || !playlist.length || currentTrackIndex < 0 || currentTrackIndex >= playlist.length) {
      return {
        id: '',
        title: 'No Track',
        artist: 'Please Load Music',
        album: '',
        cover: null
      };
    }
    return playlist[currentTrackIndex];
  };

  // Register Netease music source
  useEffect(() => {
    const neteaseSource = new NeteaseMusicSource(playlistId);
    registerSource('netease', neteaseSource);
    
    // Default to Netease music
    switchSource('netease');
  }, []);
  
  // Update music source when playlist ID changes
  useEffect(() => {
    if (currentSource === 'netease') {
      const neteaseSource = new NeteaseMusicSource(playlistId);
      registerSource('netease', neteaseSource);
      switchSource('netease');
    }
  }, [playlistId]);

  // Reset states when changing music source
  useEffect(() => {
    setCurrentTrackIndex(0);
    // Reset other playback states
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setCurrentTrackUrl('');
    setCurrentCover(null);
    setPlaylistInfo(null); // Reset playlist info
  }, [currentSource]);

  // Ensure currentTrackIndex is always valid
  useEffect(() => {
    if (playlist && playlist.length > 0) {
      if (currentTrackIndex >= playlist.length) {
        console.log('Correcting track index: Current index out of range');
        setCurrentTrackIndex(0);
      }
    } else if (currentTrackIndex !== 0) {
      console.log('Resetting track index: Playlist is empty');
      setCurrentTrackIndex(0);
    }
  }, [playlist, currentTrackIndex]);

  // Set default track to "just the two of us" (only for local music mode)
  useEffect(() => {
    if (!isLoading && playlist.length > 0 && currentSource === 'local') {
      const defaultTrackIndex = playlist.findIndex(track => 
        track.title.toLowerCase().includes('just the two of us')
      );
      if (defaultTrackIndex !== -1) {
        setCurrentTrackIndex(defaultTrackIndex);
      }
    }
  }, [playlist, isLoading, currentSource]);

  // Extract metadata from MP3 file (including cover)
  const extractMetadata = async (trackIndex) => {
    try {
      if (!playlist || !playlist.length || trackIndex === undefined || !playlist[trackIndex]) {
        console.log('Waiting for playlist to load...');
        return;
      }

      const metadata = await loadMetadata(playlist[trackIndex].id);
      console.log('Metadata retrieved:', metadata);
      
      if (metadata && metadata.cover) {
        setCurrentCover(metadata.cover);
      } else if (playlist[trackIndex].cover) {
        // For Netease music, use cover URL directly from track
        setCurrentCover(playlist[trackIndex].cover);
      } else {
        setCurrentCover(null);
      }
    } catch (error) {
      console.error('Error extracting metadata:', error);
      setCurrentCover(null);
    }
  };
  
  // Get and set current track URL
  const loadCurrentTrackUrl = async (trackIndex) => {
    if (!playlist || !playlist.length || trackIndex === undefined || !playlist[trackIndex]) {
      console.log('Waiting for playlist to load...');
      return;
    }
    
    try {
      // Reset current URL to avoid playing old file
      setCurrentTrackUrl('');
      
      // For local music, use src directly
      if (currentSource === 'local' && playlist[trackIndex].src) {
        console.log('Using local music URL:', playlist[trackIndex].src);
        setCurrentTrackUrl(playlist[trackIndex].src);
        return;
      }
      
      // For Netease music, use proxy API to get audio data
      if (currentSource === 'netease') {
        // Use our proxy API to return audio data directly
        const proxyUrl = `/api/netease/song/url?id=${playlist[trackIndex].id}&level=${audioQuality}`;
        console.log(`Using proxy API for audio (quality: ${audioQuality}):`, proxyUrl);
        setCurrentTrackUrl(proxyUrl);
        return;
      }
      
      // Don't use API URL directly due to CORS issues
    } catch (error) {
      console.error('Failed to get track URL:', error);
      setCurrentTrackUrl(''); // Clear URL to avoid playing wrong content
    }
  };

  // Extract new metadata and URL when changing tracks
  useEffect(() => {
    if (!isLoading && playlist.length > 0) {
      console.log('Current track index:', currentTrackIndex);
      console.log('Current playlist:', playlist);
      
      extractMetadata(currentTrackIndex);
      loadCurrentTrackUrl(currentTrackIndex);
    }
  }, [currentTrackIndex, playlist, isLoading]);
  
  // Handle music source change
  const handleSourceChange = (source) => {
    setCurrentSource(source);
    switchSource(source);
    setShowSourceSelector(false);
  };

  // Handle playlist ID change
  const handlePlaylistIdChange = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setPlaylistId(e.target.value);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current || !currentTrackUrl) {
      console.log('Cannot play: Audio element or URL not available');
      return;
    }
    
    if (audioRef.current.paused) {
      // Add delay to ensure audio element has loaded URL
      setTimeout(() => {
        audioRef.current.play().catch(error => {
          console.error('Playback failed:', error);
          
          // If playback fails, try reloading audio
          if (error.name === 'NotSupportedError' || error.name === 'AbortError') {
            console.log('Trying to reload audio...');
            audioRef.current.load();
            setTimeout(() => {
              audioRef.current.play().catch(e => {
                console.error('Second playback attempt failed:', e);
                // If still fails, try next track
                if (playlist && playlist.length > 1) {
                  console.log('Switching to next track...');
                  playNext();
                }
              });
            }, 1000);
          }
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
      console.log('Cannot play next: Playlist is empty');
      return;
    }
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  // Switch to previous track
  const playPrevious = () => {
    if (!playlist || playlist.length === 0) {
      console.log('Cannot play previous: Playlist is empty');
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
          if (currentSource === 'netease') {
            const response = await fetch(`/api/netease/playlist?id=${playlistId}`);
            if (response.ok) {
              const data = await response.json();
              if (data.result) {
                setPlaylistInfo({
                  name: data.result.name || 'Unknown Playlist',
                  description: data.result.description || '',
                  trackCount: data.result.trackCount || playlist.length,
                  creator: data.result.creator?.nickname || 'Unknown User',
                  coverImgUrl: data.result.coverImgUrl
                });
                return;
              }
            }
          }
          
          // If cannot get detailed info, use simple info
          setPlaylistInfo({
            name: currentSource === 'local' ? 'Local Music' : `Playlist ${playlistId}`,
            trackCount: playlist.length,
            description: ''
          });
        } catch (error) {
          console.error('Failed to get playlist info:', error);
          setPlaylistInfo({
            name: currentSource === 'local' ? 'Local Music' : `Playlist ${playlistId}`,
            trackCount: playlist.length,
            description: ''
          });
        }
      };
      
      fetchPlaylistInfo();
    }
  }, [playlist, isLoading, currentSource, playlistId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
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
    
    const handleError = (e) => {
      console.error('Audio error:', e);
      // Get more detailed error information
      const mediaError = audio.error;
      if (mediaError) {
        console.error('Error code:', mediaError.code);
        console.error('Error message:', mediaError.message);
        
        switch(mediaError.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            console.error('Playback aborted');
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            console.error('Network error caused download failure');
            break;
          case MediaError.MEDIA_ERR_DECODE:
            console.error('Decoding error');
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            console.error('Audio format not supported');
            // Don't try using Netease URL directly, reload current track's proxy URL
            if (currentSource === 'netease' && playlist && playlist.length > 0 && playlist[currentTrackIndex]) {
              console.log('Trying to reload current audio...');
              
              // Completely reset and reload
              setCurrentTrackUrl('');
              
              // Wait a moment before reloading
              setTimeout(() => {
                const proxyUrl = `/api/netease/song/url?id=${playlist[currentTrackIndex].id}`;
                console.log('Reusing proxy URL:', proxyUrl);
                setCurrentTrackUrl(proxyUrl);
                
                // Don't immediately skip to next track, give new URL a chance
                setTimeout(() => {
                  if (audioRef.current) {
                    audioRef.current.load();
                  }
                }, 500);
              }, 500);
              
              return;
            }
            break;
        }
      }
      
      // Try next track
      if (playlist && playlist.length > 1) {
        console.log('Switching to next track...');
        setTimeout(playNext, 2000);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrackIndex, isPlaying, playlist.length]);

  // Get current track
  const currentTrack = getCurrentTrack();

  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center items-center pb-1 md:pb-8 z-50 pointer-events-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`pointer-events-auto w-[75%] mx-auto md:mx-4 md:w-[600px] backdrop-blur-md rounded-lg md:rounded-2xl p-1.5 md:p-4 shadow-lg
                   ${isDarkMode 
                     ? 'bg-[#073642]/80 border-[#586e75]' 
                     : 'bg-[#eee8d5]/80 border-[#93a1a1]'}
                   border`}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <button 
              onClick={() => setShowSourceSelector(!showSourceSelector)}
              className={`text-xs px-2 py-1 rounded-md mr-2 hidden sm:block ${
                isDarkMode ? 'bg-[#002b36] text-[#839496]' : 'bg-[#fdf6e3] text-[#657b83]'
              }`}
            >
              {currentSource === 'local' ? 'Local Music' : 'Netease Music'}
            </button>
            
            {/* Display playlist name and track count */}
            {playlistInfo && (
              <div className={`text-xs mr-2 hidden sm:block ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'}`}>
                {playlistInfo.name}
              </div>
            )}
            
            {showSourceSelector && (
              <div className={`absolute top-0 transform -translate-y-full mt-[-8px] z-10 rounded-md shadow-lg p-2 hidden sm:block ${
                isDarkMode ? 'bg-[#002b36] text-[#839496]' : 'bg-[#fdf6e3] text-[#657b83]'
              }`}>
                <div className="flex flex-col">
                  <button 
                    onClick={() => handleSourceChange('local')}
                    className={`text-xs px-2 py-1 rounded-md mb-1 ${
                      currentSource === 'local' ? (isDarkMode ? 'bg-[#073642]' : 'bg-[#eee8d5]') : ''
                    }`}
                  >
                    Local Music
                  </button>
                  <button 
                    onClick={() => handleSourceChange('netease')}
                    className={`text-xs px-2 py-1 rounded-md ${
                      currentSource === 'netease' ? (isDarkMode ? 'bg-[#073642]' : 'bg-[#eee8d5]') : ''
                    }`}
                  >
                    Netease Music
                  </button>
                  
                  {currentSource === 'netease' && (
                    <>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Enter Playlist ID"
                          defaultValue={playlistId}
                          onKeyPress={handlePlaylistIdChange}
                          className={`text-xs w-full px-2 py-1 rounded-md ${
                            isDarkMode ? 'bg-[#073642] text-[#839496]' : 'bg-[#eee8d5] text-[#657b83]'
                          }`}
                        />
                        <button
                          onClick={() => {
                            const input = document.querySelector('input[placeholder="Enter Playlist ID"]');
                            if (input && input.value) {
                              setPlaylistId(input.value);
                            }
                          }}
                          className={`text-xs w-full mt-1 px-2 py-1 rounded-md ${
                            isDarkMode ? 'bg-[#073642] text-[#839496]' : 'bg-[#eee8d5] text-[#657b83]'
                          }`}
                        >
                          Confirm
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {!isLoading && playlist && playlist.length > 0 && (
            <div className={`text-xs ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'}`}>
              {currentTrackIndex + 1}/{playlist.length}
            </div>
          )}
        </div>
        
        {!isLoading && playlist && playlist.length > 0 && (
          <>
            <audio
              ref={audioRef}
              src={currentTrackUrl}
              preload="auto"
              crossOrigin="anonymous"
              onError={(e) => {
                console.error('Audio loading error:', e);
                // If loading error and playlist has multiple tracks, try playing next
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
                title={currentTrack.title}
                artist={currentTrack.artist}
                onTimeChange={handleTimeChange}
                onVolumeChange={handleVolumeChange}
                formatTime={formatTime}
                getVolumeIcon={() => getVolumeIcon(volume)}
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
        
        {isLoading && (
          <div className={`flex justify-center items-center h-16 ${
            isDarkMode ? 'text-[#839496]' : 'text-[#657b83]'
          }`}>
            Loading...
          </div>
        )}
        
        {!isLoading && (!playlist || playlist.length === 0) && (
          <div className={`flex justify-center items-center h-16 ${
            isDarkMode ? 'text-[#839496]' : 'text-[#657b83]'
          }`}>
            No music found. Please try another playlist.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MusicPlayer; 