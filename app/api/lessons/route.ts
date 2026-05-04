import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import nodemailer from "nodemailer";

// iCloudの送信設定
const transporter = nodemailer.createTransport({
  host: "smtp.mail.me.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const formatTime = (date: Date) => {
  return date.toISOString().substring(11, 16);
};

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: { lessonDate: "asc" },
    });

    const formattedLessons = lessons.map((lesson: any) => ({
      ...lesson,
      lessonDate: formatDate(lesson.lessonDate),
      startTime: formatTime(lesson.startTime),
      endTime: formatTime(lesson.endTime),
    }));

    return NextResponse.json(formattedLessons);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "取得に失敗しました" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      lessonDate,
      startTime,
      endTime,
      studentName,
      phone,
      preferredTime,
      email, // もしフォームにお客様のメアド項目を追加したならこれも受け取る
    } = body;

    let lesson;

    if (id && studentName) {
      lesson = await prisma.lesson.update({
        where: { id: Number(id) },
        data: { studentName, phone, preferredTime },
      });

      // --- 1. 管理者（あなた）への通知メール ---
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `【予約通知】${studentName}様より体験予約`,
        text: `新しい予約を受け付けました。\n\nお名前：${studentName} 様\n日時：${lessonDate} ${startTime}〜${endTime}\n電話：${phone}\n折り返し希望時間：${preferredTime}`,
      };

      // --- 2. 予約者（お客様）への自動返信メール ---
      // ※現在は電話番号しか取得していないため、本来はフォームに「メールアドレス」項目が必要です。
      // もしメールアドレスを取得しない場合は、ショートメッセージ(SMS)等になりますが、
      // ここでは「メールアドレスも取得している」と仮定した実装例を載せます。
      const customerMailOptions = {
        from: process.env.EMAIL_USER,
        to: email || phone, // 本来は入力されたメールアドレス
        subject: `体験レッスンのご予約を承りました（jouer*musique）`,
        text: `
${studentName} 様

この度は体験レッスンへのお申し込みありがとうございます。
以下の内容で予約を受け付けました。

■ ご予約日時
日程：${lessonDate}
時間：${startTime} 〜 ${endTime}

内容を確認し、後ほど改めてご連絡させていただきます。
今しばらくお待ちください。

--------------------------------------------------
jouer*musique エレクトーン・ピアノ教室
代表：岡本 悦子
--------------------------------------------------
        `,
      };

      try {
        // 両方のメールを送信
        await Promise.all([
          transporter.sendMail(adminMailOptions),
          // emailが存在する場合のみ送信
          email ? transporter.sendMail(customerMailOptions) : Promise.resolve(),
        ]);
      } catch (mailErr) {
        console.error("Mail Sending Error:", mailErr);
      }
    } else {
      // 枠の新規作成（管理者操作）
      lesson = await prisma.lesson.create({
        data: {
          lessonDate: new Date(`${lessonDate}T00:00:00Z`),
          startTime: new Date(`1970-01-01T${startTime}:00Z`),
          endTime: new Date(`1970-01-01T${endTime}:00Z`),
        },
      });
    }

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "処理に失敗しました" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "idが必要です" }, { status: 400 });
    }

    await prisma.lesson.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }
}
