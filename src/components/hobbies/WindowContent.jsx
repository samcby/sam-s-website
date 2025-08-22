import Image from "next/image";

const WindowContent = ({ id }) => {
  // 检测是否为移动设备
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isVerySmall = typeof window !== 'undefined' && window.innerWidth < 480;
  
  // 根据屏幕大小调整图片尺寸
  const imageWidth = isVerySmall ? 180 : isMobile ? 220 : 300;
  const imageHeight = isVerySmall ? 120 : isMobile ? 150 : 200;
  
  switch(id) {
    case 'videography':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3">
            {"I like shooting videos and recording life."}
          </p>
          <Image 
            src="/images/videography.jpg"
            width={imageWidth} 
            height={imageHeight} 
            alt="videography"
            className="rounded-md select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
          />
        </div>
      );
    case 'music':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3">
            {"I like listening to all kinds of music, and I also love playing the piano."}
          </p>
          <Image 
            src="/images/music.jpg" 
            width={imageWidth} 
            height={imageHeight} 
            alt="dj"
            className="rounded-md select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
          />
        </div>
      );
    case 'games':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3">
            {'I love cat and dog. I have 2 cats named "DoiYuk" (white) and "WongChoi" (black).'}
          </p>
          <Image 
            src="/images/games.jpg" 
            width={imageWidth} 
            height={imageHeight} 
            alt="games"
            className="rounded-md select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
          />
        </div>
      );
    case 'travel':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3">
            {"I love traveling and exploring the world."}
          </p>
          <Image 
            src="/images/travel.jpg"
            width={imageWidth} 
            height={imageHeight} 
            alt="travel"
            className="rounded-md select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
          />
        </div>
      );
    case 'Personal Media':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3 sm:line-clamp-4 sm:line-clamp-5 sm:line-clamp-6 sm:line-clamp-7 sm:line-clamp-8 sm:line-clamp-9">
            {"While I'm not a professional self-media person, I've gradually experimented with publishing videos and text on various platforms. Here's my platform information:Bilibili: https://b23.tv/9rOArHI,RednoteID: 2750967319"}
          </p>
          <Image 
            src="/images/wemedia.png"
            width={imageWidth} 
            height={imageHeight} 
            alt="Personal Media"
            className="rounded-md select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
          />
        </div>
      );
    case 'movie':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3">
            {"I love watching movies, and my favorite is Dolby Cinema, which has excellent screen quality, color science, and sound effects."}
          </p>
          <Image 
            src="/images/movie.jpg"
            width={imageWidth} 
            height={imageHeight} 
            alt="movie"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
          />
        </div>
      );
    case 'volunteer':
      return (
        <div data-handle="true">
          <p className="text-xs mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-3">
            {"I actively participate in social practice, especially helping young students."}
          </p>
          <Image 
            src="/images/volunteer.jpg"
            width={imageWidth} 
            height={imageHeight} 
            alt="volunteer"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes={`(max-width: 480px) ${isVerySmall ? '180px' : '220px'}, (max-width: 768px) 240px, 300px`}
            quality={75}
          />
        </div>
      );
    default:
      return null;
  }
};

export default WindowContent; 