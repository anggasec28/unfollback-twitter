// Script untuk Berhenti Mengikuti Akun yang TIDAK Mengikuti Balik

// --- NAMA FUNGSI DIUBAH MENJADI 'start' ---
async function start() {
    console.log('🚀 Proses unfoll non-follower start...');
    
    let jumlahUnfollow = 0;
    let totalDiproses = 0;
    let jumlahDilewati = 0;
    
    window.scrollTo(0, 0);
    await jeda(2000);
    
    while (true) {
        const tombolMengikuti = document.querySelectorAll('[data-testid="unfollow"], [aria-label*="Following"], [aria-label*="Mengikuti"], button[aria-label*="Following"]');
        
        if (tombolMengikuti.length === 0) {
            console.log('🔍 Tombol "Mengikuti" tidak ditemukan, mencoba scroll down...');
            
            window.scrollBy(0, 1000);
            await jeda(1500);
            
            const tombolBaru = document.querySelectorAll('[data-testid="unfollow"], [aria-label*="Following"], [aria-label*="Mengikuti"], button[aria-label*="Following"]');
            
            if (tombolBaru.length === 0) {
                console.log('✅ Semua akun yang diikuti telah selesai diproses!');
                break;
            }
            continue;
        }
        
        console.log(`📋 Menemukan ${tombolMengikuti.length} tombol "Mengikuti"`);
        
        for (let i = 0; i < tombolMengikuti.length; i++) {
            const tombol = tombolMengikuti[i];
            
            const userCell = tombol.closest('[data-testid="UserCell"]');
            
            if (userCell) {
                const followsYouBadge = userCell.querySelector('[data-testid="userFollowIndicator"]');
                
                if (followsYouBadge) {
                    jumlahDilewati++;
                    console.log(`↪️  Melewati pengguna (karena mengikuti balik)`);
                    totalDiproses++;
                    continue; 
                }
            }

            try {
                tombol.click();
                await jeda(300);
                
                const tombolKonfirmasi = document.querySelector('[data-testid="confirmationSheetConfirm"]') || 
                                           document.querySelector('button[data-testid="confirmationSheetConfirm"]') ||
                                           document.querySelector('[role="button"][data-testid="confirmationSheetConfirm"]');
                
                if (tombolKonfirmasi) {
                    tombolKonfirmasi.click();
                }

                jumlahUnfollow++;
                console.log(`🚫 Berhenti mengikuti orang ke-${jumlahUnfollow} (tidak mengikuti balik)`);
                totalDiproses++;
                
                await jeda(3000);
                
            } catch (error) {
                console.warn('⚠️ Terjadi kesalahan:', error);
                continue;
            }
        }
        
        console.log('⏳ Memuat lebih banyak akun...');
        await jeda(1000);
    }
    
    console.log(`🎉 Proses selesai! Total ${jumlahUnfollow} akun telah di-unfollow.`);
    
    tampilkanStatistik(jumlahUnfollow, totalDiproses, jumlahDilewati);
}

function jeda(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function tampilkanStatistik(unfollowed, processed, skipped) {
    const statistik = `
╔══════════════════════════════════╗
║           RESULT SUKSES           ║
╠══════════════════════════════════╣
║ Berhasil di-unfollow: ${unfollowed.toString().padStart(3)}          ║
║ Dilewati (saling follow): ${skipped.toString().padStart(3)}    ║
║ Total tombol diproses: ${processed.toString().padStart(8)}      ║
║ Status proses: SELESAI ✅          ║
╚══════════════════════════════════╝
    `;
    console.log(statistik);
}

// --- PANDUAN DIPERBARUI DENGAN PERINTAH 'start' ---
function panduanCepat() {
    console.log(`
🔥 MASS UNFOLLBACK X 
════════════════════════════════════

📋 Cara menggunakan:
1. Buka halaman "Mengikuti" (Following) di profil Twitter Anda.
2. Buka konsol browser (tekan F12, lalu klik tab "Console").
3. Salin dan tempel (copy-paste) seluruh kode ini, lalu tekan Enter.
4. Ketik start() dan tekan Enter untuk memulai.

⚠️ PERINGATAN PENTING:
• Tindakan ini tidak dapat dibatalkan!
• Jangan tutup halaman atau tab browser selama proses berjalan.

Ketik "start()" untuk memulai.
    `);
}

panduanCepat();
