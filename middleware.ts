import { NextResponse } from "next/server";

export function middleware() {
  // 何もせず、すべてのアクセスを許可して通す
  return NextResponse.next();
}

// マッチャーを空にするか、静的ファイルを除外する設定にする
export const config = {
  matcher: [],
};
