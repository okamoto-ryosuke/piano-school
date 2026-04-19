"use client";

import React, { useState, useEffect } from "react";

/**
 * ヒーロー画像（トップ写真）を額縁で囲むコンポーネント
 * 修正内容:
 * - images 配列を受け取り、一定時間で切り替わるスライドショー機能を追加。
 * - 元のアニメーション演出を維持。
 */
export default function HeroFrame({
  images,
}: {
  images: { url: string; title?: string | null }[];
}) {
  const [scrollY, setScrollY] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. スクロール処理（既存）
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. スライドショータイマー（新規）
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5秒ごとに切り替え
    return () => clearInterval(timer);
  }, [images.length]);

  const imageTranslateY = scrollY * 0.3;
  const contentOpacity = Math.max(0, 1 - scrollY / 400);

  // 画像がない場合の安全策
  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-[80vh] md:h-screen overflow-hidden p-4 md:p-8 bg-[#ECDCE2]">
      {/* 1. メインの写真コンテナ */}
      <div className="relative w-full h-full overflow-hidden shadow-inner bg-gray-100 opacity-0 animate-[expand-in_1.5s_ease-out_forwards]">
        <div className="relative w-full h-full overflow-hidden">
          {images.map((image, index) => (
            <img
              key={image.url}
              src={image.url}
              alt={image.title || "ピアノ教室の風景"}
              style={{
                transform: `translateY(${imageTranslateY}px)`,
                transition: "opacity 1.5s ease-in-out", // 切り替えをふわっとさせる
              }}
              className={`w-full h-[120%] object-cover absolute top-[-10%] animate-[zoom-out_2s_ease-out_forwards] ${
                index === currentIndex ? "opacity-100 z-0" : "opacity-0 -z-10"
              }`}
            />
          ))}
        </div>

        {/* 2. 額縁の装飾（既存のまま） */}
        <div className="absolute top-0 left-0 w-6 h-6 md:w-10 md:h-10 bg-[#ECDCE2] rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-sm opacity-0 animate-[pop-in-simple_0.5s_ease-out_1.0s_forwards]" />
        <div className="absolute top-0 right-0 w-6 h-6 md:w-10 md:h-10 bg-[#ECDCE2] rounded-full translate-x-1/2 -translate-y-1/2 z-20 shadow-sm opacity-0 animate-[pop-in-simple_0.5s_ease-out_1.1s_forwards]" />
        <div className="absolute bottom-0 left-0 w-6 h-6 md:w-10 md:h-10 bg-[#ECDCE2] rounded-full -translate-x-1/2 translate-y-1/2 z-20 shadow-sm opacity-0 animate-[pop-in-simple_0.5s_ease-out_1.2s_forwards]" />
        <div className="absolute bottom-0 right-0 w-6 h-6 md:w-10 md:h-10 bg-[#ECDCE2] rounded-full translate-x-1/2 translate-y-1/2 z-20 shadow-sm opacity-0 animate-[pop-in-simple_0.5s_ease-out_1.3s_forwards]" />

        <div className="absolute inset-2 md:inset-4 border border-white/20 pointer-events-none z-10 opacity-0 animate-[fade-in_1.2s_ease-out_0.6s_forwards]" />
      </div>

      {/* 3. キャッチコピー（既存のまま） */}
      <div
        className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
        style={{ opacity: contentOpacity }}
      >
        <div className="text-center px-4 opacity-0 animate-[tracking-out_2s_ease-out_1.5s_forwards]">
          <h2 className="text-white text-3xl md:text-5xl drop-shadow-xl font-normal [text-shadow:_0_2px_15px_rgb(0_0_0_/_50%)]">
            音楽を奏でる、心を育む
          </h2>
        </div>
      </div>

      <style jsx global>{`
        @keyframes expand-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes zoom-out {
          from {
            scale: 1.15;
          }
          to {
            scale: 1;
          }
        }
        @keyframes tracking-out {
          from {
            opacity: 0;
            letter-spacing: 0.1em;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            letter-spacing: 0.3em;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes pop-in-simple {
          0% {
            opacity: 0;
            scale: 0.5;
          }
          70% {
            scale: 1.1;
          }
          100% {
            opacity: 1;
            scale: 1;
          }
        }
      `}</style>
    </div>
  );
}
