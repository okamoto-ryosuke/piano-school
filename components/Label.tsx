type Props = {
  label: string;
};

/**
 * 欧文ラベル + 装飾ラインのセット。
 * Textbooks / Events / Activities など各セクションの先頭で使用する。
 */
export default function Label({ label }: Props) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-bold tracking-[0.3em] text-[#794C57]/50 uppercase">
        {label}
      </span>
      <div className="h-[1px] w-12 bg-[#794C57]/20" />
    </div>
  );
}
