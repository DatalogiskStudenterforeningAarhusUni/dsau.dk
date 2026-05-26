interface PhotoInfo {
  text?: string;     
  image: string; 
  imagePosition?: string; 
  imageFocus?: number;
}

export default function Photo({ text, image, imagePosition, imageFocus }: PhotoInfo) {
  const positionStyle = {
    objectPosition: imagePosition 
      ?? (typeof imageFocus === "number" ? `50% ${imageFocus}%` : "center")
  };

  return (
    <article className="relative aspect-square w-full overflow-hidden rounded-lg group cursor-pointer bg-neutral-200 dark:bg-neutral-800">
      {image && (
        <img
          src={image}
          alt={text || "Gallery image"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={positionStyle}
        />
      )}

      {text && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md border-t border-white/10 p-3">
          <h3 className="text-sm font-medium text-white leading-tight truncate text-center">
            {text}
          </h3>
        </div>
      )}
    </article>
  );
}