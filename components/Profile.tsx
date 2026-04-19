import Subtitle from "./Subtitle";

type Qualification = {
  text: string;
};

type Props = {
  name: string;
  qualifications: Qualification[];
};

/**
 * 講師プロフィールセクション。
 * 資格リストを配列で受け取ることで、将来の追加・変更をページ側で完結させる。
 */
export default function ProfileSection({ name, qualifications }: Props) {
  return (
    <section id="profile" className="mt-20 scroll-mt-24">
      <Subtitle text="プロフィール">
        <div className="max-w-3xl mx-auto bg-white/40 p-10 rounded-[2.5rem] border border-white/30 text-[#794C57]">
          <div className="text-center space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-bold tracking-[0.3em] opacity-50 uppercase">
                Instructor
              </p>
              <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-hina)]">
                {name}
              </h3>
            </div>

            <ul className="text-left inline-block space-y-4 text-sm md:text-base whitespace-pre-wrap">
              {qualifications.map((q, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-[#794C57]/40 rounded-full flex-shrink-0" />
                  <span>{q.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Subtitle>
    </section>
  );
}
