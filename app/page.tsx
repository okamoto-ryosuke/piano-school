import Header from "../components/Header";
import Subtitle from "../components/Subtitle";
import HeroFrame from "../components/HeroFrame";
import Concept from "../components/Concept";
import ContentBlock from "../components/ContentBlock";
import CourseCard from "../components/CourseCard";
import Profile from "../components/Profile";
import Access from "../components/Access";
import Footer from "../components/Footer";
import { prisma } from "../lib/db";

// ---- 静的データ -------------------------------------------------------

const COURSES = [
  { label: "エレクトーン個人" },
  { label: "ピアノ個人" },
  { label: "聴音・ソルフェージュ" },
] as const;

const QUALIFICATIONS = [
  {
    text: "jet全日本エレクトーン指導者協会会員 /  ヤマハミュージック高松店支部所属 / \n アドバイザリースタッフ",
  },
  { text: "中学校教諭二種免許状（音楽）" },
  { text: "音楽療法セミナー受講経験あり" },
];

// ----------------------------------------------------------------------

export default async function Home() {
  const allImages = await prisma.image.findMany({
    orderBy: { id: "asc" },
  });

  const heroImages = allImages.slice(0, 3);
  const textbookImage = allImages[4];
  const eventImage = allImages[3];
  const outreachImage = allImages[5];

  return (
    <main className="flex flex-col min-h-screen bg-[#ecdce2]">
      {/* 1. ヘッダーナビゲーション */}
      <Header />

      {/* 2. ヒーローセクション */}
      <HeroFrame images={heroImages} />

      {/* 3. メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4">
        {/* 4. コンセプトメッセージ */}
        <Concept />

        {/* 5. 使用テキストの紹介 */}
        <ContentBlock
          id="textbook"
          label="Textbooks"
          title="楽しく基礎を身につける"
          imageUrl={textbookImage?.url}
          imageAlt={textbookImage?.title || "使用テキストの紹介"}
          imageFallback="No Image (ID:4)"
          imagePosition="left"
        >
          <p className="text-sm md:text-base font-medium leading-loose opacity-95">
            経験の有無、レベルや目標に合わせて
            <br />
            ご提案しています。
            <br className="hidden md:block" />
            「あこがれのあの曲が弾けるようになりたい」
            <br className="hidden md:block" />
            「合唱の伴奏がしたい」など大歓迎です♪
          </p>
          <div className="bg-white/30 p-5 rounded-2xl border border-white/20">
            <p className="text-xs md:text-base leading-loose opacity-95 text-center">
              はじめてのお子さまはjetの教材
              <span className="font-bold text-[#794C57]">
                <br />
                「だいすきシリーズ」
              </span>
              を使い、
              <br />
              エレクトーン、ピアノどちらにも
              <br />
              進級できるよう、楽しみながら
              <br />
              多角的に音楽を学びます。
            </p>
          </div>
        </ContentBlock>

        {/* 6. イベント紹介 */}
        <ContentBlock
          id="events"
          label="Events"
          title="音楽の輪が広がるステージ"
          imageUrl={eventImage?.url}
          imageAlt="イベントの様子"
          imageFallback="No Image (ID:5)"
          imagePosition="right"
        >
          <p className="text-base leading-loose opacity-95">
            ホールコンサート(発表会)やサウンドカーニバルコンサート(アレンジ曲やオリジナル曲を演奏)などを開催。大人から子どもまでたくさんの生徒さんにご参加いただいています。
          </p>
          <div className="flex items-center gap-3 py-2">
            <div className="h-[1px] flex-grow bg-[#794C57]/20" />
            <p className="text-sm md:text-base font-bold text-[#794C57] italic">
              自宅レッスン室にてホームコンサートも
              <br />
              行っています♪
            </p>
            <div className="h-[1px] flex-grow bg-[#794C57]/20" />
          </div>
        </ContentBlock>

        {/* 7. おさんぽコンサート */}
        <ContentBlock
          id="outreach"
          label="Activities"
          title="おさんぽコンサート"
          imageUrl={outreachImage?.url}
          imageAlt="おさんぽコンサート"
          imageFallback="No Image (ID:6)"
          imagePosition="left"
        >
          <p className="text-base leading-loose opacity-95">
            jetヤマハミュージック高松店支部会員有志のグループ「おさんぽ隊」の一員として、幼稚園や小学校、公民館や丸亀町商店街などで演奏。明るく元気な音楽をお届けしています。
            <br />
            コンサートでは、エレクトーン、ピアノはもちろん、ソプラノサックス、テナーサックス、フルート、打楽器、鍵盤ハーモニカ、ハンドベル、オタマトーンなどいろいろな楽器を用いて演奏しています。
            私はエレクトーン、ピアノ、テナーサックス、鍵盤ハーモニカ、オタマトーンを担当。
          </p>
          <div className="mt-10 space-y-6">
            <p className="text-base md:text-lg font-bold text-[#794C57] flex items-center gap-2">
              活動の様子はInstagramでご覧ください♪
            </p>
            <div>
              <a
                href="https://www.instagram.com/jet.takamatsu_electone.piano?igsh=MWJmdTA4aWEyMmRubA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-base md:text-xl font-bold text-[#794C57] border-b-2 border-[#794C57]/40 pb-1 hover:pb-2 hover:opacity-70 transition-all group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform inline-block">
                  📸
                </span>
                演奏依頼はこちらまで
              </a>
            </div>
          </div>
        </ContentBlock>

        {/* 8. 料金・コースセクション */}
        <section id="courses" className="mt-28 mb-20 scroll-mt-24">
          <Subtitle text="コース・お月謝">
            <div className="max-w-5xl mx-auto px-4 space-y-12">
              {/* 入会金・体験レッスン */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 text-center">
                <div className="bg-white/60 border-2 border-[#794C57]/20 px-8 py-4 rounded-2xl shadow-sm">
                  <p className="text-[#794C57] text-sm font-bold opacity-70">
                    Admission
                  </p>
                  <p className="text-[#794C57] text-xl md:text-2xl font-bold">
                    入会金なし
                  </p>
                </div>
                <div className="bg-[#794C57] px-8 py-4 rounded-2xl shadow-md">
                  <p className="text-white/70 text-sm font-bold tracking-widest">
                    Trial Lesson
                  </p>
                  <p className="text-white text-xl md:text-2xl font-bold">
                    体験レッスン無料
                  </p>
                </div>
              </div>

              {/* コース一覧 */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-6">
                {COURSES.map(({ label }) => (
                  <div
                    key={label}
                    className="bg-white/40 px-6 py-2.5 rounded-full border border-[#794C57]/10 text-[#794C57] font-bold"
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* 料金カード */}
              <div className="grid md:grid-cols-3 gap-6">
                <CourseCard
                  highlighted
                  title={
                    <>
                      年間42回
                      <br />
                      レッスン
                    </>
                  }
                  description={
                    <>
                      基礎からしっかり
                      <br />
                      学びたい、
                      <br />
                      上達を目指す方へ。
                    </>
                  }
                  priceInfo={{
                    type: "price",
                    duration: "30分",
                    price: "6,500",
                  }}
                />
                <CourseCard
                  title="月2回レッスン"
                  description={
                    <>
                      忙しい方や、
                      <br />
                      趣味として楽しみたい方へ。
                    </>
                  }
                  priceInfo={{
                    type: "price",
                    duration: "30分",
                    price: "4,000",
                  }}
                />
                <CourseCard
                  title="単発レッスン"
                  description={
                    <>
                      試験前やイベント前の
                      <br />
                      アドバイスが欲しい方へ。
                    </>
                  }
                  priceInfo={{ type: "contact" }}
                />
              </div>

              {/* CTA */}
              <div className="flex justify-center mt-12">
                <a
                  href="/reservation"
                  className="bg-[#794C57] text-[#ECDCE2] px-10 py-4 rounded-full text-lg tracking-widest shadow-xl hover:bg-[#794C57]/90 transition-all active:scale-95 font-[family-name:var(--font-hina)]"
                >
                  無料体験お申し込み
                </a>
              </div>
            </div>
          </Subtitle>
        </section>

        {/* 9. プロフィール */}
        <Profile name="岡本 悦子" qualifications={QUALIFICATIONS} />

        {/* 10. アクセス情報 */}
        <Access />

        <Footer />
      </div>
    </main>
  );
}
