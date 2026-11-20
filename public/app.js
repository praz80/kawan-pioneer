// Kawan Pioneer — app logic.
// Runs in two modes:
//  - Pi mode: inside Pi Browser, with the real Pi SDK (auth + payments).
//  - Demo mode: any other browser (e.g. a desktop preview). Sign-in and
//    payments are simulated so the learning content can be tried anywhere;
//    a banner in the Profile explains the difference.

const SANDBOX = true; // Pi Sandbox while developing; set false for production.
const STORE_KEY = 'kp-progress-v1';

let piUser = null;
let accessToken = null;
const inPiBrowser = typeof window.Pi !== 'undefined';

if (inPiBrowser) {
  window.Pi.init({ version: '2.0', sandbox: SANDBOX });
}

// ---------- progress store ----------
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch { return {}; }
}
function saveProgress(p) { localStorage.setItem(STORE_KEY, JSON.stringify(p)); }
const progress = Object.assign(
  { xp: 0, modules: {}, streak: 0, lastDailyQuiz: null, premium: false },
  loadProgress()
);
function persist() { saveProgress(progress); }

function levelFor(xp) {
  if (xp >= 600) return 'Legenda';
  if (xp >= 300) return 'Ahli';
  if (xp >= 100) return 'Penjaga';
  return 'Pioneer';
}
function addXp(n) { progress.xp += n; persist(); renderHome(); }

// ---------- auth ----------
async function onIncompletePayment(payment) {
  // Fires during authenticate(), before an access token exists, so this call
  // is authorized server-side by looking the payment up with the Server API Key.
  try {
    await fetch('/api/payments/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction?.txid }),
    });
  } catch (e) { console.error('Incomplete payment completion failed', e); }
}

async function signIn() {
  const btn = document.getElementById('authBtn');
  if (!inPiBrowser) {
    piUser = { username: 'pioneer_demo' };
    btn.textContent = 'Halo, @pioneer_demo';
    btn.disabled = true;
    renderProfile();
    return;
  }
  try {
    btn.disabled = true;
    btn.textContent = 'Menghubungkan…';
    const auth = await window.Pi.authenticate(['username', 'payments'], onIncompletePayment);
    accessToken = auth.accessToken;
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error('Server could not verify this user');
    piUser = await res.json();
    btn.textContent = `Halo, @${piUser.username}`;
    renderProfile();
    renderHome();
  } catch (err) {
    console.error('Auth failed', err);
    btn.disabled = false;
    btn.textContent = 'Masuk dengan Pi';
    alert('Gagal masuk dengan Pi. Coba lagi di dalam Pi Browser.');
  }
}

// ---------- premium payment ----------
function buyPremium() {
  if (progress.premium) return;
  if (!inPiBrowser) {
    alert('Mode demo: pembayaran Pi hanya berjalan di dalam Pi Browser. Di sana, tombol ini membuka Pi Wallet untuk membayar 1 Pi (testnet/sandbox) dan Paket Penjaga langsung aktif.');
    return;
  }
  if (!piUser) { alert('Masuk dengan Pi dulu, ya.'); return; }
  window.Pi.createPayment(
    { amount: 1, memo: 'Paket Penjaga — Kawan Pioneer', metadata: { feature: 'paket-penjaga' } },
    {
      onReadyForServerApproval: async (paymentId) => {
        await fetch('/api/payments/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
          body: JSON.stringify({ paymentId }),
        });
      },
      onReadyForServerCompletion: async (paymentId, txid) => {
        const res = await fetch('/api/payments/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
          body: JSON.stringify({ paymentId, txid }),
        });
        if (res.ok) {
          progress.premium = true;
          persist();
          renderAll();
          alert('Pembayaran selesai. Paket Penjaga aktif — semua modul terbuka!');
        }
      },
      onCancel: (paymentId) => console.log('Payment cancelled:', paymentId),
      onError: (error) => { console.error('Payment error', error); alert('Pembayaran gagal. Coba lagi nanti.'); },
    }
  );
}

// ---------- navigation ----------
function switchView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById(`view-${name}`).classList.remove('hidden');
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === name));
  if (name === 'learn') closeReader();
  window.scrollTo({ top: 0 });
}

