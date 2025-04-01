import Image from 'next/image';

const AlbumCover = ({ currentCover, isDarkMode }) => {
  return (
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
  );
};

export default AlbumCover; 