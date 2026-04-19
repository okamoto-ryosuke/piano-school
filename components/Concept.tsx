/**
 * トップページのコンセプトメッセージセクション。
 * 左：キャッチコピー / 右：説明文 の2カラム固定レイアウト。
 * テキストが変わらない静的なセクションのため props を持たず独立したコンポーネントとする。
 */
export default function Concept() {
  return (
    <section className="mt-24 max-w-4xl mx-auto px-4">
      <div className="grid md:grid-cols-11 gap-8 items-center bg-white/40 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-white/30">
        {/* タイトルセクション（左側） */}
        <div className="md:col-span-4 text-left space-y-4">
          <span className="text-[#794C57]/60 text-sm font-bold tracking-widest uppercase">
            Concept
          </span>
          <h2 className="text-3xl font-bold text-[#794C57] leading-tight font-[family-name:var(--font-hina)]">
            音で遊ぶ、
            <br />
            音楽を奏でる、
            <br />
            感性を磨く
          </h2>
          <div className="w-16 h-1 bg-[#794C57] rounded-full" />
        </div>

        {/* 本文セクション（右側） */}
        <div className="md:col-span-7 text-[#794C57] leading-loose space-y-6 border-l md:pl-10 border-[#794C57]/10">
          <p>
            大人から子どもまで、一人ひとりの目標や個性を大切にしたレッスンを心がけています。
            子どもの生徒さんは、音楽の基礎を身につけ将来好きな曲を自由に演奏できること、音楽を通して豊かな感性が育まれることを目指しています。
            大人の生徒さんには、新たな趣味として、リフレッシュの時間として通っていただいています。
          </p>
          <p className="font-bold text-lg">
            「音楽って楽しい」があふれる教室です！
            <br />
            まずは無料体験レッスンへ♪
          </p>
        </div>
      </div>
    </section>
  );
}