// ---------- home ----------
function todayKey(offsetDays = 0) {
  const d = new Date(); d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}
function renderHome() {
  const name = piUser ? `@${piUser.username}` : 'Pioneer';
  document.getElementById('greeting').textContent = piUser ? `Halo, ${name}!` : 'Halo, Pioneer!';
  document.getElementById('statXp').textContent = progress.xp;
  document.getElementById('statLevel').textContent = levelFor(progress.xp);
  document.getElementById('statStreak').textContent = progress.streak;
  const done = MODULES.filter(m => progress.modules[m.id]).length;
  document.getElementById('progressFill').style.width = `${(done / MODULES.length) * 100}%`;
  document.getElementById('progressText').textContent = `${done} dari ${MODULES.length} modul selesai`;
  const dayIndex = Math.floor(Date.now() / 86400000) % DAILY_TIPS.length;
  document.getElementById('dailyTip').textContent = DAILY_TIPS[dayIndex];
  const next = MODULES.find(m => !progress.modules[m.id] && (!m.premium || progress.premium))
    || MODULES.find(m => !progress.modules[m.id]);
  const box = document.getElementById('nextLesson');
  if (next) {
    box.innerHTML = '';
    box.appendChild(lessonItem(next));
  } else {
    box.innerHTML = '<p>🎉 Semua modul selesai. Kamu resmi jadi Penjaga bagi Pioneer lain!</p>';
  }
  const pc = document.getElementById('premiumCard');
  if (progress.premium) {
    pc.querySelector('p').innerHTML = 'Paket Penjaga <strong>aktif</strong>. Semua modul dan katalog lengkap terbuka untukmu.';
    document.getElementById('payBtn').textContent = 'Paket Penjaga Aktif ✓';
    document.getElementById('payBtn').disabled = true;
  }
  renderQuizStatus();
}

// ---------- lessons ----------
function lessonItem(m) {
  const el = document.createElement('button');
  el.className = 'lesson-item' + (m.premium && !progress.premium ? ' lesson-locked' : '');
  const done = !!progress.modules[m.id];
  el.innerHTML = `
    <span class="lesson-badge">${m.icon}</span>
    <span>
      <h3>${m.title}</h3>
      <p>${m.desc}</p>
      ${done ? '<span class="lesson-done">✓ Selesai</span>' : (m.premium && !progress.premium ? '<span class="lesson-done" style="color:var(--warn)">⭐ Paket Penjaga</span>' : '')}
    </span>`;
  el.onclick = () => openLesson(m.id);
  return el;
}
function renderLessons() {
  const list = document.getElementById('lessonList');
  list.innerHTML = '';
  MODULES.forEach(m => list.appendChild(lessonItem(m)));
}
function closeReader() {
  document.getElementById('lessonReader').classList.add('hidden');
  document.getElementById('lessonList').classList.remove('hidden');
}
function openLesson(id) {
  const m = MODULES.find(x => x.id === id);
  if (m.premium && !progress.premium) {
    alert('Modul ini bagian dari Paket Penjaga. Aktifkan dari Beranda untuk membukanya.');
    return;
  }
  const reader = document.getElementById('lessonReader');
  document.getElementById('lessonList').classList.add('hidden');
  reader.classList.remove('hidden');
  let html = `<button class="btn btn-small" style="background:var(--pi-purple);margin-bottom:12px" id="backBtn">← Semua Modul</button>
    <div class="card reader"><h3>${m.icon} ${m.title}</h3>`;
  m.sections.forEach(s => {
    html += `<div class="section-block"><h4>${s.h}</h4>`;
    if (s.p) html += `<p>${s.p}</p>`;
    if (s.list) html += `<ul>${s.list.map(li => `<li>${li}</li>`).join('')}</ul>`;
    html += '</div>';
  });
  html += `<div class="card-title" style="margin-top:18px">Kuis Modul (lulus: 2 dari 3 benar, +50 XP)</div><div id="moduleQuiz"></div>`;
  html += '</div>';
  reader.innerHTML = html;
  document.getElementById('backBtn').onclick = () => { closeReader(); renderLessons(); };
  renderQuiz(document.getElementById('moduleQuiz'), m.quiz, (score) => {
    if (score >= 2 && !progress.modules[m.id]) {
      progress.modules[m.id] = true;
      persist();
      addXp(50);
      alert(`Modul selesai! Skor ${score}/3, +50 XP.`);
    } else if (score >= 2) {
      alert(`Skor ${score}/3 — modul ini sudah tercatat selesai sebelumnya.`);
    } else {
      alert(`Skor ${score}/3 — baca lagi modulnya dan coba lagi, ya.`);
    }
    closeReader(); renderLessons(); renderHome();
  });
  window.scrollTo({ top: 0 });
}

