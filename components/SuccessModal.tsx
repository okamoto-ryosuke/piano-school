"use client";

import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-sm w-full space-y-6 animate-in zoom-in-95 duration-300">
        <div className="text-5xl">✨</div>
        <h3 className="text-xl font-bold text-brand">予約完了</h3>
        <p className="text-sm opacity-70 leading-relaxed text-brand">
          お申し込みありがとうございました。
          <br />
          内容を確認し、折り返しご連絡いたします。
        </p>
        <button
          onClick={onClose}
          className="w-full py-4 bg-brand text-white rounded-xl font-bold shadow-md hover:brightness-90 transition-all"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
