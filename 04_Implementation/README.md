# PW Generator — Project README

ภาษา: ไทย / English

---

## สรุปโปรเจ็กต์ (Project summary)
เครื่องมือเว็บสำหรับสร้างรหัสผ่านสุ่ม (client-side) — มีตัวอย่างตัวอย่าง (preview), การสร้างจริง (generate), เปลี่ยนภาษา (ไทย/อังกฤษ), demo ระบบล็อกอินแบบ local และระบบจำกัดการใช้งานฟรี (3 ครั้ง) พร้อมหน้าจำลองชำระเงิน/อัปเกรด

A small client-side web app that generates secure passwords (uses Web Crypto API). Features: preview vs generated password, bilingual UI (TH/EN), demo auth (localStorage), and a simple usage-limit -> payment flow.

---

## เนื้อหาในโฟลเดอร์ (Files)
- Main.html — หน้า generator หลัก (มี preview, output, promo, about-short)
- About.html — หน้ารายละเอียดเกี่ยวกับโปรเจ็กต์ (ยาว)
- Help.html — คำถามที่พบบ่อย / คู่มือสั้น
- Login.html — หน้าเข้าสู่ระบบ/ลงทะเบียน (demo, localStorage)
- Payment.html — หน้า placeholder สำหรับชำระเงิน (demo)
- main.js — โลจิก generator, preview, auth-guard (demo)
- nav.js — ระบบแปลภาษาและ navbar (TH/EN)
- styles.css — สไตล์หลักและ responsive layout
- README.md — ไฟล์นี้

---

## ข้อกำหนด (Requirements)
- เบราว์เซอร์สมัยใหม่ที่รองรับ Web Crypto API (crypto.getRandomValues)
- (ไม่จำเป็น) VS Code + Live Server สำหรับพัฒนา/ดูผล
- ไฟล์ทั้งหมดเป็น static — ไม่ต้องติดตั้ง server หากเปิดไฟล์ในเบราว์เซอร์โดยตรง แต่แนะนำใช้ Live Server / HTTP server เพื่อหลีกเลี่ยงข้อจำกัด CORS/บาง API

---

## วิธีรัน (Windows / Local)
1. เปิดโฟลเดอร์โปรเจ็กต์ใน Visual Studio Code:
   - File → Open Folder → เลือกโฟลเดอร์นี้
2. ติดตั้งและเปิด `Live Server` (extension) → คลิก "Go Live" บน Main.html  
   หรือ รัน HTTP server แบบง่าย:
   - PowerShell / Terminal:
     - Python3: `python -m http.server 5500`
     - Node (http-server): `npx http-server -p 5500`
   - เปิดเบราว์เซอร์ที่: `http://localhost:5500/Main.html`

หรือดับเบิลคลิก Main.html เพื่อเปิด (แต่แนะนำ Live Server)

---

## วิธีใช้งาน (Usage)
- เลือกความยาวและประเภทอักขระ → ปุ่ม `Refresh Preview` จะสร้างตัวอย่าง (preview)
- ปุ่ม `Generate` สร้างรหัสจริง (จะพยายามต่างจาก preview อย่างน้อยหนึ่งตำแหน่ง)
- ปุ่ม `Copy` คัดลอกรหัสที่สร้างไปยัง clipboard
- สลับภาษา: เลือกภาษาใน select (nav bar) — ค่าเก็บใน localStorage
- Auth demo:
  - หากยังไม่ได้ล็อกอิน → กด Login (nav) หรือพยายาม Generate จะพาไปหน้า Login.html
  - ลงทะเบียน/ล็อกอินแบบ demo จะเก็บข้อมูลใน localStorage (`users` และ `user`)
  - แต่ละบัญชีมีสิทธิ์ฟรี 3 ครั้ง — หากเกินจะถูกพาไปหน้า Payment.html (จำลอง)
  - หน้า Payment.html มีปุ่ม `Simulate Pay` เพื่อรีเซ็ตสิทธิ์ (demo only)

ข้อควรระวัง: demo auth เก็บข้อมูลใน localStorage — ไม่ปลอดภัยสำหรับ production

---

## Localization (ภาษา)
- คำทั้งหมดที่เปลี่ยนได้มี attribute `data-i18n` (nav.js จะหา element เหล่านี้และแทนที่ข้อความ)
- เพิ่ม/แก้คำแปลได้ใน `nav.js` ใน object `i18n` (คีย์เป็นเหมือน `data-i18n`)
- ส่วนข้อความใน HTML ที่ยังไม่เปลี่ยน ให้เพิ่ม `data-i18n="keyName"` เพื่อให้ระบบแปลทำงาน

---

## Styling & Responsive
- Layout ใช้ CSS Grid / Flexbox; navbar โลโก้อยู่กลาง; mobile: ซ่อน nav-links และแสดง hamburger
- ปรับแต่ง `styles.css` เพื่อเปลี่ยนธีม/สี/spacing

