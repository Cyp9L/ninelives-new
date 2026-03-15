import Image from 'next/image';

interface CatMarqueeProps {
  images: string[];
}

export default function CatMarquee({ images }: CatMarqueeProps) {
  const doubled = [...images, ...images];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((src, i) => (
          <div key={i} className="marquee-item">
            <Image
              src={src}
              alt="Chat adopté par Nine Lives Paris"
              width={280}
              height={200}
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}