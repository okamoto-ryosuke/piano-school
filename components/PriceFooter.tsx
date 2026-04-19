type Props = {
  duration: string;
  price: string;
};

/**
 * CourseCard のフッター用：時間と価格の表示を統一するコンポーネント。
 * price は数値で受け取り、表示フォーマットはこのコンポーネントが責任を持つ。
 */
export default function PriceFooter({ duration, price }: Props) {
  return (
    <div className="flex justify-between items-end border-b-2 border-[#794C57]/10 pb-2">
      <span className="text-sm font-bold text-[#794C57]">{duration} 〜</span>
      <span className="text-2xl font-bold text-[#794C57]">
        {price}
        <span className="text-xs ml-1 font-normal">円 〜</span>
      </span>
    </div>
  );
}
