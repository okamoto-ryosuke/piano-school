import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";
const { Pool } = pkg;

// 開発環境でのホットリロード対策（シングルトンパターン）
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// .env から環境変数を読み込む
// DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL が設定されていません。.env ファイルを確認してください。",
  );
}

// PostgreSQL 接続プールの作成
const pool = new Pool({ connectionString });

// Prisma 7 用のドライバーアダプター
const adapter = new PrismaPg(pool);

// PrismaClient の初期化
// schema.prisma で url を指定していない場合、ここで adapter を渡すことで接続が確立されます
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
