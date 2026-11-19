# Income & Expense Tracker

เว็บแอปพลิเคชันบันทึกรายรับรายจ่าย ใช้ HTML/CSS/JavaScript (Frontend), Node.js/Express (Backend) และ MongoDB (Database) รองรับเพิ่ม ดู แก้ไข และลบรายการ พร้อมสรุปยอดรายรับ รายจ่าย และยอดคงเหลือ

## โครงสร้าง

- `public/` หน้าเว็บและ JavaScript ฝั่งผู้ใช้
- `server/` Express API และ Mongoose model
- `images/` ภาพหลักฐานการดีบัก
- `package.json` คำสั่งรันและ Dependencies

## วิธีติดตั้ง

ต้องติดตั้ง Node.js และ MongoDB และเปิด MongoDB ให้ทำงานก่อน

```bash
npm install
```

คัดลอก `.env.example` เป็น `.env` และแก้ `MONGODB_URI` ตามฐานข้อมูลของตนเอง (ค่าเริ่มต้นใช้ MongoDB ในเครื่อง)

## วิธีรัน

```bash
npm run dev
```

เปิด `http://localhost:3000`

## REST API Endpoints

| Method | Endpoint | รายละเอียด |
| --- | --- | --- |
| GET | `/api/transactions` | ดูรายการทั้งหมด |
| POST | `/api/transactions` | เพิ่มรายการ |
| PUT | `/api/transactions/:id` | แก้ไขรายการตาม ID |
| DELETE | `/api/transactions/:id` | ลบรายการตาม ID |

ตัวอย่าง JSON สำหรับ POST/PUT:

```json
{"type":"expense","amount":80,"category":"อาหาร","note":"อาหารกลางวัน","date":"2026-11-19"}
```

## ภาพหลักฐานการดีบัก

**ต้องถ่ายภาพจริงจากการทดสอบใน VS Code ก่อนส่งงาน** แล้วบันทึกเป็นชื่อไฟล์ดังนี้

### ภาพที่ 1: Backend Debugging

![Backend debugging](images/debug-backend.png)

### ภาพที่ 2: Frontend Debugging

![Frontend debugging](images/debug-frontend.png)

## การส่งงาน

อัปโหลดทั้งโปรเจกต์ขึ้น GitHub repository เดียว โดยไม่อัปโหลด `.env` หรือ `node_modules/` และส่งลิงก์ repository ใน Microsoft Teams
