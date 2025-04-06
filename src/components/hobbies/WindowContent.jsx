import Image from "next/image";

const WindowContent = ({ id }) => {
  switch(id) {
    case 'photography':
      return (
        <div data-handle="true">
          <p className="text-sm mb-4">
            {"I love capturing landscapes and portraits."}
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
            width={300} 
            height={200} 
            alt="photography"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes="(max-width: 640px) 100vw, 300px"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQQERYYE9QUFJ5WGB3enh+P0BJeXhgY3j/2wBDAR"
          />
        </div>
      );
    case 'music':
      return (
        <div data-handle="true">
          <p className="text-sm mb-4">
            {"Listening to jazz and electronic music is my hobby. I also play DJ."}
          </p>
          <Image 
            src="/images/DJ.png" 
            width={300} 
            height={200} 
            alt="dj"
            className="rounded-md select-none pointer-events-none"
            sizes="(max-width: 640px) 100vw, 300px"
            quality={75}
          />
        </div>
      );
    case 'pet':
      return (
        <div data-handle="true">
          <p className="text-sm mb-4">
            {'I love cat and dog. I have 2 cats named "DoiYuk" (white) and "WongChoi" (black).'}
          </p>
          <Image 
            src="/images/cats.jpg" 
            width={300} 
            height={200} 
            alt="myCat"
            className="rounded-md select-none pointer-events-none"
            sizes="(max-width: 640px) 100vw, 300px"
            quality={75}
          />
        </div>
      );
    case 'travel':
      return (
        <div data-handle="true">
          <p className="text-sm mb-4">
            {"I love traveling and exploring new places. I've visited 10 countries in 2024, experiencing different cultures and capturing beautiful moments."}
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080"
            width={300} 
            height={200} 
            alt="travel"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes="(max-width: 640px) 100vw, 300px"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQQERYYE9QUFJ5WGB3enh+P0BJeXhgY3j/2wBDAR"
          />
        </div>
      );
    case 'fitness':
      return (
        <div data-handle="true">
          <p className="text-sm mb-4">
            {"Staying active is important to me. I enjoy working out and maintaining a healthy lifestyle through regular exercise and proper nutrition."}
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
            width={300} 
            height={200} 
            alt="fitness"
            className="rounded-md object-cover select-none pointer-events-none"
            unoptimized
          />
        </div>
      );
    case 'anime':
      return (
        <div data-handle="true">
          <p className="text-sm mb-4">
            {"I'm passionate about anime and manga. I enjoy watching various genres and collecting manga series. My favorite genres include slice of life, sci-fi, and psychological thrillers."}
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1578632767115-351597cf2477"
            width={300} 
            height={200} 
            alt="anime"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes="(max-width: 640px) 100vw, 300px"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQQERYYE9QUFJ5WGB3enh+P0BJeXhgY3j/2wBDAR"
          />
        </div>
      );
    case 'art':
      return (
        <div data-handle="true">
          <p className="text-sm mb-4">
            {"I enjoy expressing my creativity through drawing and painting. It's a great way to relax and explore my artistic side. I particularly enjoy digital art and watercolor painting."}
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b"
            width={300} 
            height={200} 
            alt="art"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes="(max-width: 640px) 100vw, 300px"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQQERYYE9QUFJ5WGB3enh+P0BJeXhgY3j/2wBDAR"
          />
        </div>
      );
    case 'volunteer':
      return (
        <div data-handle="true">
          <p className="text-sm mb-4">
            {"I believe in giving back to the community. I regularly participate in volunteer activities, including environmental cleanups, teaching coding to underprivileged youth, and organizing community events."}
          </p>
          <Image 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a"
            width={300} 
            height={200} 
            alt="volunteer"
            className="rounded-md object-cover select-none pointer-events-none"
            sizes="(max-width: 640px) 100vw, 300px"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQQERYYE9QUFJ5WGB3enh+P0BJeXhgY3j/2wBDAR"
          />
        </div>
      );
    default:
      return null;
  }
};

export default WindowContent; 