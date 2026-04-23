// ============================================================
// GOOGLE APPS SCRIPT - AI HOMES LEAD AUTOMATION
// Email: aihomes.vimgroup@gmail.com
// ============================================================
// HƯỚNG DẪN CÀI ĐẶT:
// 1. Mở Google Sheet "Data Customer_aihomes.vercel.app" bằng email aihomes.vimgroup@gmail.com
//    Link: https://docs.google.com/spreadsheets/d/1SMu1JYF4KRRDcAFT0mf2kdjchUAq7A2xu9TjEJyTsWA/edit
// 2. Vào Tiện ích mở rộng → Apps Script
// 3. Xoá code mặc định, dán TOÀN BỘ code này vào
// 4. Bấm Lưu (Ctrl+S)
// 5. Bấm Triển khai → Tùy chọn triển khai mới → Chọn loại: Ứng dụng web (Web App)
//    - Mô tả: "AI Homes Lead Capture v1"
//    - Thực thi dưới quyền: Tôi (aihomes.vimgroup@gmail.com)
//    - Ai có quyền truy cập: Bất kỳ ai (Anyone)
// 6. Bấm Triển khai → Copy URL Web App
// 7. Dán URL vào file route.ts (biến GOOGLE_APPS_SCRIPT_URL)
// ============================================================

// Tên Sheet chứa data (phải khớp tên tab bên dưới)
var SHEET_NAME = "Leads_AI Homes";
var CONTENT_SHEET_NAME = "Website_Content";

// Thông tin Messenger để chèn vào Email
var MESSENGER_URL = "https://m.me/aihome99";

// Thông tin Hotline
var HOTLINE = "0986 969 339";