// ---------- quiz engine (shared) ----------
function renderQuiz(container, questions, onDone) {
  let idx = 0, score = 0;
  function draw() {
    if (idx >= questions.length) { onDone(score); return; }
    const item = questions[idx];
    container.innerHTML = `<div class="quiz-q"><p>${idx + 1}. ${item.q}</p>
      ${item.opts.map((o, i) => `<button class="quiz-opt" data-i="${i}">${o}</button>`).join('')}</div>`;
    container.querySelectorAll('.quiz-opt').forEach(b => {
      b.onclick = () => {
        const chosen = Number(b.dataset.i);
        const correct = chosen === item.a;
        if (correct) score++;
        container.querySelectorAll('.quiz-opt').forEach(x => {
          x.disabled = true;
          if (Number(x.dataset.i) === item.a) x.classList.add('correct');
          else if (x === b) x.classList.add('wrong');
        });
        setTimeout(() => { idx++; draw(); }, 900);
      };
    });
  }
  draw();
}

// ---------- daily quiz ----------
function dailyQuestions() {
  const seed = Number(todayKey().replace(/-/g, ''));
  const pool = MODULES.flatMap(m => m.quiz);
  const picked = [];
  let s = seed;
  const rand = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
  const copy = [...pool];
  while (picked.length < 5 && copy.length) picked.push(copy.splice(Math.floor(rand() * copy.length), 1)[0]);
  return picked;
}
function renderQuizStatus() {
  const el = document.getElementById('quizStatus');
  const btn = document.getElementById('quizStartBtn');
  if (!el || !btn) return;
  if (progress.lastDailyQuiz === todayKey()) {
    el.textContent = 'Kuis hari ini sudah selesai. Kembali besok untuk menjaga streak!';
    btn.disabled = true; btn.textContent = 'Selesai untuk Hari Ini ✓';
  } else {
    el.textContent = progress.streak > 0
      ? `Streak kamu ${progress.streak} hari. Selesaikan kuis hari ini untuk melanjutkannya!`
      : 'Kuis hari ini menunggumu.';
    btn.disabled = false; btn.textContent = 'Mulai Kuis Harian';
  }
}
function startDailyQuiz() {
  document.getElementById('quizStart').classList.add('hidden');
  document.getElementById('quizDone').classList.add('hidden');
  const play = document.getElementById('quizPlay');
  play.classList.remove('hidden');
  renderQuiz(play, dailyQuestions(), (score) => {
    play.classList.add('hidden');
    const done = document.getElementById('quizDone');
    done.classList.remove('hidden');
    const xp = score * 10;
    if (progress.lastDailyQuiz === todayKey(-1)) progress.streak += 1;
    else if (progress.lastDailyQuiz !== todayKey()) progress.streak = 1;
    progress.lastDailyQuiz = todayKey();
    persist();
    addXp(xp);
    done.innerHTML = `<p><strong>Skor: ${score}/5 — +${xp} XP!</strong></p>
      <p class="muted">Streak: ${progress.streak} hari. Sampai jumpa besok, Penjaga.</p>`;
    renderQuizStatus();
  });
}

