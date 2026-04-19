import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema.prisma",
  datasource: {
    // 実行時もここが参照されます
    url: process.env.DATABASE_URL,
  },
});
