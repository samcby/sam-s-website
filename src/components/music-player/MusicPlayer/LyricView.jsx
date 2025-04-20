import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useLyricCache } from "./hooks/useLyricCache";

const LyricView = ({
  isDarkMode,
  currentTrackId,
  currentTime,
  isVisible,
  onClose,
  onSeek,
  albumCover,
}) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [backgroundBlur, setBackgroundBlur] = useState(10);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.95);
  const lyricsContainerRef = useRef(null);
  const viewRef = useRef(null);

  // 使用歌词缓存hook
  const {
    preloadLyrics,
    getLyrics,
    findLyricIndex,
    loading: cacheLoading,
    hasCache,
  } = useLyricCache();

  // 处理点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (viewRef.current && !viewRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  // 预加载歌词数据
  useEffect(() => {
    if (currentTrackId) {
      preloadLyrics(currentTrackId);
    }
  }, [currentTrackId, preloadLyrics]);

  // 根据当前播放时间更新当前歌词
  useEffect(() => {
    if (!currentTrackId) return;

    const { lyrics } = getLyrics(currentTrackId);
    if (!lyrics || !lyrics.length) return;

    const index = findLyricIndex(lyrics, currentTime);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  }, [currentTime, currentTrackId, getLyrics, findLyricIndex, currentIndex]);

  // 自动滚动到当前歌词
  useEffect(() => {
    if (currentIndex >= 0 && lyricsContainerRef.current) {
      const container = lyricsContainerRef.current;
      const items = container.getElementsByClassName("lyric-item");

      if (items.length > currentIndex) {
        const currentItem = items[currentIndex];
        const containerHeight = container.clientHeight;
        const itemTop = currentItem.offsetTop;
        const itemHeight = currentItem.clientHeight;

        // 计算理想的滚动位置：当前歌词在容器中间
        const targetScrollTop = itemTop - containerHeight / 2 + itemHeight / 2;

        // 使用平滑滚动
        container.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex]);

  // 处理点击歌词跳转
  const handleLyricClick = (time) => {
    if (onSeek && typeof onSeek === "function") {
      onSeek(time);
    }
  };

  // 调整背景模糊度
  const handleBlurChange = (e) => {
    setBackgroundBlur(parseInt(e.target.value, 10));
  };

  // 主题变化时进行适当的UI更新
  useEffect(() => {
    console.log("Theme changed:", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // 从缓存中获取当前歌曲的歌词数据
  const { lyrics, translatedLyrics, songInfo } = currentTrackId
    ? getLyrics(currentTrackId)
    : { lyrics: [], translatedLyrics: [], songInfo: null };

  // 显示加载状态
  const loading = cacheLoading && !hasCache(currentTrackId);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full aspect-square rounded-lg shadow-xl overflow-hidden"
          ref={viewRef}
          style={{
            minWidth: "400px",
            maxWidth: "750px",
            minHeight: "400px",
            maxHeight: "750px",
            pointerEvents: "auto",
          }}
        >
          {/* 背景封面 */}
          {albumCover && (
            <div
              className="absolute inset-0 bg-center bg-cover z-0"
              style={{
                backgroundImage: `url(${albumCover})`,
                filter: `blur(${backgroundBlur}px)`,
                opacity: backgroundOpacity,
                transform: "scale(1.1)", // 避免模糊边缘
              }}
            />
          )}

          {/* 暗色遮罩增强文字可读性 */}
          <div
            className={`absolute inset-0 z-0 ${
              isDarkMode ? "bg-[#002b36]/40" : "bg-[#fdf6e3]/40"
            }`}
          ></div>

          <div className="relative w-full h-full flex flex-col z-10">
            {/* 顶部栏 - 增加透明度 */}
            <div
              className={`sticky top-0 flex flex-wrap justify-between items-center p-3 z-10 backdrop-blur-sm ${
                isDarkMode
                  ? "bg-[#002b36]/30 text-[#93a1a1]" // Solarized dark颜色系列
                  : "bg-[#fdf6e3]/30 text-[#657b83]"
              }`}
            >
              <div className="flex-1 flex flex-col pr-2 min-w-0">
                {songInfo && (
                  <>
                    <h3
                      className={`text-sm md:text-base font-medium truncate ${
                        isDarkMode
                          ? "text-[#93a1a1] opacity-90"
                          : "text-black opacity-90" // 光亮模式下改为黑色
                      }`}
                    >
                      {songInfo.name}
                    </h3>
                    <div
                      className={`text-xs md:text-sm truncate ${
                        isDarkMode
                          ? "text-[#839496] opacity-80"
                          : "text-black opacity-70" // 光亮模式下改为黑色
                      }`}
                    >
                      {songInfo.artist}
                    </div>
                  </>
                )}
                {!songInfo && (
                  <h3
                    className={`text-sm md:text-base font-medium ${
                      isDarkMode
                        ? "text-[#93a1a1] opacity-80"
                        : "text-black opacity-80" // 光亮模式下改为黑色
                    }`}
                  >
                    Now Playing
                  </h3>
                )}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* 控制区域 - 更加简洁，移除翻译按钮 */}
                <div className="flex items-center gap-3">
                  {/* 模糊度调整 - 简化标签 */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs ${
                        isDarkMode ? "text-[#839496] opacity-80" : "opacity-50" // Solarized dark颜色系列
                      }`}
                    >
                      Blur
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={backgroundBlur}
                      onChange={handleBlurChange}
                      className="w-12 sm:w-16 h-1.5 opacity-70"
                    />
                  </div>
                </div>

                {/* 关闭按钮 - 简化 */}
                <button
                  onClick={onClose}
                  className={`p-1 rounded-full hover:bg-opacity-20 transition-colors opacity-80 ${
                    isDarkMode
                      ? "text-[#93a1a1] hover:bg-[#586e75]"
                      : "hover:bg-[#93a1a1]" // Solarized dark颜色系列
                  }`}
                  aria-label="Close"
                >
                  <MdClose className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* 加载状态 */}
            {loading && (
              <div className="flex-1 flex items-center justify-center">
                <div
                  className={`animate-spin w-8 h-8 border-2 rounded-full opacity-70 ${
                    isDarkMode
                      ? "border-[#586e75]/60 border-t-[#2aa198]/80" // Solarized dark颜色组合
                      : "border-[#93a1a1]/50 border-t-[#268bd2]/70"
                  }`}
                ></div>
              </div>
            )}

            {/* 歌词内容 */}
            {!loading && (
              <div
                ref={lyricsContainerRef}
                className={`flex-1 overflow-y-auto p-4 scrollbar-${
                  isDarkMode ? "dark" : "light"
                } overscroll-behavior-y-contain`}
              >
                {!lyrics || lyrics.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p
                      className={`text-sm opacity-70 ${
                        isDarkMode ? "text-[#93a1a1]" : "text-[#657b83]" // Solarized dark颜色
                      }`}
                    >
                      No lyrics available
                    </p>
                  </div>
                ) : (
                  <div className="min-h-full flex flex-col items-center">
                    {/* 顶部空白区域，使歌词能够滚动到中间位置 */}
                    <div className="h-[30vh]"></div>

                    {lyrics.map((line, index) => (
                      <div
                        key={`${line.time}-${index}`}
                        className={`lyric-item flex flex-col items-center mb-5 transition-all duration-300 cursor-pointer hover:opacity-100 ${
                          index === currentIndex
                            ? `text-base md:text-xl scale-105`
                            : "text-sm md:text-base opacity-60 hover:opacity-80"
                        }`}
                        onClick={() => handleLyricClick(line.time)}
                      >
                        <p
                          className={`text-center px-4 py-1.5 rounded-full ${
                            index === currentIndex
                              ? isDarkMode
                                ? "bg-gradient-to-r from-[#268bd2]/40 via-[#268bd2]/25 to-transparent"
                                : "bg-gradient-to-r from-[#268bd2]/40 via-[#2aa198]/25 to-transparent"
                              : ""
                          }`}
                          style={{
                            animation:
                              index === currentIndex
                                ? "pulse 2s infinite"
                                : "none",
                            textShadow: isDarkMode
                              ? "0 0 8px rgba(0,0,0,0.5)"
                              : "0 0 8px rgba(255,255,255,0.5)",
                          }}
                        >
                          {index === currentIndex ? (
                            <span
                              className="lyric-gradient-text"
                              style={{
                                color: isDarkMode ? "white" : "#000000",
                                fontWeight: "600",
                                textShadow: isDarkMode
                                  ? "0 0 10px rgba(38, 139, 210, 0.7)"
                                  : "0 0 10px rgba(38, 139, 210, 0.6)",
                              }}
                            >
                              {line.text}
                            </span>
                          ) : (
                            <span
                              style={{
                                color: isDarkMode ? "white" : "#000000",
                              }}
                            >
                              {line.text}
                            </span>
                          )}
                        </p>
                      </div>
                    ))}

                    {/* 底部空白区域，使歌词能够滚动到中间位置 */}
                    <div className="h-[30vh]"></div>
                  </div>
                )}
              </div>
            )}

            {/* 小提示 - 增加透明度 */}
            <div
              className={`absolute bottom-3 left-0 right-0 text-center text-xs md:text-sm opacity-50 ${
                isDarkMode ? "text-[#93a1a1]" : "text-black" // 光亮模式下改为黑色
              }`}
            >
              Click lyrics to seek
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LyricView;
