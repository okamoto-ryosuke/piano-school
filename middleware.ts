import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // /admin で始まるURLの時だけチェックする
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Area"',
        },
      });
    }

    // Basic認証のデコード
    const auth = Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    const user = auth[0];
    const pass = auth[1];

    // 環境変数と比較
    if (
      user !== process.env.ADMIN_USER ||
      pass !== process.env.ADMIN_PASSWORD
    ) {
      return new NextResponse("Invalid credentials", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Area"',
        },
      });
    }
  }

  return NextResponse.next();
}

// どのパスでこのミドルウェアを動かすか
export const config = {
  matcher: "/admin/:path*",
};