---

## ข้อจำกัด / ข้อแนะนำสำหรับ production
- Demo auth (localStorage) และ Payment (placeholder) ไม่ปลอดภัย — สำหรับ production ให้ใช้:
  - Authentication: Firebase Auth, Auth0, หรือ backend ด้วย sessions/JWT
  - Usage / billing: Firestore/SQL เก็บการใช้งานต่อผู้ใช้ + Stripe/PayPal สำหรับชำระเงิน
  - หากเก็บรหัสผ่านที่ผู้ใช้สร้างบนเซิร์ฟเวอร์ ให้เข้ารหัส/ไม่เก็บใน plaintext และใช้ HTTPS เสมอ
- ตรวจสอบการใช้งานบนเบราว์เซอร์หลายรุ่น และเพิ่ม server-side rate-limiting/abuse protection เมื่อเปิดบริการสาธารณะ

---

## การแก้ไขด่วน (Common fixes)
- ภาษาไม่เปลี่ยน: ตรวจสอบ `nav.js` ถูกโหลด และ element มี `data-i18n` ถูกต้อง
- Preview == Generated: main.js มี logic บังคับให้ผลต่างกัน — หากยังเท่ากัน จะพยายาม regenerate หรือแก้ char ตัวเดียว
- Navbar / hamburger ไม่แสดง: ให้แน่ใจทุกหน้ามี `<button id="navToggle"><span class="hamburger"></span></button>` และ `nav.js` ถูกโหลด

---

## การพัฒนาเพิ่มเติมที่แนะนำ
- เพิ่ม form/flow ยืนยันอีเมลสำหรับบัญชีจริง
- เชื่อม Stripe สำหรับการชำระเงินจริง
- เพิ่มการสำรอง/ซิงค์ (end-to-end encrypted) สำหรับผู้ใช้ Pro
- เขียน unit tests สำหรับ logic generator (Node.js + Jest)

---

## License & Contact
- License: MIT (คุณสามารถเพิ่มไฟล์ LICENSE หากต้องการ)
- ติดต่อ: you@example.com

---

ขอให้ใช้งานและพัฒนาได้สะดวก — แจ้งไฟล์/ส่วนที่ต้องการให้ผมอัปเดตได้เลย.
```// filepath: c:\Users\Owner\OneDrive\เอกสาร\assignments\CS436\Finalproject_1670703204\README.md
# PW Generator — Project README

ภาษา: ไทย / English

---

## สรุปโปรเจ็กต์ (Project summary)
เครื่องมือเว็บสำหรับสร้างรหัสผ่านสุ่ม (client-side) — มีตัวอย่างตัวอย่าง (preview), การสร้างจริง (generate), เปลี่ยนภาษา (ไทย/อังกฤษ), demo ระบบล็อกอินแบบ local และระบบจำกัดการใช้งานฟรี (3 ครั้ง) พร้อมหน้าจำลองชำระเงิน/อัปเกรด

A small client-side web app that generates secure passwords (uses Web Crypto API). Features: preview vs generated password, bilingual UI (TH/EN), demo auth (localStorage), and a simple usage-limit -> payment flow.

---

## เนื้อหาในโฟลเดอร์ (Files)
- Main.html — หน้า generator หลัก (มี preview, output, promo, about-short)
- About.html — หน้ารายละเอียดเกี่ยวกับโปรเจ็กต์ (ยาว)
- Help.html — คำถามที่พบบ่อย / คู่มือสั้น
- Login.html — หน้าเข้าสู่ระบบ/ลงทะเบียน (demo, localStorage)
- Payment.html — หน้า placeholder สำหรับชำระเงิน (demo)
- main.js — โลจิก generator, preview, auth-guard (demo)
- nav.js — ระบบแปลภาษาและ navbar (TH/EN)
- styles.css — สไตล์หลักและ responsive layout
- README.md — ไฟล์นี้

---

## ข้อกำหนด (Requirements)
- เบราว์เซอร์สมัยใหม่ที่รองรับ Web Crypto API (crypto.getRandomValues)
- (ไม่จำเป็น) VS Code + Live Server สำหรับพัฒนา/ดูผล
- ไฟล์ทั้งหมดเป็น static — ไม่ต้องติดตั้ง server หากเปิดไฟล์ในเบราว์เซอร์โดยตรง แต่แนะนำใช้ Live Server / HTTP server เพื่อหลีกเลี่ยงข้อจำกัด CORS/บาง API

---

## วิธีรัน (Windows / Local)
1. เปิดโฟลเดอร์โปรเจ็กต์ใน Visual Studio Code:
   - File → Open Folder → เลือกโฟลเดอร์นี้
2. ติดตั้งและเปิด `Live Server` (extension) → คลิก "Go Live" บน Main.html  
   หรือ รัน HTTP server แบบง่าย:
   - PowerShell / Terminal:
     - Python3: `python -m http.server 5500`
     - Node (http-server): `npx http-server -p 5500`
   - เปิดเบราว์เซอร์ที่: `http://localhost:5500/Main.html`

