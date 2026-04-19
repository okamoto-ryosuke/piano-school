/** @type {import('next').NextConfig} */
const nextconfig = {
  typescript: {
    // !! 警告 !!
    // プロジェクトに型エラーがあっても、本番ビルドを強制的に完了させる設定です
    ignoreBuildErrors: true,
  },
  // 他の設定があればここに続く
};

export default nextconfig;
