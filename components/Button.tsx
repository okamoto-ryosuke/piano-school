import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
};

/**
 * ピアノ教室 予約ボタン
 * - 背景をアクセントカラーのモーヴ系(#794C57)に、文字を内装色のベージュ(#ECDCE2)に設定
 * - ひな明朝の繊細さを活かすため、字間を広めに設定
 */
export default function Button({ href, children }: Props) {
  return (
    <Link
      href={href}
      className="inline-block bg-[#794C57] text-[#ECDCE2] px-8 py-3 rounded-full shadow-md hover:bg-[#794C57]/90 transition-all tracking-[0.15em] font-medium"
    >
      {children}
    </Link>
  );
}