// ---------- scam shield ----------
function checkLinks(text) {
  const flags = [];
  const urls = text.match(/https?:\/\/[^\s)]+|www\.[^\s)]+|[a-z0-9-]+\.(com|net|org|xyz|top|click|site|online|vip|fun|io|app)\b/gi) || [];
  for (const raw of urls) {
    let host = raw.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0].toLowerCase();
    const official = OFFICIAL_DOMAINS.some(d => host === d || host.endsWith('.' + d));
    if (!official) {
      flags.push({
        tag: 'TINGGI', weight: 25,
        title: `Tautan bukan situs resmi Pi: ${host}`,
        why: 'Situs resmi Pi hanya di minepi.com dan pinet.com (Block Explorer: blockexplorer.minepi.com). Situs lain yang mengaku terkait Pi — apalagi yang meminta login atau frasa sandi — adalah penipuan.',
      });
    }
  }
  return flags;
}
function runShield() {
  const text = document.getElementById('shieldInput').value.trim();
  const box = document.getElementById('shieldResult');
  if (!text) { alert('Tempel dulu pesan atau tautannya, ya.'); return; }
  const flags = [];
  for (const rule of SHIELD_RULES) if (rule.pattern.test(text)) flags.push(rule);
  flags.push(...checkLinks(text));
  const score = flags.reduce((a, f) => a + f.weight, 0);
  let cls, verdict, advice;
  if (score >= 50) {
    cls = 'verdict-danger'; verdict = '⛔ BAHAYA — Ini Penipuan';
    advice = 'Jangan balas, jangan klik tautannya, jangan kirim apa pun. Blokir pengirimnya dan peringatkan teman-temanmu.';
  } else if (score >= 20) {
    cls = 'verdict-warn'; verdict = '⚠️ Mencurigakan — Kemungkinan Besar Penipuan';
    advice = 'Berhenti dulu. Periksa klaimnya hanya lewat aplikasi Pi resmi atau minepi.com. Jangan mengirim Pi atau data apa pun.';
  } else if (score > 0) {
    cls = 'verdict-warn'; verdict = '⚠️ Ada Tanda Bahaya — Tetap Waspada';
    advice = 'Ada unsur yang biasa dipakai penipu. Verifikasi lewat sumber resmi sebelum melakukan apa pun.';
  } else {
    cls = 'verdict-ok'; verdict = '✅ Tidak Ada Tanda Bahaya yang Dikenali';
    advice = 'Pemeriksa tidak menemukan pola penipuan yang dikenal. Tetap pegang aturan emas: frasa sandi tidak pernah dibagikan, dan klaim penting selalu diperiksa di sumber resmi.';
  }
  box.className = `verdict ${cls}`;
  box.innerHTML = `<h4>${verdict}</h4><p>${advice}</p>` +
    (flags.length ? `<ul class="flag-list">${flags.map(f => `<li><span class="flag-tag tag-${f.tag.toLowerCase()}">${f.tag}</span><strong>${f.title}.</strong> ${f.why}</li>`).join('')}</ul>` : '');
  box.classList.remove('hidden');
}
function renderScams() {
  const wrap = document.getElementById('scamCatalog');
  wrap.innerHTML = '';
  for (const s of SCAMS) {
    const el = document.createElement('div');
    el.className = 'card scam-item';
    el.innerHTML = `<h3>${s.title}</h3><p>${s.how}</p><p class="scam-sign"><strong>Tanda bahaya:</strong> ${s.sign}</p>`;
    wrap.appendChild(el);
  }
}

// ---------- profile ----------
function renderProfile() {
  document.getElementById('profileName').textContent = piUser ? `@${piUser.username}` : 'Tamu (mode demo)';
  document.getElementById('profileStatus').textContent = piUser
    ? (inPiBrowser ? 'Masuk dengan Pi (terverifikasi server)' : 'Mode demo di luar Pi Browser')
    : 'Belum masuk dengan Pi';
  document.getElementById('profilePremium').textContent = progress.premium ? 'Aktif ⭐' : 'Belum aktif';
}

// ---------- wire up ----------
function renderAll() { renderHome(); renderLessons(); renderScams(); renderProfile(); }
document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => switchView(t.dataset.view)));
document.getElementById('authBtn').addEventListener('click', signIn);
document.getElementById('payBtn').addEventListener('click', buyPremium);
document.getElementById('shieldBtn').addEventListener('click', runShield);
document.getElementById('quizStartBtn').addEventListener('click', startDailyQuiz);
document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm('Hapus semua progres di perangkat ini?')) {
    localStorage.removeItem(STORE_KEY);
    location.reload();
  }
});
renderAll();
