import React from "react";

interface SubtitleFrameProps {
  text: string;
  children?: React.ReactNode;
}

/**
 * サブタイトル用フレームコンポーネント（コンテンツ一体型）
 * - 指定のデザイン（丸み、◆、色）を維持
 * - 下部の白背景コンテンツ（#ffffff）の角に程よい丸みを設定
 * - タイトルがコンテンツエリアに半分重なるレイアウト
 */
const SubtitleFrame: React.FC<SubtitleFrameProps> = ({ text, children }) => {
  return (
    <div className="relative w-full overflow-visible my-12">
      {/* 1. サブタイトル部分: z-indexを上げて白背景より手前に配置 */}
      <div className="relative z-20 flex justify-center px-4">
        <div className="border border-[#794C57] bg-[#ECDCE2] rounded-full px-10 py-2 md:px-14 md:py-3 shadow-sm relative w-fit">
          {/* 装飾の◆ */}
          <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-[#794C57] text-[10px]">
            ◆
          </span>
          <span className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-[#794C57] text-[10px]">
            ◆
          </span>

          <h2 className="text-[#794C57] text-lg md:text-xl tracking-[0.2em] text-center mx-2">
            {text}
          </h2>
        </div>
      </div>

      {/* 2. 白背景のコンテンツエリア (#ffffff) 
          - rounded-lg: 最小限から「程よい丸み」へ変更し、少し優しい印象に
          - shadow-md: 形状に合わせて影の広がりを調整
      */}
      {children && (
        <div className="bg-[#ffffff] -mt-6 md:-mt-7 pt-16 pb-20 px-6 md:px-12 relative z-10 rounded-lg md:rounded-xl shadow-[0_8px_30px_-10px_rgba(121,76,87,0.12)] mx-2 md:mx-4">
          <div className="max-w-4xl mx-auto text-[#794C57]">{children}</div>
        </div>
      )}
    </div>
  );
};

export default SubtitleFrame;