หรือดับเบิลคลิก Main.html เพื่อเปิด (แต่แนะนำ Live Server)

---

## วิธีใช้งาน (Usage)
- เลือกความยาวและประเภทอักขระ → ปุ่ม `Refresh Preview` จะสร้างตัวอย่าง (preview)
- ปุ่ม `Generate` สร้างรหัสจริง (จะพยายามต่างจาก preview อย่างน้อยหนึ่งตำแหน่ง)
- ปุ่ม `Copy` คัดลอกรหัสที่สร้างไปยัง clipboard
- สลับภาษา: เลือกภาษาใน select (nav bar) — ค่าเก็บใน localStorage
- Auth demo:
  - หากยังไม่ได้ล็อกอิน → กด Login (nav) หรือพยายาม Generate จะพาไปหน้า Login.html
  - ลงทะเบียน/ล็อกอินแบบ demo จะเก็บข้อมูลใน localStorage (`users` และ `user`)
  - แต่ละบัญชีมีสิทธิ์ฟรี 3 ครั้ง — หากเกินจะถูกพาไปหน้า Payment.html (จำลอง)
  - หน้า Payment.html มีปุ่ม `Simulate Pay` เพื่อรีเซ็ตสิทธิ์ (demo only)

ข้อควรระวัง: demo auth เก็บข้อมูลใน localStorage — ไม่ปลอดภัยสำหรับ production

---

## Localization (ภาษา)
- คำทั้งหมดที่เปลี่ยนได้มี attribute `data-i18n` (nav.js จะหา element เหล่านี้และแทนที่ข้อความ)
- เพิ่ม/แก้คำแปลได้ใน `nav.js` ใน object `i18n` (คีย์เป็นเหมือน `data-i18n`)
- ส่วนข้อความใน HTML ที่ยังไม่เปลี่ยน ให้เพิ่ม `data-i18n="keyName"` เพื่อให้ระบบแปลทำงาน

---

## Styling & Responsive
- Layout ใช้ CSS Grid / Flexbox; navbar โลโก้อยู่กลาง; mobile: ซ่อน nav-links และแสดง hamburger
- ปรับแต่ง `styles.css` เพื่อเปลี่ยนธีม/สี/spacing

---

## ข้อจำกัด / ข้อแนะนำสำหรับ production
- Demo auth (localStorage) และ Payment (placeholder) ไม่ปลอดภัย — สำหรับ production ให้ใช้:
  - Authentication: Firebase Auth, Auth0, หรือ backend ด้วย sessions/JWT
  - Usage / billing: Firestore/SQL เก็บการใช้งานต่อผู้ใช้ + Stripe/PayPal สำหรับชำระเงิน
  - หากเก็บรหัสผ่านที่ผู้ใช้สร้างบนเซิร์ฟเวอร์ ให้เข้ารหัส/ไม่เก็บใน plaintext และใช้ HTTPS เสมอ
- ตรวจสอบการใช้งานบนเบราว์เซอร์หลายรุ่น และเพิ่ม server-side rate-limiting/abuse protection เมื่อเปิดบริการสาธารณะ

---

## การแก้ไขด่วน (Common fixes)
- ภาษาไม่เปลี่ยน: ตรวจสอบ `nav.js` ถูกโหลด และ element มี `data-i18n` ถูกต้อง
- Preview == Generated: main.js มี logic บังคับให้ผลต่างกัน — หากยังเท่ากัน จะพยายาม regenerate หรือแก้ char ตัวเดียว
- Navbar / hamburger ไม่แสดง: ให้แน่ใจทุกหน้ามี `<button id="navToggle"><span class="hamburger"></span></button>` และ `nav.js` ถูกโหลด

---

## การพัฒนาเพิ่มเติมที่แนะนำ
- เพิ่ม form/flow ยืนยันอีเมลสำหรับบัญชีจริง
- เชื่อม Stripe สำหรับการชำระเงินจริง
- เพิ่มการสำรอง/ซิงค์ (end-to-end encrypted) สำหรับผู้ใช้ Pro
- เขียน unit tests สำหรับ logic generator (Node.js + Jest)

---

## License & Contact
- License: MIT (คุณสามารถเพิ่มไฟล์ LICENSE หากต้องการ)
- ติดต่อ: you@example.com

---

ขอให้ใช้งานและพัฒนาได้สะดวก — แจ้งไฟล์/ส่วนที่ต้องการให้ผมอัปเดตได้เลย.