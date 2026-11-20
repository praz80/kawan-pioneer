// Kawan Pioneer — content: lessons, quizzes, scam catalog, shield rules, daily tips.
// All learning content is in Bahasa Indonesia; the store listing uses English.

const MODULES = [
  {
    id: 'dasar-pi',
    icon: '⛏️',
    title: 'Dasar Pi: Menambang & Cara Kerjanya',
    desc: 'Apa itu Pi, bagaimana sesi menambang bekerja, dan peran lingkaran keamanan.',
    premium: false,
    sections: [
      { h: 'Apa itu Pi?', p: 'Pi adalah mata uang digital yang ditambang lewat ponsel. Kamu tidak perlu perangkat mahal: cukup buka aplikasi Pi setiap hari dan ketuk tombol petir untuk memulai sesi menambang selama 24 jam.' },
      { h: 'Sesi menambang', p: 'Sesi berhenti sendiri setelah 24 jam. Ketuk lagi untuk memulai sesi baru. Kecepatan dasar bisa bertambah lewat peran Pioneer, Contributor (lingkaran keamanan), Ambassador (mengajak orang), dan Node.' },
      { h: 'Lingkaran keamanan', p: 'Tambahkan 3–5 orang yang benar-benar kamu kenal dan percaya ke lingkaran keamananmu. Ini menaikkan kecepatan menambang sekaligus membantu jaringan memverifikasi bahwa akun adalah manusia asli. Jangan menambahkan orang asing — lingkaranmu adalah pernyataan kepercayaan.' },
      { h: 'Saldo belum tentu bisa dipakai', p: 'Pi yang kamu tambang baru berpindah ke dompet Mainnet setelah kamu lolos KYC dan menyelesaikan Checklist Mainnet. Sebelum itu, saldo masih berstatus belum bermigrasi dan tidak bisa ditransfer.' },
    ],
    quiz: [
      { q: 'Berapa lama satu sesi menambang Pi berlangsung?', opts: ['1 jam', '12 jam', '24 jam', '7 hari'], a: 2 },
      { q: 'Siapa yang sebaiknya masuk lingkaran keamananmu?', opts: ['Orang asing dari grup chat', '3–5 orang yang kamu kenal dan percaya', 'Siapa saja yang meminta', 'Akun-akun bot'], a: 1 },
      { q: 'Kapan Pi hasil tambang bisa berpindah ke dompet Mainnet?', opts: ['Segera setelah ditambang', 'Setelah lolos KYC dan menyelesaikan Checklist Mainnet', 'Setelah 1 tahun', 'Tidak pernah'], a: 1 },
    ],
  },
  {
    id: 'dompet-frasa',
    icon: '🔐',
    title: 'Dompet Pi & Frasa Sandi: Pelajaran Terpenting',
    desc: 'Frasa sandi 24 kata adalah kunci satu-satunya ke dompetmu. Sekali bocor, Pi-mu hilang selamanya.',
    premium: false,
    sections: [
      { h: 'Apa itu frasa sandi?', p: 'Dompet Pi (Pi Wallet) dibuka dengan frasa sandi berisi 24 kata. Siapa pun yang memiliki 24 kata itu memiliki dompetmu — tanpa perlu ponselmu, tanpa perlu kata sandi lain.' },
      { h: 'Aturan emas', list: ['JANGAN PERNAH membagikan frasa sandimu kepada siapa pun.', 'Core Team, admin, dan petugas mana pun TIDAK AKAN PERNAH memintanya.', 'Jangan mengetik frasa sandi di situs atau aplikasi di luar Pi Wallet resmi di dalam Pi Browser.', 'Jangan menyimpannya sebagai foto atau tangkapan layar di galeri ponsel.'] },
      { h: 'Cara menyimpan yang benar', p: 'Tulis 24 kata itu di kertas, periksa ejaannya kata per kata, dan simpan di tempat yang aman di rumah. Kamu juga bisa menyalin ke dua kertas yang disimpan terpisah. Anggap kertas itu seperti kunci brankas.' },
      { h: 'Kalau frasa sandi hilang atau bocor', p: 'Frasa sandi yang hilang TIDAK bisa dipulihkan oleh siapa pun, termasuk Core Team — dompet lama tidak bisa dibuka lagi. Jika kamu curiga frasa sandimu diketahui orang lain, segera buat dompet baru dan pindahkan asetmu selagi masih bisa masuk.' },
    ],
    quiz: [
      { q: 'Siapa yang boleh mengetahui frasa sandimu?', opts: ['Admin grup Pi', 'Core Team', 'Customer service', 'Tidak ada siapa pun — hanya kamu'], a: 3 },
      { q: 'Berapa kata dalam frasa sandi Pi Wallet?', opts: ['12 kata', '24 kata', '6 kata', '100 kata'], a: 1 },
      { q: 'Apa yang terjadi jika frasa sandi hilang?', opts: ['Bisa direset lewat email', 'Core Team mengirim yang baru', 'Dompet tidak bisa dibuka lagi selamanya', 'Otomatis pulih dalam 7 hari'], a: 2 },
    ],
  },
  {
    id: 'kyc',
    icon: '🪪',
    title: 'KYC: Verifikasi Identitas Langkah demi Langkah',
    desc: 'KYC adalah syarat migrasi ke Mainnet. Siapkan KTP dan ikuti alurnya dengan tenang.',
    premium: false,
    sections: [
      { h: 'Kenapa harus KYC?', p: 'KYC (Know Your Customer) membuktikan bahwa satu akun dimiliki satu manusia asli. Pi mensyaratkan KYC agar saldo tambang bisa bermigrasi ke Mainnet dan dipakai.' },
      { h: 'Yang perlu disiapkan', list: ['KTP yang masih berlaku dan terbaca jelas.', 'Wajahmu untuk pemeriksaan keaktifan (liveness) — ikuti gerakan yang diminta di layar.', 'Nama di aplikasi Pi harus sama dengan nama di KTP. Perbaiki dulu lewat menu profil bila berbeda.'] },
      { h: 'Alur singkat', p: 'Buka Pi Browser → aplikasi KYC → isi data sesuai KTP → foto KTP → pemeriksaan wajah → kirim. Setelah itu pengajuanmu diperiksa oleh validator. Status bisa "tentatif" sebelum disetujui penuh; bersabarlah, antrean validator berbeda-beda di tiap wilayah.' },
      { h: 'Hati-hati jasa KYC', p: 'Jangan memakai "jasa joki KYC" atau membeli akun yang sudah KYC. Akun dan identitas orang lain bisa membuat saldomu dikunci, dan membagikan foto KTP-mu ke orang asing adalah risiko pencurian identitas.' },
    ],
    quiz: [
      { q: 'Dokumen utama untuk KYC Pioneer Indonesia adalah…', opts: ['Kartu keluarga', 'KTP', 'SIM saja tanpa KTP', 'Paspor wajib'], a: 1 },
      { q: 'Nama di aplikasi Pi sebaiknya…', opts: ['Nama panggilan bebas', 'Sama dengan nama di KTP', 'Nama orang lain', 'Dikosongkan'], a: 1 },
      { q: 'Pendapat yang benar tentang joki KYC berbayar:', opts: ['Aman dan resmi', 'Diperbolehkan Core Team', 'Berisiko: akun bisa dikunci dan identitas bisa dicuri', 'Wajib untuk pemula'], a: 2 },
    ],
  },
  {
    id: 'checklist-mainnet',
    icon: '✅',
    title: 'Checklist Mainnet: Jalan Menuju Migrasi',
    desc: 'Delapan langkah di aplikasi Pi yang harus tuntas agar saldo berpindah ke dompetmu.',
    premium: false,
    sections: [
      { h: 'Apa itu Checklist Mainnet?', p: 'Di aplikasi Pi ada daftar langkah bernama Mainnet Checklist. Setiap langkah yang tuntas ditandai centang. Saldo bermigrasi setelah langkah kuncinya selesai, terutama: unduh Pi Browser, buat/konfirmasi dompet, lolos KYC, dan menandatangani pengakuan token.' },
      { h: 'Langkah yang paling sering tersendat', list: ['Konfirmasi dompet: pastikan alamat dompet di checklist sama dengan dompet tempat kamu menyimpan frasa sandi.', 'Pengakuan token (token acknowledgement): baca dan tanda tangani di dalam Pi Wallet resmi.', 'KYC disetujui penuh, bukan hanya tentatif.'] },
      { h: 'Setelah migrasi', p: 'Sebagian saldo biasanya terkunci sesuai pengaturan lockup yang kamu pilih sendiri (persentase dan durasi). Saldo yang tidak terkunci bisa dipakai untuk pembayaran dan transfer di Mainnet.' },
      { h: 'Uji dengan jumlah kecil', p: 'Saat pertama kali mengirim Pi, selalu uji dengan jumlah sangat kecil dulu (mis. 0,01 Pi) ke alamat tujuan, periksa di Block Explorer, baru kirim sisanya setelah terbukti sampai.' },
    ],
    quiz: [
      { q: 'Langkah apa yang membuktikan dompet di checklist adalah dompetmu?', opts: ['Mengunduh Pi Browser saja', 'Konfirmasi alamat dompet dan menyimpan frasa sandinya', 'Mengajak 5 teman', 'Menambang 100 hari'], a: 1 },
      { q: 'Mengapa sebagian saldo tidak bisa langsung dipakai setelah migrasi?', opts: ['Karena hilang', 'Karena pengaturan lockup yang dipilih sendiri', 'Karena dibekukan Core Team', 'Karena belum ditambang'], a: 1 },
      { q: 'Kebiasaan terbaik saat pertama mengirim Pi ke alamat baru:', opts: ['Kirim semua sekaligus', 'Uji jumlah kecil dulu dan periksa di Block Explorer', 'Percaya tangkapan layar penerima', 'Kirim tanpa memeriksa alamat'], a: 1 },
    ],
  },
  {
    id: 'block-explorer',
    icon: '🔎',
    title: 'Membaca Block Explorer: Bukti di Atas Segalanya',
    desc: 'Setiap transaksi Pi tercatat publik. Pelajari cara memeriksa alamat, saldo, dan status transaksi.',
    premium: true,
    sections: [
      { h: 'Apa itu Block Explorer?', p: 'Block Explorer (blockexplorer.minepi.com) adalah buku catatan publik blockchain Pi. Semua transaksi tercatat di sana dan tidak bisa dihapus atau dipalsukan. Kalau seseorang bilang "sudah saya kirim", buktinya ada di sini — bukan di tangkapan layar.' },
      { h: 'Memeriksa transaksi', p: 'Tempel hash transaksi atau alamat dompet ke kolom pencarian. Kamu bisa melihat pengirim, penerima, jumlah, waktu, dan status. Transaksi yang tidak ditemukan berarti tidak pernah terjadi di blockchain.' },
      { h: 'Memeriksa alamat tujuan', p: 'Sebelum mengirim, tempel alamat tujuan dan lihat riwayatnya. Alamat dompet asli selalu diawali huruf "G" dan panjangnya 56 karakter. Alamat dompet penampung (muxed) bisa lebih panjang dan diawali "M" — itu alamat turunan dari bursa, pastikan memang dari bursa resminya.' },
      { h: 'Melacak dana yang hilang', p: 'Dari halaman alamat dompetmu, buka daftar pembayaran (payments) untuk melihat semua Pi masuk dan keluar beserta hash-nya. Catatan ini adalah titik awal yang benar bila kamu merasa kehilangan Pi: lihat transaksi keluar terbesar, ke alamat mana, dan kapan.' },
    ],
    quiz: [
      { q: 'Bukti paling kuat bahwa sebuah transaksi Pi benar-benar terjadi:', opts: ['Tangkapan layar dari pengirim', 'Janji di chat', 'Catatan transaksi di Block Explorer', 'Foto struk'], a: 2 },
      { q: 'Alamat dompet Pi asli umumnya diawali huruf…', opts: ['M selalu', 'G, dengan panjang 56 karakter', 'P', '0x'], a: 1 },
      { q: 'Jika hash transaksi tidak ditemukan di Block Explorer, artinya…', opts: ['Transaksi masih antre 1 bulan', 'Transaksi itu tidak pernah terjadi di blockchain', 'Explorer sedang rusak', 'Transaksi bersifat rahasia'], a: 1 },
    ],
  },
  {
    id: 'transaksi-aman',
    icon: '🤝',
    title: 'Transaksi & Jual-Beli Pi yang Aman',
    desc: 'Aturan main bertransaksi dengan orang lain: verifikasi dulu, percaya kemudian.',
    premium: true,
    sections: [
      { h: 'Prinsip dasar', p: 'Di blockchain, transaksi yang sudah terkirim tidak bisa dibatalkan. Karena itu urutannya selalu: verifikasi dulu, kirim kemudian. Tidak ada admin yang bisa membatalkan atau mengembalikan Pi yang sudah terkirim ke alamat yang salah atau ke penipu.' },
      { h: 'Aturan bertransaksi', list: ['Selalu uji jumlah kecil untuk alamat atau lawan transaksi baru.', 'Minta hash transaksi dan periksa sendiri di Block Explorer sebelum menyerahkan barang/jasa.', 'Jangan percaya tangkapan layar saldo atau "bukti transfer" — itu mudah dipalsukan.', 'Waspadai harga yang jauh di atas atau di bawah kewajaran; itu umpan klasik.', 'Jangan pernah membayar "biaya verifikasi", "biaya unlock", atau "pajak" agar Pi-mu bisa dicairkan. Itu modus penipuan.'] },
      { h: 'Grup dan marketplace tidak resmi', p: 'Grup jual-beli di media sosial tidak diawasi Core Team. Jika bertransaksi di sana, gunakan perantara yang benar-benar kamu kenal, mulai dari nominal kecil, dan berhenti bila lawan transaksi mulai mendesak atau mengganti alamat tujuan di tengah jalan.' },
      { h: 'Laporkan dan dokumentasikan', p: 'Bila kamu tertipu, simpan semua bukti: alamat tujuan, hash transaksi, dan tangkapan layar percakapan. Bukti itu yang dibutuhkan untuk laporan ke platform terkait atau ke kepolisian. Menyimpan bukti tidak menjamin dana kembali, tetapi tanpa bukti tidak ada yang bisa ditindaklanjuti.' },
    ],
    quiz: [
      { q: 'Apakah transaksi Pi yang sudah terkirim bisa dibatalkan oleh admin?', opts: ['Bisa, dalam 24 jam', 'Bisa, bila melapor', 'Tidak bisa — transaksi blockchain bersifat final', 'Bisa dengan biaya'], a: 2 },
      { q: 'Seseorang memintamu membayar "biaya unlock" agar Pi-mu cair. Sikapmu?', opts: ['Bayar, itu prosedur resmi', 'Itu modus penipuan — berhenti dan jangan bayar', 'Bayar separuh dulu', 'Minta diskon'], a: 1 },
      { q: 'Cara memastikan pembayaran dari pembeli benar-benar masuk:', opts: ['Lihat tangkapan layarnya', 'Percaya kata-katanya', 'Periksa hash transaksinya di Block Explorer', 'Tunggu 30 hari'], a: 2 },
    ],
  },
];

