import { ReactNode } from "react";
import PriceFooter from "./PriceFooter";

type PriceInfo =
  | { type: "price"; duration: string; price: string }
  | { type: "contact" };

type Props = {
  title: ReactNode;
  description: ReactNode;
  priceInfo: PriceInfo;
  /** trueのとき白背景・影強めの強調スタイルを適用 */
  highlighted?: boolean;
};

/**
 * コース料金カード。
 * priceInfo で価格表示（PriceFooter）と「ご相談ください」表示を切り替える。
 * highlighted フラグで「おすすめプラン」の視覚的強調を切り替える。
 */
export default function CourseCard({
  title,
  description,
  priceInfo,
  highlighted = false,
}: Props) {
  const baseStyle = "flex flex-col p-8 rounded-[2.5rem] border group";
  const variantStyle = highlighted
    ? "bg-white/80 border-white shadow-md"
    : "bg-white/50 border-white/40 shadow-sm";

  return (
    <div className={`${baseStyle} ${variantStyle}`}>
      <h3 className="text-xl font-bold text-[#794C57] mb-4">{title}</h3>
      <div className="text-sm text-[#794C57] leading-relaxed font-medium">
        {description}
      </div>

      <div className="mt-auto pt-8">
        {priceInfo.type === "price" ? (
          <PriceFooter duration={priceInfo.duration} price={priceInfo.price} />
        ) : (
          <div className="bg-[#794C57]/5 p-4 rounded-xl text-center">
            <p className="text-[#794C57] font-bold">お気軽にご相談ください</p>
          </div>
        )}
      </div>
    </div>
  );
}
