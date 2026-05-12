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

    // GỬI ĐẾN GOOGLE APPS SCRIPT DỰ ÁN (AI Homes Sheet + Email chào mừng)
    const PROJECT_GAS_URL = "https://script.google.com/macros/s/AKfycbwImrTsEge7Q9S8sb3UjXiwVeZ6Re05Um5qD008d2wX0pwUVBPlkzdiSpucgxdrk30y/exec";

    // GỬI ĐẾN GOOGLE APPS SCRIPT TỔNG (0.0.TOTAL DATA CUSTOMER_VIMGROUP_2026)
    const GLOBAL_GAS_URL = "https://script.google.com/macros/s/AKfycbzVK3sPVnbDfcRxk8n_5vi-gRU2X_1GTXVHuU8kcrk6Kfk3wkpqKRDJACtb3msUFRm6/exec";
    const GLOBAL_SHEET_ID = "1LAtBjiRbwTxt7qu9XSYwzbVMNYBvC6guq-Zv_Yp3Cf0";

    try {
      await Promise.all([
        // Gửi cho dự án
        fetch(PROJECT_GAS_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ ...data, source: "aihomes.vimgroup.vn - AI Homes" }),
        }),
        // Gửi cho Database Tổng VIMGROUP
        fetch(GLOBAL_GAS_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ 
            ...data, 
            source: "aihomes.vimgroup.vn (contact-form)",
            targetSheetId: GLOBAL_SHEET_ID 
          }),
        })
      ]);
    } catch (gasError) {
      console.error('GAS Synchronization Error (non-blocking):', gasError);
    }

    return NextResponse.json({ success: true, message: "Gửi thông tin thành công." });
  } catch (error: any) {
    console.error('Lỗi khi gửi thông tin:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

