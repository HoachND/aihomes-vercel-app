import { NextResponse } from 'next/server';

const BOT_TOKEN = '8724327895:AAG4lf55tebnB0RhCqxwoTa_-rG4T8QXutQ';
const CHAT_ID = '-5179603882';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, email, projectType } = data;

    const message = `🔔 KHÁCH HÀNG MỚI ĐỂ LẠI SĐT!
━━━━━━━━━━━━━━━━━━
👤 Tên KH: ${name}
📞 SĐT: ${phone}
📧 Email: ${email || 'Không có'}
🏢 Loại công trình: ${projectType || 'Không rõ'}
📌 Nguồn: Form Nhận Báo Giá - AI Homes
━━━━━━━━━━━━━━━━━━
⚡ Gọi ngay để tư vấn!`;

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    if (!response.ok) {
      throw new Error('Telegram API responded with ' + response.status);
    }

    // GỬI ĐẾN GOOGLE APPS SCRIPT (Ghi Sheet + Email chào mừng)
    // ⚠️ SẾP: Thay URL bên dưới bằng URL Web App sau khi triển khai GAS
    const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwImrTsEge7Q9S8sb3UjXiwVeZ6Re05Um5qD008d2wX0pwUVBPlkzdiSpucgxdrk30y/exec";

    try {
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          ...data,
          source: "Form Nhận Báo Giá - aihomes.vercel.app"
        }),
      });
    } catch (gasError) {
      console.error('GAS Error (non-blocking):', gasError);
    }

    return NextResponse.json({ success: true, message: "Gửi thông tin thành công." });
  } catch (error: any) {
    console.error('Lỗi khi gửi thông tin:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

