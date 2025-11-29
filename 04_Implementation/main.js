document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const lengthRange = document.getElementById('lengthRange');
  const lengthNumber = document.getElementById('lengthNumber');
  const lowercase = document.getElementById('lowercase');
  const uppercase = document.getElementById('uppercase');
  const numbers = document.getElementById('numbers');
  const symbols = document.getElementById('symbols');
  const generateBtn = document.getElementById('generateBtn');
  const output = document.getElementById('output');
  const preview = document.getElementById('preview');
  const regenPreview = document.getElementById('regenPreview');
  const usePreview = document.getElementById('usePreview');
  const copyBtn = document.getElementById('copyBtn');
  const toggleShowBtn = document.getElementById('toggleShowBtn');
  const meterBar = document.getElementById('meterBar');
  const strengthText = document.getElementById('strengthText');
  const scoreText = document.getElementById('scoreText');

  // Character sets
  const sets = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    num: '0123456789',
    sym: '!@#$%^&*()_+~-=[]{}|;:,.<>?'
  };

  // Secure random integer using crypto
  function randInt(max){
    const uint = new Uint32Array(1);
    window.crypto.getRandomValues(uint);
    return uint[0] % max;
  }

  // Shuffle array
  function shuffleArray(arr){
    for(let i = arr.length -1; i>0; i--){
      const j = randInt(i+1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Build chosenSets & pool utility
  function getChosenSets(){
    const chosen = [];
    if(lowercase && lowercase.checked) chosen.push(sets.lower);
    if(uppercase && uppercase.checked) chosen.push(sets.upper);
    if(numbers && numbers.checked) chosen.push(sets.num);
    if(symbols && symbols.checked) chosen.push(sets.sym);
    return chosen;
  }

  // Generate password with guarantee of including each selected set at least once
  function generatePassword(len){
    const chosenSets = getChosenSets();

    if(chosenSets.length === 0) {
      return { error: 'กรุณาเลือกประเภทอักขระอย่างน้อยหนึ่งอย่าง' };
    }
    if(len < chosenSets.length){
      len = chosenSets.length;
    }

    const resultChars = [];
    chosenSets.forEach(s => {
      resultChars.push(s[randInt(s.length)]);
    });

    const pool = chosenSets.join('');
    for(let i = resultChars.length; i < len; i++){
      resultChars.push(pool[randInt(pool.length)]);
    }

    shuffleArray(resultChars);
    return { password: resultChars.join(''), pool };
  }

  // Ensure two strings differ in at least one position by replacing one char using pool
  function forceDifferent(pass, other, pool){
    if(!pool || pass.length !== other.length) return pass;
    const len = pass.length;
    for(let attempts=0; attempts<6; attempts++){
      const idx = randInt(len);
      const choices = pool;
      let ch = choices[randInt(choices.length)];
      if(ch !== other[idx]){
        const arr = pass.split('');
        arr[idx] = ch;
        return arr.join('');
      }
    }
    // fallback: flip last char to any different ASCII letter
    const arr = pass.split('');
    arr[len-1] = arr[len-1] === 'x' ? 'y' : 'x';
    return arr.join('');
  }

  // Update strength meter (same logic as before)
  function updateStrength(pw){
    if(!pw) { meterBar.style.width='0%'; strengthText.textContent='—'; scoreText.textContent='0%'; return; }
    let score = 0;
    const len = pw.length;
    if(len >= 8) score += 20;
    if(len >= 12) score += 15;
    if(len >= 16) score += 15;
    const variety = [/[a-z]/.test(pw), /[A-Z]/.test(pw), /\d/.test(pw), /[^A-Za-z0-9]/.test(pw)].filter(Boolean).length;
    score += variety * 15;
    if(score > 100) score = 100;
    scoreText.textContent = score + '%';
    meterBar.style.width = score + '%';
    if(score < 40){ strengthText.textContent = 'Weak'; meterBar.style.filter='hue-rotate(0deg)'; }
    else if(score < 70){ strengthText.textContent = 'Medium'; meterBar.style.filter='hue-rotate(70deg)'; }
    else if(score < 90){ strengthText.textContent = 'Strong'; meterBar.style.filter='hue-rotate(120deg)'; }
    else { strengthText.textContent = 'Very Strong'; meterBar.style.filter='hue-rotate(150deg)'; }
  }

  // UI helpers
  function showToast(msg){
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(()=> t.remove(), 3000);
  }

  // New behavior: preview is sample; generated password must differ from preview
  function generatePreview(){
    const len = Math.max(4, Math.min(128, Number(lengthNumber.value) || 16));
    const r = generatePassword(len);
    if(r.error){ preview.value = ''; return; }
    // preview: show shape but we don't prevent it being reused; store pool for generation use
    preview.value = r.password;
    preview.dataset.pool = r.pool || '';
    return r.password;
  }

  function doGenerate(toOutput=true){
    const len = Math.max(4, Math.min(128, Number(lengthNumber.value) || 16));
    let r = generatePassword(len);
    if(r.error){ showToast(r.error); return; }
    let pass = r.password;
    // ensure password != current preview
    if(preview.value && pass === preview.value){
      // try regenerating a few times
      let tries = 0;
      while(pass === preview.value && tries < 8){
        r = generatePassword(len);
        pass = r.password;
        tries++;
      }
      if(pass === preview.value){
        // force at least one different char using preview pool if available, else r.pool
        const pool = preview.dataset.pool || r.pool || getChosenSets().join('');
        pass = forceDifferent(pass, preview.value, pool);
      }
    }

    if(toOutput){
      output.value = pass;
      updateStrength(pass);
    }
    // keep preview as a sample (do not overwrite here)
    return pass;
  }

  // Sync range and number and control changes
  function syncLengthFromRange(){ lengthNumber.value = lengthRange.value; generatePreview(); }
  function syncLengthFromNumber(){ let v = Math.max(4, Math.min(128, Number(lengthNumber.value) || 4)); lengthNumber.value = v; lengthRange.value = v; generatePreview(); }
  lengthRange.addEventListener('input', syncLengthFromRange);
  lengthNumber.addEventListener('change', syncLengthFromNumber);
  [lowercase, uppercase, numbers, symbols].forEach(el => el && el.addEventListener('change', generatePreview));

  // Button bindings
  generateBtn.addEventListener('click', ()=> doGenerate(true));
  regenPreview.addEventListener('click', ()=> generatePreview());
  usePreview.addEventListener('click', ()=> { if(preview.value){ output.value = preview.value; updateStrength(preview.value); showToast('Preview used'); } });

  // Copy to clipboard
  copyBtn.addEventListener('click', async ()=>{
    const text = output.value;
    if(!text){ showToast('ไม่มีรหัสผ่านให้คัดลอก'); return; }
    try{
      await navigator.clipboard.writeText(text);
      showToast('คัดลอกไปยังคลิปบอร์ดแล้ว');
    } catch(e){
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta);
      ta.select(); document.execCommand('copy'); ta.remove();
      showToast('คัดลอกไปยังคลิปบอร์ดแล้ว');
    }
  });

  // Show/hide
  let shown = false;
  toggleShowBtn.addEventListener('click', ()=>{
    shown = !shown;
    toggleShowBtn.textContent = shown ? 'Hide' : 'Show';
    output.style.letterSpacing = shown ? 'normal' : '0.28em';
    output.style.webkitTextSecurity = shown ? 'none' : 'disc';
  });

  // --- Begin demo auth / usage limit (inserted) ---
  function getCurrentUser(){ return localStorage.getItem('user'); }
  function readUsers(){ try{ return JSON.parse(localStorage.getItem('users')||'{}'); }catch(e){ return {}; } }
  function writeUsers(u){ localStorage.setItem('users', JSON.stringify(u)); }

  function ensureLoggedInAndShowBadge(){
    const user = getCurrentUser();
    const nr = document.querySelector('.nav-right');
    // remove old badge if any
    const old = document.getElementById('userBadge');
    if(old) old.remove();
    if(!nr) return !!user;
    const badge = document.createElement('div');
    badge.id = 'userBadge';
    badge.style.cssText = 'margin-right:8px;color:var(--muted);font-size:13px;display:flex;align-items:center;gap:8px';
    if(user){
      const users = readUsers();
      const u = users[user] || { uses:0 };
      badge.textContent = `${user} · ฟรี:${Math.max(0,3 - (u.uses||0))}`;
    } else {
      badge.textContent = 'Guest';
    }
    nr.insertBefore(badge, nr.firstChild);
    return !!user;
  }

  // initial badge
  ensureLoggedInAndShowBadge();

  // guard generate action: replace existing generate button handler with guarded one
  if(typeof generateBtn !== 'undefined' && generateBtn && generateBtn.parentNode){
    // replace element to remove previous handlers reliably
    const newGen = generateBtn.cloneNode(true);
    generateBtn.parentNode.replaceChild(newGen, generateBtn);

    newGen.addEventListener('click', ()=>{
      const user = getCurrentUser();
      if(!user){
        // redirect to demo login
        alert('กรุณาเข้าสู่ระบบเพื่อใช้งาน'); location.href = 'Login.html'; return;
      }
      const users = readUsers();
      users[user] = users[user] || { pass:'', uses:0 };
      if((users[user].uses||0) >= 3){
        alert('สิทธิ์ฟรีครบแล้ว โปรดชำระเงินเพื่อใช้งานต่อ'); location.href = 'Payment.html'; return;
      }
      // increment and persist
      users[user].uses = (users[user].uses||0) + 1;
      writeUsers(users);
      // update badge
      ensureLoggedInAndShowBadge();
      // generate actual password (existing function)
      if(typeof doGenerate === 'function') doGenerate(true);
    });

    // expose newGen for other code (optional)
    // generateBtn = newGen; // not reassigning outer const
  }

  // add auth button (shows "Login" when not logged in, "Logout" after login)
  const nr = document.querySelector('.nav-right');
  if (nr && !document.getElementById('authBtn')) {
    const authBtn = document.createElement('button');
    authBtn.id = 'authBtn';
    authBtn.className = 'btn secondary';
    authBtn.style.marginLeft = '6px';

    function updateAuthBtn() {
      const user = getCurrentUser();
      if (user) {
        authBtn.textContent = 'Logout';
        authBtn.onclick = () => {
          localStorage.removeItem('user');
          ensureLoggedInAndShowBadge();
          updateAuthBtn();
          // optional: stay on page or redirect to login
          location.href = 'Login.html';
        };
      } else {
        authBtn.textContent = 'Login';
        authBtn.onclick = () => {
          location.href = 'Login.html';
        };
      }
    }

    updateAuthBtn();
    nr.appendChild(authBtn);
  }
  // --- End demo auth / usage limit ---

  // init
  // ensure controls exist before calling
  try{
    if(!lengthRange || !lengthNumber){ /* controls missing in some pages */ }
    else {
      syncLengthFromRange();
      generatePreview();
      doGenerate(true);
    }
  }catch(e){}
});