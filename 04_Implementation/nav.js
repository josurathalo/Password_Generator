document.addEventListener('DOMContentLoaded', () => {
  const navLang = document.getElementById('navLang');
  const langSelect = document.getElementById('langSelect');
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  const i18n = {
    en: {
      navHome: 'Home', navAbout: 'About', navHelp: 'Help',
      title: 'Random Password Generator', lead: 'Generate random passwords — choose length and character types',
      langLabel: 'Language', lengthLabel: 'Password length (4–128)', charsLabel: 'Include characters',
      lowercase: 'Lowercase (a–z)', uppercase: 'Uppercase (A–Z)', numbers: 'Numbers (0–9)', symbols: 'Symbols (!@#$...)',
      generate: 'Generate', copy: 'Copy', show: 'Show', hide: 'Hide',
      outputAria: 'Generated password', rulesTitle: 'Usage notes', rule1: 'Choosing multiple character types increases strength',
      rule2: 'Longer passwords are stronger', rule3: 'Copy button writes to clipboard', rule4: 'Uses crypto.getRandomValues for secure randomness',
      previewTitle: 'Preview password for current settings', regenPreview: 'Refresh preview', usePreview: 'Use this preview',
      strength: 'Strength', aboutTitle: 'About', aboutIntro: 'This tool generates secure random passwords.',
      aboutWhyTitle: 'Why this tool?', aboutWhy: 'Random, sufficiently long passwords with mixed character sets reduce guessing and brute-force risk.',
      aboutFeaturesTitle: 'Features', feat1: 'Set length (4–128)', feat2: 'Choose upper/lower, numbers, symbols',
      feat3: 'Copy to clipboard', feat4: 'Strength meter', contactTitle: 'Contact',
      contactText: 'Feedback / bug reports: you@example.com', backHome: 'Back to Generator',
      helpTitle: 'Help', helpIntro: 'FAQ and usage tips', faqTitle: 'FAQ',
      q1: 'Q: How long should a password be?', a1: 'A: At least 12 characters; 16+ for high-value accounts.',
      q2: 'Q: Will each selected type appear at least once?', a2: 'A: Yes — the generator ensures one of each selected type is included when possible.',
      q3: 'Q: Is the randomness secure?', a3: 'A: It uses crypto.getRandomValues.',
      backGen: 'Back to Generator',
      footerCopyright: '© 2025 PW Generator', footerAboutLink: 'About', footerHelpLink: 'Help',
      footerGenLink: 'Generator', footerVersion: 'v1.0',
      promoTitle: 'Promotions & Pricing', promoLead: 'Try free for 3 uses — upgrade for unlimited access and pro features',
      planFree: 'Free', planPro: 'Pro', planEnterprise: 'Enterprise',
      priceFree: '฿0 / 3 free uses', pricePro: '฿99 / month', priceContact: 'Contact for pricing',
      planFeat1: 'Generate passwords (4–128)', planFeat2: 'Strength meter', planFeat3: 'Copy to clipboard', planFeat4: 'Unlimited (Pro)',
      login: 'Login', logout: 'Logout', guest: 'Guest', freeRemaining: 'Free left',
      aboutBriefTitle: 'About (brief)',
      aboutBriefLead: 'This tool began from the idea that password creation should be secure and simple for everyone.',
      aboutBriefText: 'We build an easy-to-use generator that leverages Web Crypto APIs for secure randomness, and a clear UI to help users protect their accounts.',
      aboutReadMore: 'Read more about us',
      statYears: '2022+',
      statSince: 'Founded',
      statUsers: 'sample users',
      statSecure: 'Secure',
      statEngine: 'Random engine',
      statCrypto: 'crypto.getRandomValues',
      statFree: '3',
      statFreeNote: 'free uses',
      statPro: 'Pro plan',

      aboutHistoryTitle: 'History',
      aboutHistory: 'The project started as a lightweight web tool to let anyone create strong passwords quickly without installing software. We favour browser-native cryptography for better randomness over simple PRNGs.',
      aboutMissionTitle: 'Mission',
      aboutMission: 'Deliver secure, accessible and transparent tools that help people protect their accounts and personal data.',
      aboutHowTitle: 'How it works',
      aboutHow1: 'Uses crypto.getRandomValues for secure random bytes',
      aboutHow2: 'Ensures one character from each selected category when possible',
      aboutHow3: 'Does not store generated passwords on servers unless explicitly enabled',
      aboutSecurityTitle: 'Security',
      aboutSecurity: 'We recommend running over HTTPS, using a trusted password manager and never sharing generated passwords. Server-side storage should be encrypted if enabled.',
      aboutRoadmapTitle: 'Roadmap',
      roadmap1: 'Add encrypted account sync (optional)',
      roadmap2: 'Integrate secure payment (Stripe) for Pro',
      roadmap3: 'Offer API and SSO for enterprises',
      aboutTeamTitle: 'Team',
      aboutTeam: 'Small team of web developers and UX designers focused on security-first experiences.',
      aboutContactTitle: 'Contact',
      aboutContact: 'For questions or partnerships: you@example.com',

      promoTitle: 'Promotions & Pricing',
      promoLead: 'Try free for 3 uses — upgrade for unlimited access and pro features',
      planFree: 'Free',
      planPro: 'Pro',
      planEnterprise: 'Enterprise',
      priceFree: '฿0 / 3 free uses',
      pricePro: '฿99 / month',
      priceContact: 'Contact for pricing',
      planFeat1: 'Generate passwords (4–128)',
      planFeat2: 'Strength meter',
      planFeat3: 'Copy to clipboard',
      planFeat4: 'Unlimited (Pro)',
      ctaUseAccount: 'Use account',
      ctaUpgrade: 'Upgrade',
      ctaContact: 'Contact us',
      promoNote: 'Note: This is a demo promotion section. Integrate a secure payment gateway (e.g. Stripe) for production.',
      aboutIntro: 'This tool generates secure random passwords. Choose length and character types.',
      backHome: 'Back to Generator',
      aboutTitle: 'About'
    },
    th: {
      navHome: 'หน้าแรก', navAbout: 'เกี่ยวกับ', navHelp: 'ช่วยเหลือ',
      title: 'เครื่องสร้างรหัสผ่านสุ่ม', lead: 'สร้างรหัสผ่านสุ่ม — กำหนดความยาวและประเภทอักขระได้ตามต้องการ',
      langLabel: 'ภาษา', lengthLabel: 'ความยาวรหัสผ่าน (4–128)', charsLabel: 'รวมอักขระ',
      lowercase: 'ตัวอักษรพิมพ์เล็ก (a–z)', uppercase: 'ตัวอักษรพิมพ์ใหญ่ (A–Z)', numbers: 'ตัวเลข (0–9)', symbols: 'สัญลักษณ์ (!@#$...)',
      generate: 'สร้าง', copy: 'คัดลอก', show: 'แสดง', hide: 'ซ่อน',
      outputAria: 'รหัสผ่านที่สร้างแล้ว', rulesTitle: 'ตัวอย่างกฎการใช้งาน', rule1: 'การเลือกตัวอักษรหลายประเภทจะเพิ่มความแข็งแรงของรหัสผ่าน',
      rule2: 'ความยาวมากขึ้น = ปลอดภัยขึ้น', rule3: 'ปุ่ม Copy ใช้คัดลอกรหัสผ่านไปยัง clipboard', rule4: 'ระบบใช้ crypto.getRandomValues เพื่อสุ่มที่ปลอดภัย',
      previewTitle: 'ตัวอย่างรหัสผ่านจากการตั้งค่าปัจจุบัน', regenPreview: 'รีเฟรชตัวอย่าง', usePreview: 'ใช้ตัวอย่างนี้',
      strength: 'ความแข็งแรง', aboutTitle: 'เกี่ยวกับ', aboutIntro: 'เครื่องมือนี้ช่วยสร้างรหัสผ่านสุ่มที่ปลอดภัย',
      aboutWhyTitle: 'ทำไมต้องใช้เครื่องมือนี้?', aboutWhy: 'รหัสผ่านที่สุ่มและยาวพอรวมถึงการผสมของตัวอักษรช่วยลดความเสี่ยงจากการคาดเดาและ brute-force.',
      aboutFeaturesTitle: 'คุณสมบัติ', feat1: 'กำหนดความยาว (4–128)', feat2: 'เลือกตัวอักษรพิมพ์ใหญ่/เล็ก ตัวเลข และสัญลักษณ์',
      feat3: 'คัดลอกอัตโนมัติไปยังคลิปบอร์ด', feat4: 'แสดง meter วัดความแข็งแรงของรหัสผ่าน', contactTitle: 'ติดต่อ',
      contactText: 'ข้อเสนอแนะ / รายงานบั๊ก: you@example.com', backHome: 'กลับไปที่เครื่องมือ',
      helpTitle: 'ช่วยเหลือ', helpIntro: 'คำถามที่พบบ่อย และคำแนะนำการใช้งานเครื่องมือ', faqTitle: 'คำถามที่พบบ่อย',
      q1: 'ถาม: ควรใช้ความยาวเท่าไร?', a1: 'ตอบ: อย่างน้อย 12 ตัวอักษร หากเป็นรหัสผ่านสำคัญแนะนำ 16+.',
      q2: 'ถาม: จะมั่นใจว่ามีตัวอักษรแต่ละประเภทอย่างน้อยหนึ่งตัว?', a2: 'ตอบ: ถ้าเปิดเลือกหลายประเภท ระบบจะใส่แต่ละประเภทอย่างน้อยหนึ่งตัวให้โดยอัตโนมัติ.',
      q3: 'ถาม: โค้ดสุ่มปลอดภัยหรือไม่?', a3: 'ตอบ: ใช้ crypto.getRandomValues ซึ่งเป็น API ของเบราว์เซอร์สำหรับสุ่มที่ปลอดภัยพอสำหรับการใช้งานทั่วไป.',
      backGen: 'กลับไปที่เครื่องมือ',
      footerCopyright: '© 2025 PW Generator', footerAboutLink: 'เกี่ยวกับ', footerHelpLink: 'ช่วยเหลือ',
      footerGenLink: 'เครื่องมือ', footerVersion: 'เวอร์ชัน 1.0',
      promoTitle: 'โปรโมชั่นและราคา', promoLead: 'ทดลองใช้งานฟรีสำหรับ 3 ครั้งแรก — อัปเกรดเพื่อใช้งานไม่จำกัดและฟีเจอร์เพิ่มเติม',
      planFree: 'ฟรี', planPro: 'Pro', planEnterprise: 'องค์กร',
      priceFree: '฿0 / ฟรี 3 ครั้ง', pricePro: '฿99 / เดือน', priceContact: 'ติดต่อเพื่อขอราคา',
      planFeat1: 'สร้างรหัสผ่าน (4–128)', planFeat2: 'Meter ความแข็งแรง', planFeat3: 'คัดลอกไปยังคลิปบอร์ด', planFeat4: 'ไม่จำกัด (Pro)',
      login: 'เข้าสู่ระบบ', logout: 'ออกจากระบบ', guest: 'ผู้เยี่ยมชม', freeRemaining: 'เหลือใช้',
      ctaUseAccount: 'ใช้บัญชี', ctaUpgrade: 'อัปเกรด', ctaContact: 'ติดต่อเรา',
      promoNote: 'หมายเหตุ: หน้านี้เป็นตัวอย่างการแสดงโปรโมชั่น หากต้องการเชื่อมต่อระบบชำระเงินจริง แนะนำใช้ Stripe หรือระบบ Payment Gateway ที่ปลอดภัย',
      aboutBriefTitle: 'เกี่ยวกับเรา (ย่อ)',
      aboutBriefLead: 'เครื่องมือนี้เริ่มจากแนวคิดว่าการสร้างรหัสผ่านควรปลอดภัยและใช้งานง่ายสำหรับทุกคน',
      aboutBriefText: 'เรามุ่งมั่นพัฒนาเครื่องมือที่ใช้สุ่มแบบปลอดภัย (crypto.getRandomValues) พร้อม UI เข้าใจง่าย เพื่อช่วยให้ผู้ใช้ปกป้องข้อมูลส่วนตัว',
      aboutReadMore: 'อ่านเพิ่มเติมเกี่ยวกับเรา',
      statYears: '2022+',
      statSince: 'ก่อตั้ง',
      statUsers: 'ผู้ใช้ตัวอย่าง',
      statSecure: 'ปลอดภัย',
      statEngine: 'Random engine',
      statCrypto: 'crypto.getRandomValues',
      statFree: '3',
      statFreeNote: 'ครั้งทดลองใช้ฟรี',
      statPro: 'แผน Pro',

      aboutHistoryTitle: 'ประวัติความเป็นมา',
      aboutHistory: 'ทีมเริ่มต้นโครงการจากความต้องการสร้างเครื่องมือออนไลน์ที่ช่วยให้ผู้ใช้ทั่วไปสามารถสร้างรหัสผ่านที่ปลอดภัยได้อย่างรวดเร็ว โดยไม่ต้องติดตั้งซอฟต์แวร์เพิ่มเติม เราเน้นใช้งานบนเบราว์เซอร์ด้วย Web Crypto API เพื่อให้การสุ่มมีความปลอดภัยมากกว่าการใช้ Math.random',
      aboutMissionTitle: 'พันธกิจ (Mission)',
      aboutMission: 'มุ่งมั่นส่งมอบเครื่องมือที่ปลอดภัย เข้าถึงได้ง่าย และโปร่งใส เพื่อช่วยให้ผู้ใช้ปกป้องบัญชีและข้อมูลส่วนตัวอย่างมีประสิทธิภาพ',
      aboutHowTitle: 'วิธีการทำงาน',
      aboutHow1: 'ใช้ crypto.getRandomValues เพื่อสุ่มตัวอักษรอย่างปลอดภัย',
      aboutHow2: 'รับประกันว่าถ้าเลือกหลายประเภทจะมีตัวอักขระจากแต่ละประเภทอย่างน้อยหนึ่งตัว',
      aboutHow3: 'ไม่เก็บรหัสผ่านที่ผู้ใช้สร้างในเซิร์ฟเวอร์ (ถ้าไม่ได้ตั้งค่าเพิ่มเติม)',
      aboutSecurityTitle: 'ความปลอดภัย',
      aboutSecurity: 'เราเน้นการใช้ API ของเบราว์เซอร์และหลักปฏิบัติที่ดี: ไม่ส่งรหัสผ่านที่สร้างไปยังเซิร์ฟเวอร์โดยไม่จำเป็น ผู้ใช้ควรตรวจสอบว่ากำลังใช้งานผ่าน HTTPS และเก็บรหัสผ่านในตัวจัดการรหัสผ่านที่เชื่อถือได้',
      aboutRoadmapTitle: 'แผนพัฒนา (Roadmap)',
      roadmap1: 'เพิ่มระบบบัญชีผู้ใช้และซิงค์แบบเข้ารหัส (เลือกเปิดใช้)',
      roadmap2: 'เชื่อมต่อการชำระเงินแบบปลอดภัย (Stripe) สำหรับแผน Pro',
      roadmap3: 'เสนอ API สำหรับองค์กรและ SSO',
      aboutTeamTitle: 'ทีมงาน',
      aboutTeam: 'ทีมประกอบด้วยนักพัฒนาเว็บความปลอดภัยและ UI/UX ที่ทำงานร่วมกันเพื่อลดความซับซ้อนของ UX และเพิ่มความปลอดภัยพื้นฐาน',
      aboutContactTitle: 'ติดต่อ',
      aboutContact: 'สำหรับคำถามหรือการร่วมมือ: you@example.com'
    }
  };

  // determine language
  const stored = localStorage.getItem('lang');
  const browserLang = navigator.language && navigator.language.startsWith('th') ? 'th' : 'en';
  let lang = stored || browserLang;
  if (!['en','th'].includes(lang)) lang = 'en';

  // ensure language selects have options (populate if empty)
  function ensureLangOptions(el){
    if(!el) return;
    if(el.options && el.options.length > 0) return;
    el.innerHTML = '';
    const optTh = document.createElement('option'); optTh.value='th'; optTh.text = 'ไทย';
    const optEn = document.createElement('option'); optEn.value='en'; optEn.text = 'English';
    el.appendChild(optTh); el.appendChild(optEn);
  }
  ensureLangOptions(navLang);
  ensureLangOptions(langSelect);

  // set selects to current lang
  if (navLang) navLang.value = lang;
  if (langSelect) langSelect.value = lang;

  function applyTranslations() {
    const map = i18n[lang] || i18n.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && map[key] !== undefined) {
        // preserve input/button values for inputs that should keep user content
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.hasAttribute('data-i18n-attr-value')) el.value = map[key];
        } else {
          el.innerText = map[key];
        }
      }
    });
    document.querySelectorAll('[data-i18n-attr-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-attr-aria');
      if (key && map[key] !== undefined) el.setAttribute('aria-label', map[key]);
    });
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl && map['title']) { titleEl.innerText = map['title']; document.title = map['title']; }

    // update any show/hide buttons that use data-i18n attr
    document.querySelectorAll('[data-i18n="show"],[data-i18n="hide"]').forEach(btn => {
      const key = btn.getAttribute('data-i18n');
      if (map[key]) btn.innerText = map[key];
    });

    // mark active nav link by filename
    const path = location.pathname.split('/').pop() || 'Main.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href') || '';
      const file = href.split('/').pop();
      a.classList.toggle('active', file === path || (file === 'Main.html' && (path === '' || path === 'index.html')));
    });
  }

  function setLang(v){
    lang = v;
    localStorage.setItem('lang', v);
    if (navLang) navLang.value = v;
    if (langSelect) langSelect.value = v;
    applyTranslations();
  }

  if (navLang) navLang.addEventListener('change', e => setLang(e.target.value));
  if (langSelect) langSelect.addEventListener('change', e => setLang(e.target.value));

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // initial render
  applyTranslations();
});