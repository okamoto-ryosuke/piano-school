import Subtitle from "./Subtitle";

/**
 * 教室アクセス情報セクション。
 * 住所は体験レッスン予約後に個別案内するため、このセクションは
 * 地区情報と駐車・駐輪情報のみを表示する静的コンポーネント。
 */
export default function AccessSection() {
  return (
    <section id="access" className="mt-24 mb-12 scroll-mt-24">
      <Subtitle text="教室の場所について">
        <div className="text-center space-y-8 text-[#794C57]">
          <div className="space-y-4">
            <p className="text-[20px] md:text-[20px] font-medium">
              香川県高松市西町
              <br />
              亀岡小学校、新番長小学校、紫雲中学校区
            </p>
            <div className="bg-white/20 p-6 rounded-2xl border border-white/10 max-w-2xl mx-auto">
              <p className="text-[16px] md:text-[16px] opacity-80 leading-relaxed">
                ※個人宅の教室のため、詳細な住所につきましては、
                <br />
                体験レッスンのご予約確定後に個別にご案内しております。
                <br />
                何卒ご理解いただけますようお願い申し上げます。
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[15px] md:text-[15px] bg-[#794C57]/5 p-6 rounded-2xl border border-[#794C57]/10">
            <p className="flex items-center gap-2 font-medium">
              <span className="text-[20px] md:text-[20px]">🅿️</span>{" "}
              駐車場あり（1台分）
            </p>
            <div className="hidden sm:block w-px h-4 bg-[#794C57]/20" />
            <p className="flex items-center gap-2 font-medium">
              <span className="text-[20px] md:text-[20px]">🚲</span>{" "}
              駐輪スペースあり
            </p>
          </div>
        </div>
      </Subtitle>
    </section>
  );
}