const SCAMS = [
  {
    title: 'Phishing Frasa Sandi',
    how: 'Penipu membuat situs atau formulir mirip Pi Wallet, lalu memancing korban "memverifikasi dompet" dengan mengetik 24 kata frasa sandi. Dalam hitungan menit dompet dikuras.',
    sign: 'Situs/formulir apa pun di luar Pi Wallet resmi yang meminta frasa sandi. Core Team TIDAK PERNAH memintanya.',
  },
  {
    title: 'Airdrop & Giveaway Palsu',
    how: 'Akun media sosial mengaku Core Team dan mengumumkan airdrop: "kirim 10 Pi, terima 100 Pi" atau "klaim bonus di tautan ini". Tautan mengarah ke situs phishing.',
    sign: 'Janji menggandakan Pi dan tautan klaim di luar minepi.com. Pi resmi tidak pernah meminta kiriman Pi untuk hadiah.',
  },
  {
    title: 'Bursa / Exchange Palsu',
    how: 'Grup atau situs mengaku bisa menukar Pi dengan rupiah pada harga tinggi. Korban diminta mentransfer Pi dulu, lalu grup menghilang atau meminta "biaya penarikan" tanpa akhir.',
    sign: 'Harga jauh di atas kewajaran, transfer Pi lebih dulu, dan biaya-biaya tambahan yang terus muncul.',
  },
  {
    title: 'Admin & Customer Service Palsu',
    how: 'Akun berkedok admin Pi menghubungi lewat chat, menawarkan bantuan KYC/migrasi/unlock, lalu meminta frasa sandi atau pembayaran "biaya layanan".',
    sign: 'Admin resmi tidak pernah menghubungi duluan lewat DM dan tidak memungut biaya lewat chat pribadi.',
  },
  {
    title: 'Aplikasi Pi Palsu',
    how: 'APK atau aplikasi tiruan beredar di luar Play Store/App Store, meniru aplikasi Pi atau Pi Browser. Isinya mencuri data dan frasa sandi.',
    sign: 'Unduhan dari tautan acak/grup chat. Aplikasi resmi hanya dari toko aplikasi resmi dan tautan di minepi.com.',
  },
  {
    title: 'Investasi & Robot Trading Pi',
    how: 'Skema "titip Pi, profit 10% per minggu" atau robot trading yang meminta akses dompet. Berakhir ketika penipu membawa lari semua titipan.',
    sign: 'Imbal hasil tetap dan "pasti" dalam waktu singkat. Tidak ada investasi Pi yang dijamin Core Team.',
  },
];

