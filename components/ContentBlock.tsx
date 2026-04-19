import { ReactNode } from "react";
import BlockImage from "./BlockImage";
import Label from "./Label";

type Props = {
  /** セクションのid属性（スクロールナビ用） */
  id?: string;
  /** 欧文ラベル（例: "Textbooks"） */
  label: string;
  /** 日本語タイトル */
  title: string;
  /** 画像URL */
  imageUrl?: string;
  imageAlt?: string;
  imageFallback?: string;
  /** 画像を左右どちらに配置するか */
  imagePosition?: "left" | "right";
  /** タイトル下の本文エリア */
  children: ReactNode;
};

/**
 * 画像 + ラベル + タイトル + 本文 の2カラムレイアウトを統一するセクションコンポーネント。
 * imagePosition で画像の左右を切り替えられ、textbook / events / outreach の
 * 3セクションを同一構造で表現する。
 */
export default function ContentBlock({
  id,
  label,
  title,
  imageUrl,
  imageAlt = "",
  imageFallback = "No Image",
  imagePosition = "left",
  children,
}: Props) {
  const isImageRight = imagePosition === "right";
  const textPadding = isImageRight ? "md:pr-4" : "md:pl-8";
  const rowDirection = isImageRight ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <section id={id} className="mt-32 mb-24 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`flex flex-col ${rowDirection} items-center gap-12 md:gap-16`}
        >
          <BlockImage
            src={imageUrl}
            alt={imageAlt}
            fallbackLabel={imageFallback}
            decorationSide={imagePosition}
          />

          <div
            className={`w-full md:w-1/2 text-[#794C57] space-y-8 ${textPadding}`}
          >
            <div className="space-y-4">
              <Label label={label} />
              <h2 className="text-xl md:text-3xl font-bold font-[family-name:var(--font-hina)] leading-tight text-[#794C57]">
                {title}
              </h2>
            </div>

            <div className="pt-6 border-t border-[#794C57]/20 space-y-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
