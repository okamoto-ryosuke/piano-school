type Props = {
  src?: string;
  alt: string;
  fallbackLabel: string;
  decorationSide?: "left" | "right";
};

/**
 * 画像 + ホバー演出 + フォールバック表示を担うプレゼンテーションコンポーネント。
 * ContentSection 内で再利用される。
 */
export default function BlockImage({
  src,
  alt,
  fallbackLabel,
  decorationSide = "left",
}: Props) {
  const decorationPosition =
    decorationSide === "left"
      ? "top-4 left-4 group-hover:translate-x-1 group-hover:translate-y-1"
      : "top-4 right-4 group-hover:-translate-x-1 group-hover:translate-y-1";

  return (
    <div className="w-full md:w-1/2">
      <div className="relative group">
        {/* 奥行きを演出する装飾レイヤー */}
        <div
          className={`absolute ${decorationPosition} w-full h-full bg-[#794C57]/5 rounded-[2rem] -z-10 transition-transform`}
        />

        {src ? (
          <div className="overflow-hidden rounded-[2rem] shadow-xl border border-white/20">
            <img
              src={src}
              alt={alt}
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-white/30 rounded-[2rem] flex items-center justify-center text-[#794C57]/40 border border-white/20">
            {fallbackLabel}
          </div>
        )}
      </div>
    </div>
  );
}