// ============================================================
// HÀM LẤY DỮ LIỆU WEBSITE (CMS)
// ============================================================
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(CONTENT_SHEET_NAME);

    // Nếu chưa có tab Website_Content, tạo mới và điền mẫu
    if (!sheet) {
      sheet = ss.insertSheet(CONTENT_SHEET_NAME);
      sheet.appendRow(["Key", "Vietnamese", "English"]);
      sheet.appendRow(["hero_title", "THIẾT KẾ NỘI THẤT SANG TRỌNG VÀ TIỆN NGHI", "LUXURIOUS AND COMFORTABLE INTERIOR DESIGN"]);
      sheet.appendRow(["hero_subtitle", "Chuyên thiết kế, thi công văn phòng, phòng khách, biệt thự...", "Specializing in designing and executing offices, living rooms, villas..."]);
      sheet.getRange("A1:C1").setFontWeight("bold").setBackground("#fbbf24");
    }

    var data = sheet.getDataRange().getValues();
    var content = { "vi": {}, "en": {} };

    // Bỏ qua dòng tiêu đề (i=0), chạy từ i=1
    for (var i = 1; i < data.length; i++) {
      var key = data[i][0];
      if (key) {
        content["vi"][key] = data[i][1];
        content["en"][key] = data[i][2];
      }
    }

    return ContentService.createTextOutput(JSON.stringify(content))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "error": err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    // Lấy sheet theo tên
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.getActiveSheet();
    }

    // Parse dữ liệu JSON từ NextJS
    var data = JSON.parse(e.postData.contents);
    var name = data.name || "Khách hàng";
    var phone = data.phone || "";
    var email = data.email || "";
    var projectType = data.projectType || "";
    var source = data.source || "Form Nhận Báo Giá - aihomes.vercel.app";

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 1. GHI VÀO GOOGLE SHEET
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    var timestamp = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
    sheet.appendRow([timestamp, name, phone, email, projectType, source]);

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 2. GỬI EMAIL CHÀO MỪNG KHÁCH HÀNG
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (email && email.includes("@")) {
      sendWelcomeEmail(name, email, phone, projectType);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ "status": "success", "message": "Data saved & email sent" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ "status": "error", "message": err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
// HÀM GỬI EMAIL CHÀO MỪNG (Mẫu tham khảo Rạng Đông)
// ============================================================
function sendWelcomeEmail(name, email, phone, projectType) {
  var subject = "🏠 Cảm ơn bạn đã liên hệ AI Homes - Chúng tôi sẽ phản hồi trong 24h!";

  var htmlBody = '<!DOCTYPE html>' +
    '<html>' +
    '<head><meta charset="utf-8"></head>' +
    '<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:Arial,Helvetica,sans-serif;">' +

    // === WRAPPER ===
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;">' +
    '<tr><td align="center" style="padding:30px 10px;">' +
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">' +

    // === HEADER - Dark với Logo ===
    '<tr><td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding:35px 30px; text-align:center;">' +
    '<h1 style="color:#fbbf24; margin:0; font-size:32px; font-weight:800; letter-spacing:1px;">AI Homes</h1>' +
    '<p style="color:#94a3b8; margin:8px 0 0 0; font-size:14px; letter-spacing:3px;">THIẾT KẾ & THI CÔNG NỘI THẤT CAO CẤP</p>' +
    '<p style="color:#64748b; margin:4px 0 0 0; font-size:12px;">Trực thuộc Công ty Cổ phần Đầu tư VIMGROUP</p>' +
    '</td></tr>' +

    // === GREETING ===
    '<tr><td style="padding:35px 35px 10px 35px;">' +
    '<h2 style="color:#1e293b; margin:0 0 15px 0; font-size:22px;">Xin chào <span style="color:#d97706;">' + name + '</span> 👋</h2>' +
    '<p style="color:#475569; line-height:1.8; margin:0; font-size:15px;">' +
    'Cảm ơn bạn đã tin tưởng và quan tâm đến giải pháp <strong>thiết kế & thi công nội thất cao cấp</strong> của <strong style="color:#d97706;">AI Homes</strong>.' +
    '</p>' +
    '</td></tr>' +

    // === THÔNG TIN ĐĂNG KÝ ===
    '<tr><td style="padding:15px 35px;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fefce8; border-radius:12px; border:1px solid #fde68a;">' +
    '<tr><td style="padding:20px 25px;">' +
    '<h3 style="color:#92400e; margin:0 0 12px 0; font-size:16px;">📋 Thông tin đăng ký của bạn:</h3>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' +
    '<tr><td style="padding:6px 0; color:#78350f; font-size:14px; width:140px;">👤 Họ và tên:</td><td style="padding:6px 0; color:#1e293b; font-size:14px; font-weight:bold;">' + name + '</td></tr>' +
    '<tr><td style="padding:6px 0; color:#78350f; font-size:14px;">📞 Số điện thoại:</td><td style="padding:6px 0; color:#1e293b; font-size:14px; font-weight:bold;">' + phone + '</td></tr>' +
    '<tr><td style="padding:6px 0; color:#78350f; font-size:14px;">🏢 Loại công trình:</td><td style="padding:6px 0; color:#d97706; font-size:14px; font-weight:bold;">' + (projectType || 'Chưa xác định') + '</td></tr>' +
    '</table>' +
    '</td></tr></table>' +
    '</td></tr>' +

    // === BƯỚC TIẾP THEO ===
    '<tr><td style="padding:15px 35px;">' +
    '<div style="background: linear-gradient(135deg, #0f172a 0%, #334155 100%); border-radius:12px; padding:25px 25px;">' +
    '<h3 style="color:#fbbf24; margin:0 0 12px 0; font-size:16px;">⚡ Bước tiếp theo:</h3>' +
    '<p style="color:#e2e8f0; margin:0; line-height:1.7; font-size:14px;">' +
    '✅ <strong>Kiến trúc sư</strong> của AI Homes sẽ liên hệ trực tiếp với bạn qua <strong>Zalo / SĐT</strong> trong vòng <strong style="color:#fbbf24;">24h</strong> tới.<br>' +
    '✅ Bạn sẽ nhận được <strong>bản báo giá chi tiết</strong> kèm phương án thiết kế phù hợp.<br>' +
    '✅ AI Homes cam kết mang đến <strong>không gian sống hoàn mỹ</strong> với giá thành cạnh tranh nhất.' +
    '</p>' +
    '</div>' +
    '</td></tr>' +

    // === NÚT MESSENGER ===
    '<tr><td style="padding:25px 35px; text-align:center;">' +
    '<p style="color:#64748b; font-size:14px; margin:0 0 15px 0;">💬 Để được hỗ trợ <strong>nhanh nhất</strong>, chat trực tiếp với chúng tôi:</p>' +
    '<a href="' + MESSENGER_URL + '" target="_blank" style="display:inline-block; background: linear-gradient(135deg, #0084ff 0%, #0066cc 100%); color:#ffffff; text-decoration:none; padding:15px 40px; border-radius:50px; font-weight:bold; font-size:16px; letter-spacing:0.5px; box-shadow:0 4px 15px rgba(0,132,255,0.4);">' +
    '💬 CHAT QUA MESSENGER' +
    '</a>' +
    '<p style="color:#94a3b8; font-size:12px; margin:12px 0 0 0;">Hoặc gọi Hotline: <strong style="color:#d97706;">' + HOTLINE + '</strong></p>' +
    '</td></tr>' +

    // === DỊCH VỤ NỔI BẬT ===
    '<tr><td style="padding:10px 35px 25px 35px;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; border-radius:12px; border:1px solid #e2e8f0;">' +
    '<tr><td style="padding:20px 25px;">' +
    '<h3 style="color:#1e293b; margin:0 0 15px 0; font-size:15px; text-align:center;">🏆 Tại sao chọn AI Homes?</h3>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' +
    '<tr><td style="padding:4px 0; color:#475569; font-size:13px;">✔️ Hơn <strong>15 năm</strong> kinh nghiệm thiết kế & thi công</td></tr>' +
    '<tr><td style="padding:4px 0; color:#475569; font-size:13px;">✔️ Xưởng sản xuất <strong>2.000m²</strong> chuẩn công nghiệp</td></tr>' +
    '<tr><td style="padding:4px 0; color:#475569; font-size:13px;">✔️ Đội ngũ <strong>Kỹ sư, Công nhân</strong> lành nghề</td></tr>' +
    '<tr><td style="padding:4px 0; color:#475569; font-size:13px;">✔️ Cam kết <strong>tiến độ</strong> & <strong>chất lượng</strong> tuyệt đối</td></tr>' +
    '<tr><td style="padding:4px 0; color:#475569; font-size:13px;">✔️ Giá thành hợp lý, <strong>Cạnh tranh</strong></td></tr>' +
    '</table>' +
    '</td></tr></table>' +
    '</td></tr>' +

    // === FOOTER ===
    '<tr><td style="background-color:#0f172a; padding:25px 35px; text-align:center;">' +
    '<p style="color:#fbbf24; font-size:16px; font-weight:bold; margin:0 0 5px 0;">AI Homes - VIMGROUP</p>' +
    '<p style="color:#94a3b8; font-size:12px; margin:0 0 3px 0;">📍 B49 Phố Trúc, Ecopark, Phụng Công, Hưng Yên</p>' +
    '<p style="color:#94a3b8; font-size:12px; margin:0 0 3px 0;">📞 Hotline: ' + HOTLINE + '</p>' +
    '<p style="color:#94a3b8; font-size:12px; margin:0 0 10px 0;">📧 aihomes.vimgroup@gmail.com</p>' +
    '<p style="color:#64748b; font-size:11px; margin:0;">© 2026 AI Homes. All rights reserved.</p>' +
    '</td></tr>' +

    '</table>' +
    '</td></tr></table>' +
    '</body></html>';

  // Gửi email từ tài khoản aihomes.vimgroup@gmail.com
  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody,
    name: "AI Homes - Thiết kế Nội thất Cao cấp"
  });
}

// ============================================================
// HÀM TEST (chạy thử trong Apps Script editor)
// ============================================================
function testSendEmail() {
  sendWelcomeEmail("Sếp Hoạch", "test@gmail.com", "0986969339", "Chung cư");
  Logger.log("Email test đã gửi thành công!");
}