// Red-flag rules for the Scam Shield checker. Runs fully on-device.
const SHIELD_RULES = [
  {
    id: 'passphrase',
    tag: 'KRITIS', weight: 50,
    pattern: /(frasa sandi|passphrase|mnemonic|seed phrase|24 kata|kata pemulihan|recovery phrase)/i,
    title: 'Meminta frasa sandi',
    why: 'Tidak ada alasan sah bagi siapa pun meminta frasa sandimu. Siapa pun yang memintanya — dengan dalih verifikasi, unlock, migrasi, atau hadiah — adalah penipu. Berhenti sekarang dan jangan balas.',
  },
  {
    id: 'send-first',
    tag: 'TINGGI', weight: 30,
    pattern: /(kirim(kan)?\s+\d*\s*pi\s+(dulu|sekarang)|transfer\s+(dulu|sekarang)|deposit\s+dulu|send\s+\d*\s*pi\s+first)/i,
    title: 'Meminta kamu mengirim Pi lebih dulu',
    why: 'Modus klasik: "kirim Pi dulu" untuk hadiah, penukaran, atau verifikasi. Pi yang terkirim tidak bisa kembali. Penawaran resmi tidak pernah bekerja seperti ini.',
  },
  {
    id: 'profit',
    tag: 'TINGGI', weight: 25,
    pattern: /(pasti untung|dijamin (untung|profit)|profit\s+\d+\s*%|gandakan|x\s?\d{2,}\b|lipat\s+\d+|tanpa (risiko|resiko))/i,
    title: 'Janji keuntungan pasti / berlipat',
    why: 'Tidak ada pihak yang bisa menjamin keuntungan, apalagi berlipat-lipat. Janji seperti ini adalah umpan utama penipuan investasi dan giveaway palsu.',
  },
  {
    id: 'fee',
    tag: 'TINGGI', weight: 25,
    pattern: /(biaya (verifikasi|unlock|aktivasi|penarikan|admin|pajak)|fee (unlock|verifikasi)|unlock fee)/i,
    title: 'Meminta "biaya" agar Pi bisa cair',
    why: 'Tidak ada biaya verifikasi/unlock/pajak yang harus dibayar agar Pi bisa dicairkan. Ini modus lanjutan setelah korban mengirim Pi pertama kali.',
  },
  {
    id: 'impersonation',
    tag: 'SEDANG', weight: 15,
    pattern: /(core team|admin pi|tim resmi pi|customer service pi|support pi|official pi|pi network official)/i,
    title: 'Mengaku sebagai pihak resmi Pi',
    why: 'Penipu sering memakai nama Core Team/admin. Pengumuman resmi hanya ada di aplikasi Pi dan minepi.com — bukan lewat chat pribadi. Periksa klaimnya di sumber resmi.',
  },
  {
    id: 'urgency',
    tag: 'SEDANG', weight: 10,
    pattern: /(sekarang juga|hari ini (saja|terakhir)|kesempatan terakhir|akan hangus|segera berakhir|dalam \d+ (menit|jam)|jangan sampai (kehabisan|terlambat))/i,
    title: 'Desakan waktu',
    why: 'Penipu sengaja membuatmu panik agar tidak sempat berpikir dan memeriksa. Penawaran yang sah tidak takut kamu periksa dulu.',
  },
];

const OFFICIAL_DOMAINS = ['minepi.com', 'pinet.com', 'pi-apps.github.io', 'blockexplorer.minepi.com'];

const DAILY_TIPS = [
  'Core Team tidak akan pernah meminta frasa sandimu. Siapa pun yang memintanya adalah penipu, titik.',
  'Selalu periksa alamat situs: yang resmi hanya minepi.com dan pinet.com. Satu huruf berbeda = palsu.',
  'Tulis frasa sandi 24 katamu di kertas dan simpan di rumah. Jangan difoto, jangan disimpan di galeri ponsel.',
  'Uji dengan jumlah kecil (mis. 0,01 Pi) setiap kali mengirim ke alamat baru.',
  'Tangkapan layar "bukti transfer" mudah dipalsukan. Satu-satunya bukti sah adalah catatan di Block Explorer.',
  'Aktifkan kunci layar ponselmu. Ponsel tanpa kunci = dompet tanpa gembok.',
  'Tidak ada biaya unlock, biaya verifikasi, atau pajak yang harus dibayar agar Pi bisa dicairkan. Itu modus.',
  'Jangan memakai jasa joki KYC. Identitasmu bisa dicuri dan akunmu bisa dikunci.',
  'Penawaran yang mendesakmu "sekarang juga" hampir selalu penipuan. Yang sah tidak takut diperiksa.',
  'Periksa alamat dompet tujuan karakter demi karakter sebelum mengirim. Alamat asli: 56 karakter, diawali huruf G.',
];
