// ==================== SUPABASE CONFIGURATION ====================
const SUPABASE_URL = 'https://blkplgvhkgtsgnindwht.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsa3BsZ3Zoa2d0c2duaW5kd2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5NDM1NjMsImV4cCI6MjA3NTUxOTU2M30.HClTmehLskf_mgebwpRH9g-gyprqjIs8mn97HBOIT1k';
let supabaseClient = null;
let currentUser = null;
let isSupabaseEnabled = false;

// ==================== SUPABASE INITIALIZATION ====================
function initSupabase() {
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
        console.log('🔶 Running in DEMO MODE (without database)');
        isSupabaseEnabled = false;
        updateUIForGuestUser();
        return;
    }

    if (typeof supabase === 'undefined') {
        console.warn('⚠️ Supabase library not loaded');
        isSupabaseEnabled = false;
        updateUIForGuestUser();
        return;
    }

    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        isSupabaseEnabled = true;
        checkAuthState();
        console.log('✅ Supabase connected successfully');
    } catch (error) {
        console.error('❌ Supabase error:', error);
        isSupabaseEnabled = false;
        updateUIForGuestUser();
    }
}

async function checkAuthState() {
    if (!isSupabaseEnabled) return;
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session && session.user) {
            currentUser = session.user;
            
            // 🆕 Jika user baru dari Google OAuth, buat profile
            const { data: existingProfile } = await supabaseClient
                .from('user_profiles')
                .select('*')
                .eq('user_id', currentUser.id)
                .single();
            
            if (!existingProfile) {
                const displayName = currentUser.user_metadata?.full_name || 
                                   currentUser.user_metadata?.name || 
                                   currentUser.email.split('@')[0];
                
                await supabaseClient.from('user_profiles').insert([{
                    user_id: currentUser.id,
                    display_name: displayName
                }]);
                
                await supabaseClient.from('user_progress').insert([{
                    user_id: currentUser.id,
                    completed_modules: [],
                    chapter_scores: {},
                    drag_drop_stats: { attempts: 0, correct: 0 }
                }]);
                
                currentUser.displayName = displayName;
            } else {
                currentUser.displayName = existingProfile.display_name;
            }
            
            updateUIForAuthenticatedUser();
        } else {
            updateUIForGuestUser();
            if (!sessionStorage.getItem('welcomeShown')) {
                showWelcomeModal();
                sessionStorage.setItem('welcomeShown', 'true');
            }
        }
    } catch (error) {
        console.error('Auth check error:', error);
    }
}

async function loadUserProfile() {
    if (!isSupabaseEnabled || !currentUser) return;
    try {
        const { data } = await supabaseClient
            .from('user_profiles')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();
        if (data) currentUser.displayName = data.display_name;
        else await createUserProfile();
    } catch (error) {
        console.error('Profile load error:', error);
    }
}

async function createUserProfile() {
    if (!isSupabaseEnabled || !currentUser) return;
    try {
        const displayName = currentUser.user_metadata?.full_name || currentUser.email.split('@')[0];
        await supabaseClient.from('user_profiles').insert([{
            user_id: currentUser.id,
            display_name: displayName
        }]);
        currentUser.displayName = displayName;
    } catch (error) {
        console.error('Error creating profile:', error);
    }
}

function updateUIForAuthenticatedUser() {
    const signInBtn = document.getElementById('signInBtn');
    const userProfileHeader = document.getElementById('userProfileHeader');
    const userNameHeader = document.getElementById('userNameHeader');
    
    if (signInBtn) signInBtn.style.display = 'none';
    if (userProfileHeader) userProfileHeader.style.display = 'flex';
    if (userNameHeader) {
        userNameHeader.textContent = currentUser.displayName || currentUser.email.split('@')[0];
    }
}

function updateUIForGuestUser() {
    const signInBtn = document.getElementById('signInBtn');
    const userProfileHeader = document.getElementById('userProfileHeader');
    
    if (signInBtn) signInBtn.style.display = 'block';
    if (userProfileHeader) userProfileHeader.style.display = 'none';
}

// ==================== AUTH MODAL FUNCTIONS ====================
function showWelcomeModal() {
    if (!isSupabaseEnabled) return;
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
    }
}

function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
    }
}

function showAuthModal(type) {
    if (!isSupabaseEnabled) {
        alert('Fitur autentikasi belum dikonfigurasi.');
        return;
    }
    closeWelcomeModal();
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
    }
    switchAuthForm(type);
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
    }
    clearAuthMessage();
}

function switchAuthForm(type) {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    
    if (type === 'signin') {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
    } else {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
    }
    clearAuthMessage();
}

async function signIn() {
    if (!isSupabaseEnabled) return;
    const email = document.getElementById('signInEmail').value.trim();
    const password = document.getElementById('signInPassword').value;
    
    if (!email || !password) {
        showAuthMessage('Mohon isi email dan password', 'error');
        return;
    }
    
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) throw error;
        
        currentUser = data.user;
        await loadUserProfile();
        showAuthMessage('Sign in berhasil!', 'success');
        
        setTimeout(() => {
            closeAuthModal();
            updateUIForAuthenticatedUser();
            loadUserProgress();
        }, 1500);
    } catch (error) {
        showAuthMessage(error.message, 'error');
    }
}

async function signUp() {
    if (!isSupabaseEnabled) return;
    const name = document.getElementById('signUpName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value;
    
    if (!name || !email || !password) {
        showAuthMessage('Mohon isi semua field', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAuthMessage('Password minimal 6 karakter', 'error');
        return;
    }
    
    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: { data: { full_name: name } }
        });
        
        if (error) throw error;
        
        if (data.user) {
            await supabaseClient.from('user_profiles').insert([{
                user_id: data.user.id,
                display_name: name
            }]);
            
            await supabaseClient.from('user_progress').insert([{
                user_id: data.user.id,
                completed_modules: [],
                chapter_scores: {},
                drag_drop_stats: { attempts: 0, correct: 0 }
            }]);
        }
        
        if (data.user) {
    // ... kode insert database ...
    
    closeAuthModal();
    alert(`✅ Pendaftaran Berhasil!\n\n📧 Kami telah mengirim email konfirmasi ke:\n${email}\n\nSilakan buka email Anda dan klik link konfirmasi sebelum Sign In.\n\n⚠️ Cek folder Spam jika tidak ada di Inbox.`);
}
    } catch (error) {
        showAuthMessage(error.message, 'error');
    }
}

async function signInWithGoogle() {
    if (!isSupabaseEnabled) {
        alert('Fitur autentikasi belum dikonfigurasi.');
        return;
    }
    
    try {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });
        
        if (error) throw error;
        
        // User akan di-redirect ke Google OAuth
        // Setelah berhasil, akan kembali ke aplikasi
    } catch (error) {
        console.error('Google Sign In error:', error);
        showAuthMessage('Gagal sign in dengan Google: ' + error.message, 'error');
    }
}

async function signOut() {
    if (!isSupabaseEnabled) return;
    try {
        await supabaseClient.auth.signOut();
        currentUser = null;
        updateUIForGuestUser();
        showPage('home');
        alert('Sign out berhasil!');
    } catch (error) {
        console.error('Sign out error:', error);
    }
}

function showAuthMessage(message, type) {
    const messageDiv = document.getElementById('authMessage');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `auth-message show ${type}`;
    }
}

function clearAuthMessage() {
    const messageDiv = document.getElementById('authMessage');
    if (messageDiv) {
        messageDiv.className = 'auth-message';
        messageDiv.textContent = '';
    }
}

// ==================== SCORE CALCULATION FUNCTIONS ====================
function calculateChapterAverage(chapterScores, chapterNum) {
    const babKey = `bab${chapterNum}`;
    const soalScores = chapterScores[babKey] || {};
    
    const scores = [];
    for (let i = 1; i <= 5; i++) {
        scores.push(soalScores[`soal${i}`] || 0);
    }
    
    const average = scores.reduce((sum, score) => sum + score, 0) / 5;
    return Math.round(average);
}

function calculateTotalScore(chapterScores) {
    let total = 0;
    for (let bab = 1; bab <= 5; bab++) {
        total += calculateChapterAverage(chapterScores, bab);
    }
    return total;
}

async function saveChapterScore(chapterNum, problemNum, score) {
    if (!isSupabaseEnabled || !currentUser) return;
    
    try {
        // 🔧 FIX: Coba ambil data, jika tidak ada buat baru
        let { data: progress, error: fetchError } = await supabaseClient
            .from('user_progress')
            .select('chapter_scores')
            .eq('user_id', currentUser.id)
            .maybeSingle(); // ⚠️ GANTI .single() jadi .maybeSingle()
        
        // ✅ Jika tidak ada record, buat baru
        if (!progress) {
            console.log('🆕 Creating new user_progress record...');
            const { error: insertError } = await supabaseClient
                .from('user_progress')
                .insert([{
                    user_id: currentUser.id,
                    completed_modules: [],
                    chapter_scores: {},
                    drag_drop_stats: { attempts: 0, correct: 0 }
                }]);
            
            if (insertError) {
                console.error('❌ Failed to create user_progress:', insertError);
                throw insertError;
            }
            
            // Set progress ke struktur default
            progress = { chapter_scores: {} };
        }
        
        if (fetchError) throw fetchError;
        
        let chapterScores = progress?.chapter_scores || {};
        
        const babKey = `bab${chapterNum}`;
        const soalKey = `soal${problemNum}`;
        
        // Inisialisasi struktur jika belum ada
        if (!chapterScores[babKey] || typeof chapterScores[babKey] !== 'object') {
            chapterScores[babKey] = {};
        }
        
        const currentScore = chapterScores[babKey][soalKey] || 0;
        
        if (score > currentScore) {
            chapterScores[babKey][soalKey] = score;
            
            const { error: updateError } = await supabaseClient
                .from('user_progress')
                .update({ 
                    chapter_scores: chapterScores,
                    updated_at: new Date().toISOString()
                })
                .eq('user_id', currentUser.id);
            
            if (updateError) throw updateError;
            
            console.log(`✅ Saved: Bab ${chapterNum} Soal ${problemNum} = ${score}`);
        }
    } catch (error) {
        console.error('Error saving score:', error);
    }
}

// ==================== PROGRESS TRACKING ====================
async function markChapterComplete(chapterNum) {
    if (!isSupabaseEnabled || !currentUser) {
        alert('Silakan Sign In terlebih dahulu untuk menyimpan progress!');
        if (isSupabaseEnabled) showAuthModal('signin');
        return;
    }
    
    try {
        const { data: progress, error: fetchError } = await supabaseClient
            .from('user_progress')
            .select('completed_modules')
            .eq('user_id', currentUser.id)
            .single();
        
        if (fetchError) throw fetchError;
        
        let completedModules = progress?.completed_modules || [];
        
        if (completedModules.includes(chapterNum)) {
            alert('Bab ini sudah ditandai selesai!');
            return;
        }
        
        completedModules.push(chapterNum);
        
        await supabaseClient
            .from('user_progress')
            .update({ 
                completed_modules: completedModules,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', currentUser.id);
        
        const btn = document.getElementById(`completeBtn-${chapterNum}`);
        if (btn) {
            btn.classList.add('completed');
            btn.innerHTML = '<span class="check-icon">✓</span> Pembelajaran Selesai!';
        }
        
        alert(`Selamat! Bab ${chapterNum} telah ditandai selesai! 🎉`);
    } catch (error) {
        console.error('Error marking chapter complete:', error);
    }
}

async function loadUserProgress() {
    if (!isSupabaseEnabled || !currentUser) return;
    
    try {
        const { data, error } = await supabaseClient
            .from('user_progress')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();
        
        if (error && error.code === 'PGRST116') {
            await supabaseClient.from('user_progress').insert([{
                user_id: currentUser.id,
                completed_modules: [],
                chapter_scores: {},
                drag_drop_stats: { attempts: 0, correct: 0 }
            }]);
        } else if (data) {
            const completedModules = data.completed_modules || [];
            completedModules.forEach(chapterNum => {
                const btn = document.getElementById(`completeBtn-${chapterNum}`);
                if (btn) {
                    btn.classList.add('completed');
                    btn.innerHTML = '<span class="check-icon">✓</span> Pembelajaran Selesai!';
                }
            });
        }
    } catch (error) {
        console.error('Error loading progress:', error);
    }
}

async function updateDragDropStats(isCorrect) {
    if (!isSupabaseEnabled || !currentUser) return;
    
    try {
        const { data: progress } = await supabaseClient
            .from('user_progress')
            .select('drag_drop_stats')
            .eq('user_id', currentUser.id)
            .single();
        
        let stats = progress?.drag_drop_stats || { attempts: 0, correct: 0 };
        stats.attempts += 1;
        if (isCorrect) stats.correct += 1;
        
        await supabaseClient
            .from('user_progress')
            .update({ 
                drag_drop_stats: stats,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', currentUser.id);
    } catch (error) {
        console.error('Error updating drag&drop stats:', error);
    }
}

// ==================== LEADERBOARD ====================
async function loadLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    if (!leaderboardList) return;
    
    if (!isSupabaseEnabled) {
        leaderboardList.innerHTML = '<div class="loading-message">Fitur leaderboard memerlukan Supabase.</div>';
        return;
    }

    try {
        leaderboardList.innerHTML = '<div class="loading-message">Memuat data leaderboard...</div>';
        
        const { data: progressData } = await supabaseClient.from('user_progress').select('*');
        const { data: profilesData } = await supabaseClient.from('user_profiles').select('*');
        
        const leaderboardData = progressData.map(progress => {
            const profile = profilesData.find(p => p.user_id === progress.user_id);
            const chapterScores = progress.chapter_scores || {};
            const totalScore = calculateTotalScore(chapterScores);
            const completedModules = (progress.completed_modules || []).length;
            
            return {
                userId: progress.user_id,
                name: profile?.display_name || 'User',
                totalScore: totalScore,
                completedModules: completedModules
            };
        });
        
        leaderboardData.sort((a, b) => b.totalScore - a.totalScore);
        
        if (leaderboardData.length === 0) {
            leaderboardList.innerHTML = '<div class="loading-message">Belum ada data leaderboard.</div>';
            return;
        }
        
        leaderboardList.innerHTML = '';
        leaderboardData.forEach((user, index) => {
            const rank = index + 1;
            const item = document.createElement('div');
            item.className = `leaderboard-item ${rank <= 3 ? `top-${rank}` : ''}`;
            
            let rankDisplay = rank;
            if (rank === 1) rankDisplay = '🥇';
            else if (rank === 2) rankDisplay = '🥈';
            else if (rank === 3) rankDisplay = '🥉';
            
            item.innerHTML = `
                <div class="leaderboard-rank">${rankDisplay}</div>
                <div class="leaderboard-user-info">
                    <div class="leaderboard-name">${user.name}</div>
                    <div class="leaderboard-progress">${user.completedModules} / 5 Modul Selesai</div>
                </div>
                <div class="leaderboard-score">${user.totalScore} / 500</div>
            `;
            
            leaderboardList.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        leaderboardList.innerHTML = '<div class="loading-message">Gagal memuat leaderboard.</div>';
    }
}

// ==================== PROFILE PAGE ====================
async function loadProfilePage() {
    if (!isSupabaseEnabled) {
        document.getElementById('profileName').textContent = 'Demo Mode';
        document.getElementById('profileEmail').textContent = 'Fitur profil memerlukan Supabase';
        document.getElementById('completedModules').textContent = '-';
        document.getElementById('totalScore').textContent = '-';
        document.getElementById('dragDropAccuracy').textContent = '-';
        document.getElementById('chapterScoresList').innerHTML = '<p style="text-align:center; color:var(--text-secondary)">Supabase belum dikonfigurasi.</p>';
        return;
    }

    if (!currentUser) {
        document.getElementById('profileName').textContent = 'Guest User';
        document.getElementById('profileEmail').textContent = 'Silakan Sign In';
        document.getElementById('completedModules').textContent = '-';
        document.getElementById('totalScore').textContent = '-';
        document.getElementById('dragDropAccuracy').textContent = '-';
        document.getElementById('chapterScoresList').innerHTML = '<p style="text-align:center; color:var(--text-secondary)">Silakan Sign In terlebih dahulu.</p>';
        return;
    }
    
    try {
        const { data: profile } = await supabaseClient
            .from('user_profiles')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();
        
        const { data: progress } = await supabaseClient
            .from('user_progress')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();
        
        const displayName = profile?.display_name || currentUser.email.split('@')[0];
        document.getElementById('profileName').textContent = displayName;
        document.getElementById('profileEmail').textContent = currentUser.email;
        document.getElementById('profileInitial').textContent = displayName.charAt(0).toUpperCase();
        
        const completedModules = progress?.completed_modules || [];
        const chapterScores = progress?.chapter_scores || {};
        const dragDropStats = progress?.drag_drop_stats || { attempts: 0, correct: 0 };
        
        const totalScore = calculateTotalScore(chapterScores);
        const accuracy = dragDropStats.attempts > 0 
            ? Math.round((dragDropStats.correct / dragDropStats.attempts) * 100) 
            : 0;
        
        document.getElementById('completedModules').textContent = `${completedModules.length} / 5`;
        document.getElementById('totalScore').textContent = `${totalScore} / 500`;
        document.getElementById('dragDropAccuracy').textContent = `${accuracy}%`;
        
        const chapterScoresList = document.getElementById('chapterScoresList');
        chapterScoresList.innerHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            const average = calculateChapterAverage(chapterScores, i);
            const babKey = `bab${i}`;
            const soalScores = chapterScores[babKey] || {};
            const completedSoals = Object.keys(soalScores).length;
            
            const item = document.createElement('div');
            item.className = 'chapter-score-item';
            
            const perfectBadge = average === 100 ? ' <span style="color: #fbbf24;">⭐ Perfect!</span>' : '';
            
            item.innerHTML = `
                <div class="chapter-score-name">
                    Bab ${i}
                    <span style="font-size: 0.85rem; color: var(--text-muted); margin-left: 0.5rem;">
                        (${completedSoals}/5 soal)
                    </span>
                </div>
                <div class="chapter-score-value">${average} / 100${perfectBadge}</div>
            `;
            chapterScoresList.appendChild(item);
            
            const detailDiv = document.createElement('div');
            detailDiv.className = 'chapter-detail';
            detailDiv.style.paddingLeft = '1.5rem';
            detailDiv.style.fontSize = '0.9rem';
            detailDiv.style.color = 'var(--text-muted)';
            detailDiv.style.marginTop = '0.5rem';
            
            let detailHTML = '';
            for (let j = 1; j <= 5; j++) {
                const soalScore = soalScores[`soal${j}`] || 0;
                const soalStatus = soalScore === 100 ? '✓' : soalScore > 0 ? '◯' : '—';
                detailHTML += `
                    <div style="display: flex; justify-content: space-between; padding: 0.25rem 0;">
                        <span>${soalStatus} Soal ${i}.${j}</span>
                        <span style="font-weight: 600; color: ${soalScore === 100 ? '#22c55e' : 'var(--text-primary)'};">
                            ${soalScore}
                        </span>
                    </div>
                `;
            }
            detailDiv.innerHTML = detailHTML;
            chapterScoresList.appendChild(detailDiv);
        }
        
        const summaryDiv = document.createElement('div');
        summaryDiv.style.marginTop = '1.5rem';
        summaryDiv.style.padding = '1rem';
        summaryDiv.style.background = 'var(--primary-dark)';
        summaryDiv.style.borderRadius = '8px';
        summaryDiv.style.textAlign = 'center';
        summaryDiv.innerHTML = `
            <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                Total Nilai Latihan
            </div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--accent-blue);">
                ${totalScore} / 500
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">
                ${((totalScore / 500) * 100).toFixed(1)}% Complete
            </div>
        `;
        chapterScoresList.appendChild(summaryDiv);
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

// ==================== NAVIGATION ====================
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');

    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    const selectedButton = document.querySelector(`[data-page="${pageId}"]`);
    if (selectedButton) selectedButton.classList.add('active');
    
    if (pageId === 'practice') backToChapterSelection();
    if (pageId === 'drag-drop') resetDragExercise();
    if (pageId === 'leaderboard') loadLeaderboard();
    else if (pageId === 'profile') loadProfilePage();
    else if (pageId === 'material') loadUserProgress();
}

function showChapterProblems(chapterNum) {
    document.getElementById('chapter-selection').style.display = 'none';
    document.getElementById('problems-container').style.display = 'block';
    
    const chapterTitles = {
        1: "Bab 1: Fondasi Pemrograman Python",
        2: "Bab 2: Mengontrol Alur Program", 
        3: "Bab 3: Bekerja dengan Kumpulan Data",
        4: "Bab 4: Struktur Data Lanjutan",
        5: "Bab 5: Membuat Kode Modular dengan Fungsi"
    };
    
    document.getElementById('current-chapter-title').textContent = chapterTitles[chapterNum];
    generateProblems(chapterNum);
}

function backToChapterSelection() {
    document.getElementById('chapter-selection').style.display = 'block';
    document.getElementById('problems-container').style.display = 'none';
}

// ==================== PROBLEMS DATA ====================
const problemsData = {
    1: [
        {
            title: "Soal 1.1: Pendapatan Penjual Sayur",
            description: "Seorang pedagang sayur menjual 3 jenis sayur: kangkung, wortel, dan kol. Masukkan jumlah keranjang untuk tiap jenis dan harga per keranjang. Hitung total pendapatan kotor, potong biaya transportasi tetap, dan tampilkan pendapatan bersih.",
            placeholder: "# Soal 1.1 - Pendapatan Penjual Sayur\nkangkung = int(input('Keranjang kangkung: '))\nwortel = int(input('Keranjang wortel: '))\nkol = int(input('Keranjang kol: '))\nharga = float(input('Harga per keranjang (Rp): '))\n# Lengkapi program..."
        },
        {
            title: "Soal 1.2: Konverter Suhu Penangkaran", 
            description: "Peternak butuh bantuan: ia memberi suhu dalam Celcius. Buat program yang membaca suhu Celcius (float), konversi ke Fahrenheit dan Kelvin, lalu tampilkan keduanya.",
            placeholder: "# Soal 1.2 - Konverter Suhu\nc = float(input('Suhu (°C): '))\n# Rumus Fahrenheit: (c * 9/5) + 32\n# Rumus Kelvin: c + 273.15\n# Lengkapi program..."
        },
        {
            title: "Soal 1.3: Daftar Belanja dengan Total & PPN",
            description: "Seorang pembeli memasukkan nama barang, harga, dan jumlah barang. Program menerima 2 barang (sederhana), hitung subtotal, tambah PPN 11%, tampilkan ringkasan.",
            placeholder: "# Soal 1.3 - Daftar Belanja dengan PPN\nnama1 = input('Nama barang 1: ')\nharga1 = float(input('Harga barang 1: Rp '))\njml1 = int(input('Jumlah barang 1: '))\n# Lengkapi untuk barang kedua dan hitung PPN 11%..."
        },
        {
            title: "Soal 1.4: Umur di Tahun Tertentu",
            description: "Seorang siswa memasukkan tahun lahir. Buat program yang meminta juga tahun target (mis. 2030) dan menampilkan umur di tahun target. Validasi: jika tahun target < tahun lahir, tampilkan pesan error.",
            placeholder: "# Soal 1.4 - Hitung Umur di Tahun Target\ntahun_lahir = int(input('Tahun lahir: '))\ntahun_target = int(input('Tahun target: '))\n# Tambahkan validasi dan hitung umur..."
        },
        {
            title: "Soal 1.5: Hitung Rata-rata Nilai Sederhana",
            description: "Guru memasukkan 3 nilai ujian. Buat program menghitung rata-rata (float) dan cetak Lulus jika rata ≥ 60, selain itu Tidak Lulus.",
            placeholder: "# Soal 1.5 - Rata-rata Nilai\na = float(input('Nilai 1: '))\nb = float(input('Nilai 2: '))\nc = float(input('Nilai 3: '))\n# Hitung rata-rata dan tentukan status kelulusan..."
        }
    ],
    2: [
        {
            title: "Soal 2.1: Penentu Indeks Nilai",
            description: "Seorang dosen memiliki daftar nilai akhir mahasiswa. Program membaca satu nilai (0–100) dan tampilkan indeks A/B/C/D/E dengan rentang: A ≥85, B 75–84, C 60–74, D 45–59, E <45. Jika input di luar 0–100, minta ulang (gunakan loop).",
            placeholder: "# Soal 2.1 - Penentu Indeks Nilai\nwhile True:\n    nilai = int(input('Masukkan nilai (0-100): '))\n    if 0 <= nilai <= 100:\n        break\n    print('Nilai tidak valid. Coba lagi.')\n# Tambahkan logika if-elif-else untuk indeks..."
        },
        {
            title: "Soal 2.2: Mesin Cetak Tiket Antrian Bank",
            description: "Petugas memasukkan N (jumlah tiket). Cetak nomor antrian 1..N. Namun setiap 5 tiket cetak garis pemisah. (Gunakan loop)",
            placeholder: "# Soal 2.2 - Mesin Cetak Tiket Antrian\nn = int(input('Berapa tiket? '))\nfor i in range(1, n+1):\n    print(f'Nomor Antrian: {i}')\n    # Tambahkan kondisi untuk garis pemisah setiap 5 tiket..."
        },
        {
            title: "Soal 2.3: Tebak Angka Berulang (Game)",
            description: "Seorang pemain diberi 7 kesempatan menebak angka rahasia (1–100). Program memberi tahu lebih besar / lebih kecil. Jika menang, tampilkan jumlah percobaan; jika habis, tampilkan angka rahasia.",
            placeholder: "# Soal 2.3 - Game Tebak Angka\nimport random\nrahasia = random.randint(1, 100)\nkesempatan = 7\nfor i in range(1, kesempatan+1):\n    # Implementasi game tebak angka..."
        },
        {
            title: "Soal 2.4: Filter Bilangan",
            description: "Seorang analis punya daftar angka (dipisah spasi). Buat program yang menampilkan hanya angka genap dari daftar, dan beritahu total angka genap yang ditemukan.",
            placeholder: "# Soal 2.4 - Filter Bilangan Genap\ndata = input('Masukkan angka dipisah spasi: ')\nangka = [int(x) for x in data.split()]\n# Filter dan tampilkan angka genap..."
        },
        {
            title: "Soal 2.5: Kalkulator Sederhana Menu",
            description: "Buat program menu berulang: 1) Tambah, 2) Kurang, 3) Kali, 4) Bagi, 5) Keluar. Program menerima dua angka tiap operasi dan menampilkan hasil. Loop sampai user pilih Keluar.",
            placeholder: "# Soal 2.5 - Kalkulator Menu\nwhile True:\n    print('1.+ 2.- 3.* 4./ 5.Keluar')\n    pilih = input('Pilih: ')\n    if pilih == '5':\n        break\n    # Implementasi operasi matematika..."
        }
    ],
    3: [
        {
            title: "Soal 3.1: Dekripsi Karakter Kunci",
            description: "Seorang agen menerima pesan (string) dan indeks k. Tulis program yang mencetak karakter di posisi k. Jika indeks invalid, tampilkan pesan yang ramah. Gunakan 0-based index.",
            placeholder: "# Soal 3.1 - Dekripsi Karakter\npesan = input('Pesan: ')\nk = int(input('Indeks k (0-based): '))\n# Cek validitas indeks dan tampilkan karakter..."
        },
        {
            title: "Soal 3.2: Palindrom Manuskrip",
            description: "Arkeolog menemukan kata; program harus cek apakah kata itu palindrom (abaikan huruf besar kecil dan spasi). Tampilkan YA atau TIDAK.",
            placeholder: "# Soal 3.2 - Pengecekan Palindrom\nkata = input('Kata: ').lower().replace(' ', '')\n# Gunakan slicing [::-1] untuk membalik kata..."
        },
        {
            title: "Soal 3.3: Daftar Belanja Interaktif",
            description: "Buat program yang menerima beberapa item (nama:harga) dipisah koma, contoh: susu:10000,roti:5000. Parse menjadi list of tuples, tampilkan total harga dan daftar barang.",
            placeholder: "# Soal 3.3 - Daftar Belanja Interaktif\ndata = input('Masukkan item (nama:harga, ...): ')\nitems = []\ntotal = 0\nfor part in data.split(','):\n    # Parse nama dan harga..."
        },
        {
            title: "Soal 3.4: Hitung Kata Unik",
            description: "Seorang peneliti memberi kalimat panjang. Buat program yang menampilkan berapa banyak kata unik (case-insensitive) ada pada kalimat.",
            placeholder: "# Soal 3.4 - Hitung Kata Unik\nkalimat = input('Kalimat: ').lower()\nkata = [w for w in kalimat.split()]\n# Gunakan set untuk mencari kata unik..."
        },
        {
            title: "Soal 3.5: Urutkan Nilai Mahasiswa",
            description: "Koordinator memasukkan deretan nilai (dipisah spasi). Buat program yang mengurutkan nilai dari besar ke kecil dan menampilkan 3 nilai tertinggi tanpa mengubah daftar asli (gunakan copy).",
            placeholder: "# Soal 3.5 - Urutkan Nilai\ndata = input('Nilai (spasi): ')\nnilai = [int(x) for x in data.split()]\nsalinan = nilai.copy()\n# Urutkan dan ambil 3 tertinggi..."
        }
    ],
    4: [
        {
            title: "Soal 4.1: Buat Peta Grid",
            description: "Desainer ingin peta ukuran R x C. Buat program yang membaca R dan C lalu membuat matriks R×C berisi 0 dan menampilkannya baris per baris.",
            placeholder: "# Soal 4.1 - Generator Peta Grid\nr = int(input('Baris R: '))\nc = int(input('Kolom C: '))\npeta = [[0 for _ in range(c)] for _ in range(r)]\n# Tampilkan peta..."
        },
        {
            title: "Soal 4.2: Papan Tic-Tac-Toe",
            description: "Buat program yang menampilkan papan 3x3 (semua -) dan minta input koordinat (baris,kolom) untuk menaruh simbol X. Tampilkan papan setelah penempatan. (Tiap eksekusi hanya satu langkah).",
            placeholder: "# Soal 4.2 - Papan Tic-Tac-Toe\npapan = [['-' for _ in range(3)] for _ in range(3)]\nfor row in papan:\n    print(' '.join(row))\n# Minta input dan update papan..."
        },
        {
            title: "Soal 4.3: Jumlah Setiap Baris",
            description: "Seorang pelatih punya matriks skor tim (baris=tim, kolom=ronde). Program baca matriks (baris pertama: R C; lalu R baris angka) – tampilkan jumlah skor per tim (per baris).",
            placeholder: "# Soal 4.3 - Jumlah Skor per Tim\nr, c = map(int, input('R C: ').split())\nmat = []\nfor _ in range(r):\n    row = list(map(int, input().split()))\n    mat.append(row)\n# Hitung total per tim..."
        },
        {
            title: "Soal 4.4: Papan Catur",
            description: "Buat program mencetak pola papan catur N x N (input N) dengan # dan spasi bergantian, contoh N=4: # # / # # / # # / # #",
            placeholder: "# Soal 4.4 - Pola Papan Catur\nn = int(input('N: '))\nfor i in range(n):\n    row = ''\n    for j in range(n):\n        # Gunakan modulo untuk pola bergantian..."
        },
        {
            title: "Soal 4.5: Cari Angka di Matriks",
            description: "Seorang operator mencari sebuah nilai X di matriks R×C input. Bila ditemukan, cetak posisi (baris,kolom) pertama yang ditemukan; jika tidak, cetak 'Tidak ditemukan'.",
            placeholder: "# Soal 4.5 - Pencarian di Matriks\nr, c = map(int, input('R C: ').split())\nmat = [list(map(int, input().split())) for _ in range(r)]\nx = int(input('Cari angka X: '))\n# Cari menggunakan nested loop..."
        }
    ],
    5: [
        {
            title: "Soal 5.1: Fungsi Hitung Total Belanja",
            description: "Buat fungsi hitung_total(subtotal) yang menambahkan PPN 11% dan diskon 5% bila subtotal ≥ 500000. Program utama meminta subtotal, memanggil fungsi, dan menampilkan total.",
            placeholder: "# Soal 5.1 - Fungsi Hitung Total Belanja\ndef hitung_total(subtotal):\n    '''Hitung total dengan PPN 11% dan diskon 5% jika subtotal >= 500000'''\n    ppn = 0.11 * subtotal\n    total = subtotal + ppn\n    # Tambahkan logika diskon...\n    return total\n\n# Program utama\nsubtotal = float(input('Subtotal: Rp '))\nprint(f'Total bayar: Rp {hitung_total(subtotal):,.2f}')"
        },
        {
            title: "Soal 5.2: Cek Usia Pendaftar",
            description: "Buat fungsi cek_umur(umur, minimal=15) mengembalikan True/False. Dalam program utama, baca umur dan tampilkan pesan sesuai hasil fungsi.",
            placeholder: "# Soal 5.2 - Cek Usia Pendaftar\ndef cek_umur(umur, minimal=15):\n    return umur >= minimal\n\numur = int(input('Umur: '))\nif cek_umur(umur):\n    print('Memenuhi syarat.')\nelse:\n    print('Belum memenuhi syarat.')"
        },
        {
            title: "Soal 5.3: Modul Kalkulator Serbaguna",
            description: "Buat fungsi kalkulator(a, b, op) yang menerima operasi + - * / dan menangani pembagian oleh nol dan operasi tidak dikenal (kembalikan string error). Program utama baca a,b,op lalu tampil.",
            placeholder: "# Soal 5.3 - Kalkulator Serbaguna\ndef kalkulator(a, b, op):\n    if op == '+':\n        return a + b\n    elif op == '-':\n        return a - b\n    # Lengkapi untuk *, / dan error handling...\n\na = float(input('A: '))\nb = float(input('B: '))\nop = input('Operasi (+-*/): ')\nprint(kalkulator(a, b, op))"
        },
        {
            title: "Soal 5.4: Refactor Tic-Tac-Toe dengan Fungsi",
            description: "Refactor bagian ganti_giliran dan cetak_papan sebagai fungsi. Buat program sederhana yang membuat papan 3x3, memanggil cetak_papan, minta input sekali, ganti giliran menggunakan fungsi lalu cetak papan.",
            placeholder: "# Soal 5.4 - Tic-Tac-Toe dengan Fungsi\ndef cetak_papan(papan):\n    for row in papan:\n        print(' | '.join(row))\n\ndef ganti_giliran(g):\n    return 'O' if g == 'X' else 'X'\n\npapan = [['-' for _ in range(3)] for _ in range(3)]\ngiliran = 'X'\n# Gunakan fungsi untuk cetak dan ganti giliran..."
        },
        {
            title: "Soal 5.5: Fungsi Rata-rata List dengan Validasi",
            description: "Buat fungsi rata2(nums) yang menerima list angka. Jika list kosong, kembalikan None. Program utama baca angka (spasi), panggil fungsi, lalu tampilkan hasil atau pesan kalau data kosong.",
            placeholder: "# Soal 5.5 - Fungsi Rata-rata dengan Validasi\ndef rata2(nums):\n    if not nums:\n        return None\n    return sum(nums) / len(nums)\n\ndata = input('Masukkan angka (spasi): ').strip()\nif data == '':\n    nums = []\nelse:\n    nums = [float(x) for x in data.split()]\n# Gunakan fungsi dan tampilkan hasil..."
        }
    ]
};

function generateProblems(chapterNum) {
    const container = document.getElementById('dynamic-problems');
    container.innerHTML = '';
    const problems = problemsData[chapterNum];
    problems.forEach((problem, index) => {
        const problemId = `${chapterNum}-${index + 1}`;
        const problemElement = createProblemElement(problem, problemId, chapterNum);
        container.appendChild(problemElement);
    });
}

function createProblemElement(problem, problemId, chapterNum) {
    const problemDiv = document.createElement('div');
    problemDiv.className = 'problem-item';
    problemDiv.innerHTML = `
        <div class="problem-header">
            <h3 class="problem-title">${problem.title}</h3>
            <div class="problem-description">${problem.description}</div>
        </div>
        <div class="code-workspace">
            <div class="code-editor-section">
                <div class="editor-toolbar">
                    <span>Python Editor</span>
                    <span>Bab ${chapterNum}</span>
                </div>
                <textarea class="code-editor" id="editor-${problemId}" placeholder="${problem.placeholder}"></textarea>
            </div>
            <div class="output-section">
                <div class="editor-toolbar">
                    <span>Output Console</span>
                    <span>Hasil Eksekusi</span>
                </div>
                <div class="output-display" id="output-${problemId}">Tekan tombol "Jalankan Kode" untuk melihat hasil...</div>
            </div>
        </div>
        <div class="control-bar">
            <button class="run-button" onclick="runCode('${problemId}')">
                <span>▶</span>
                <span>Jalankan Kode</span>
            </button>
            <button class="reset-button" onclick="resetCode('${problemId}')">Reset</button>
            <div class="score-badge" id="score-${problemId}">Skor: 0/100</div>
        </div>
    `;
    return problemDiv;
}

function playVideo(chapterNumber) {
    const videoLinks = {
        1: "https://www.youtube.com/watch?v=gxmTFXfrMzk",
        2: "https://www.youtube.com/watch?v=Hqndpzj0ZFg",
        3: "https://www.youtube.com/watch?v=MPvC9uWATLI",
        4: "https://www.youtube.com/watch?v=6VDCFBKyn7Y",
        5: "https://www.youtube.com/watch?v=wQwf5eKpxqs"
    };
    if (videoLinks[chapterNumber]) {
        window.open(videoLinks[chapterNumber], "_blank");
    }
}

// ==================== CODE EXECUTION ====================
async function runCode(problemId) {
    const editor = document.getElementById(`editor-${problemId}`);
    const output = document.getElementById(`output-${problemId}`);
    const scoreDisplay = document.getElementById(`score-${problemId}`);
    const code = editor.value.trim();
    
    if (!code) {
        showMessage(output, 'error', 'Kode kosong!');
        return;
    }
    
    const runButton = event.target.closest('.run-button');
    runButton.disabled = true;
    runButton.innerHTML = '<span>⏳</span><span>Menjalankan...</span>';
    
    setTimeout(async () => {
        const result = simulatePythonExecution(code, problemId);
        output.innerHTML = result.output;
        
        const score = calculateScore(code, problemId);
        scoreDisplay.textContent = `Skor: ${score}/100`;
        
        if (score >= 70) scoreDisplay.style.background = 'var(--gradient-accent)';
        else if (score >= 40) scoreDisplay.style.background = 'var(--text-muted)';
        else scoreDisplay.style.background = '#ef4444';
        
        runButton.disabled = false;
        runButton.innerHTML = '<span>▶</span><span>Jalankan Kode</span>';
        
        if (score >= 70) showMessage(output, 'success', 'Excellent!');
        
        const [chapter, problem] = problemId.split('-').map(Number);
        await saveChapterScore(chapter, problem, score);
    }, 1500);
}

function simulatePythonExecution(code, problemId) {
    let output = '';
    const [chapter, problem] = problemId.split('-').map(Number);
    
    try {
        switch(chapter) {
            case 1: output = simulateChapter1(code, problem); break;
            case 2: output = simulateChapter2(code, problem); break;
            case 3: output = simulateChapter3(code, problem); break;
            case 4: output = simulateChapter4(code, problem); break;
            case 5: output = simulateChapter5(code, problem); break;
        }
        if (!output) output = 'Kode belum lengkap atau tidak sesuai dengan soal.';
    } catch (error) {
        output = `Error: ${error.message}`;
    }
    return { output };
}

// ==================== SIMULATION FUNCTIONS ====================
function simulateChapter1(code, problem) {
    const lowerCode = code.toLowerCase();
    
    switch(problem) {
        case 1:
            if (lowerCode.includes('kangkung') && lowerCode.includes('wortel') && 
                lowerCode.includes('kol') && lowerCode.includes('harga') && 
                lowerCode.includes('input') && lowerCode.includes('print')) {
                return `✅ Simulasi Soal 1.1:\nKeranjang kangkung: 2\nKeranjang wortel: 3\nKeranjang kol: 1\nHarga per keranjang (Rp): 50000\nBiaya transportasi (Rp): 20000\n\nTotal keranjang: 6\nPendapatan kotor: Rp 300,000.00\nPendapatan bersih: Rp 280,000.00`;
            }
            break;
        case 2:
            if ((lowerCode.includes('9/5') || lowerCode.includes('9 / 5')) && 
                lowerCode.includes('273.15') && lowerCode.includes('input')) {
                return `✅ Simulasi Soal 1.2:\nSuhu (°C): 25\n25.0 °C = 77.00 °F = 298.15 K`;
            }
            break;
        case 3:
            if (lowerCode.includes('0.11') && lowerCode.includes('ppn') && 
                lowerCode.includes('subtotal') && lowerCode.includes('total')) {
                return `✅ Simulasi Soal 1.3:\nNama barang 1: Buku\nHarga barang 1: Rp 50000\nJumlah barang 1: 2\nNama barang 2: Pensil\nHarga barang 2: Rp 5000\nJumlah barang 2: 5\n\nSubtotal: Rp 125,000.00\nPPN 11%: Rp 13,750.00\nTotal bayar: Rp 138,750.00`;
            }
            break;
        case 4:
            if (lowerCode.includes('tahun_lahir') && lowerCode.includes('tahun_target') && 
                lowerCode.includes('if') && (lowerCode.includes('<') || lowerCode.includes('>'))) {
                return `✅ Simulasi Soal 1.4:\nTahun lahir: 2000\nTahun target: 2025\nUmur pada tahun 2025: 25 tahun\n\nSimulasi dengan error:\nTahun lahir: 2010\nTahun target: 2005\nError: Tahun target harus >= tahun lahir`;
            }
            break;
        case 5:
            if ((lowerCode.includes('/ 3') || lowerCode.includes('/3')) && 
                (lowerCode.includes('rata') || lowerCode.includes('average')) && 
                lowerCode.includes('60') && lowerCode.includes('if')) {
                return `✅ Simulasi Soal 1.5:\nNilai 1: 80\nNilai 2: 70\nNilai 3: 85\nRata-rata: 78.33\nLulus\n\nSimulasi kedua:\nNilai 1: 45\nNilai 2: 50\nNilai 3: 55\nRata-rata: 50.00\nTidak Lulus`;
            }
            break;
    }
    return '';
}

function simulateChapter2(code, problem) {
    const lowerCode = code.toLowerCase();
    
    switch(problem) {
        case 1:
            if (lowerCode.includes('while') && lowerCode.includes('elif') && 
                lowerCode.includes('indeks') && lowerCode.includes('break')) {
                return `✅ Simulasi Soal 2.1:\nMasukkan nilai (0-100): 150\nNilai tidak valid. Coba lagi.\nMasukkan nilai (0-100): 87\nIndeks: A`;
            }
            break;
        case 2:
            if (lowerCode.includes('range') && lowerCode.includes('% 5') && 
                (lowerCode.includes('istirahat') || lowerCode.includes('garis') || lowerCode.includes('-----'))) {
                return `✅ Simulasi Soal 2.2:\nBerapa tiket? 7\nNomor Antrian: 1\nNomor Antrian: 2\nNomor Antrian: 3\nNomor Antrian: 4\nNomor Antrian: 5\n----- Istirahat Operator -----\nNomor Antrian: 6\nNomor Antrian: 7`;
            }
            break;
        case 3:
            if (lowerCode.includes('random') && lowerCode.includes('rahasia') && 
                (lowerCode.includes('tebakan') || lowerCode.includes('tebak')) && lowerCode.includes('kesempatan')) {
                return `✅ Simulasi Soal 2.3:\nAngka rahasia: 42\nTebakan ke-1: 50\nTerlalu besar.\nTebakan ke-2: 40\nTerlalu kecil.\nTebakan ke-3: 42\nBenar! Tebakan ke-3`;
            }
            break;
        case 4:
            if (lowerCode.includes('split()') && lowerCode.includes('% 2') && 
                lowerCode.includes('genap')) {
                return `✅ Simulasi Soal 2.4:\nMasukkan angka dipisah spasi: 1 2 3 4 5 6 7 8\nAngka genap: [2, 4, 6, 8]\nTotal genap: 4`;
            }
            break;
        case 5:
            if (lowerCode.includes('while true') && lowerCode.includes('break') && 
                (lowerCode.includes('elif') || lowerCode.includes('else'))) {
                return `✅ Simulasi Soal 2.5:\n1.+ 2.- 3.* 4./ 5.Keluar\nPilih: 1\nAngka 1: 10\nAngka 2: 5\n15.0\n1.+ 2.- 3.* 4./ 5.Keluar\nPilih: 5\nTerima kasih.`;
            }
            break;
    }
    return '';
}

function simulateChapter3(code, problem) {
    const lowerCode = code.toLowerCase();
    
    switch(problem) {
        case 1:
            if (lowerCode.includes('len(') && lowerCode.includes('pesan') && 
                lowerCode.includes('if')) {
                return `✅ Simulasi Soal 3.1:\nPesan: HELLO\nIndeks k (0-based): 1\nKarakter: 'E'\n\nSimulasi dengan error:\nPesan: HELLO\nIndeks k (0-based): 10\nIndeks tidak valid.`;
            }
            break;
        case 2:
            if (lowerCode.includes('[::-1]') && lowerCode.includes('lower()') && 
                (lowerCode.includes('ya') || lowerCode.includes('tidak'))) {
                return `✅ Simulasi Soal 3.2:\nKata: KATAK\nYA\n\nSimulasi kedua:\nKata: PYTHON\nTIDAK`;
            }
            break;
        case 3:
            if (lowerCode.includes('split(\',\')') && lowerCode.includes('split(\':\')') && 
                lowerCode.includes('total')) {
                return `✅ Simulasi Soal 3.3:\nMasukkan item (nama:harga, ...): susu:15000,roti:8000,telur:25000\nDaftar: [('susu', 15000.0), ('roti', 8000.0), ('telur', 25000.0)]\nTotal: Rp 48,000.00`;
            }
            break;
        case 4:
            if (lowerCode.includes('set') && (lowerCode.includes('unik') || lowerCode.includes('unique')) && 
                lowerCode.includes('split()')) {
                return `✅ Simulasi Soal 3.4:\nKalimat: Python adalah bahasa pemrograman yang mudah dipelajari dan Python sangat populer\nJumlah kata unik: 8`;
            }
            break;
        case 5:
            if (lowerCode.includes('copy()') && lowerCode.includes('sort') && 
                (lowerCode.includes('reverse=true') || lowerCode.includes('[:3]'))) {
                return `✅ Simulasi Soal 3.5:\nNilai (spasi): 78 92 65 88 79 95 73\nTop 3: [95, 92, 88]`;
            }
            break;
    }
    return '';
}

function simulateChapter4(code, problem) {
    const lowerCode = code.toLowerCase();
    
    switch(problem) {
        case 1:
            if (lowerCode.includes('[[0') && lowerCode.includes('range(c)') && 
                lowerCode.includes('range(r)')) {
                return `✅ Simulasi Soal 4.1:\nBaris R: 3\nKolom C: 4\n[0, 0, 0, 0]\n[0, 0, 0, 0]\n[0, 0, 0, 0]`;
            }
            break;
        case 2:
            if ((lowerCode.includes('[[\'-\'') || lowerCode.includes('[[\"-\"]')) && 
                lowerCode.includes('join') && lowerCode.includes('papan')) {
                return `✅ Simulasi Soal 4.2:\nPapan awal:\n- - -\n- - -\n- - -\nBaris (0-2): 1\nKolom (0-2): 1\nPapan setelah move:\n- - -\n- X -\n- - -`;
            }
            break;
        case 3:
            if (lowerCode.includes('sum(row)') && lowerCode.includes('enumerate')) {
                return `✅ Simulasi Soal 4.3:\nR C: 3 4\n10 20 30 40\n15 25 35 45\n5 10 15 20\nTotal tim 1: 100\nTotal tim 2: 120\nTotal tim 3: 50`;
            }
            break;
        case 4:
            if (lowerCode.includes('(i + j) % 2') && (lowerCode.includes('"# "') || lowerCode.includes('\'# \'')) && 
                lowerCode.includes('range(n)')) {
                return `✅ Simulasi Soal 4.4:\nN: 4\n# # \n # #\n# # \n # #`;
            }
            break;
        case 5:
            if (lowerCode.includes('mat[i][j]') && lowerCode.includes('found') && 
                lowerCode.includes('break')) {
                return `✅ Simulasi Soal 4.5:\nR C: 3 3\n1 2 3\n4 5 6\n7 8 9\nCari angka X: 5\nDitemukan di: 1, 1\n\nSimulasi tidak ditemukan:\nCari angka X: 15\nTidak ditemukan`;
            }
            break;
    }
    return '';
}

function simulateChapter5(code, problem) {
    const lowerCode = code.toLowerCase();
    
    switch(problem) {
        case 1:
            if (lowerCode.includes('def hitung_total') && lowerCode.includes('0.11') && 
                lowerCode.includes('500000') && lowerCode.includes('return')) {
                return `✅ Simulasi Soal 5.1:\nSubtotal: Rp 600000\nTotal bayar: Rp 632,700.00\n(Dengan diskon 5% karena >= 500000)\n\nSimulasi tanpa diskon:\nSubtotal: Rp 200000\nTotal bayar: Rp 222,000.00`;
            }
            break;
        case 2:
            if (lowerCode.includes('def cek_umur') && lowerCode.includes('minimal=15') && 
                lowerCode.includes('return')) {
                return `✅ Simulasi Soal 5.2:\nUmur: 17\nMemenuhi syarat.\n\nSimulasi kedua:\nUmur: 12\nBelum memenuhi syarat.`;
            }
            break;
        case 3:
            if (lowerCode.includes('def kalkulator') && lowerCode.includes('error') && 
                lowerCode.includes('return') && lowerCode.includes('elif')) {
                return `✅ Simulasi Soal 5.3:\nA: 10\nB: 3\nOperasi (+-*/): +\n13.0\n\nSimulasi pembagian nol:\nA: 10\nB: 0\nOperasi (+-*/): /\nError: pembagian 0`;
            }
            break;
        case 4:
            if (lowerCode.includes('def cetak_papan') && lowerCode.includes('def ganti_giliran') && 
                (lowerCode.includes('\'|\'') || lowerCode.includes('\"|\"'))) {
                return `✅ Simulasi Soal 5.4:\nPapan awal:\n- | - | -\n- | - | -\n- | - | -\nBaris: 0\nKolom: 0\nPapan setelah move:\nX | - | -\n- | - | -\n- | - | -\nGiliran selanjutnya: O`;
            }
            break;
        case 5:
            if (lowerCode.includes('def rata2') && lowerCode.includes('if not nums') && 
                lowerCode.includes('return none')) {
                return `✅ Simulasi Soal 5.5:\nMasukkan angka (spasi): 10 20 30 40 50\nRata-rata: 30.00\n\nSimulasi data kosong:\nMasukkan angka (spasi): \nTidak ada data.`;
            }
            break;
    }
    return '';
}

// ==================== SCORING ====================
function calculateScore(code, problemId) {
    let score = 0;
    const [chapter, problem] = problemId.split('-').map(Number);
    const requirements = getRequirements(chapter, problem);
    const lowerCode = code.toLowerCase();
    
    requirements.forEach(req => {
        if (lowerCode.includes(req.keyword.toLowerCase())) {
            score += req.points;
        }
    });
    
    if (code.includes('#')) score += 5;
    if (code.includes('print(f')) score += 5;
    
    return Math.min(score, 100);
}

function getRequirements(chapter, problem) {
    const reqs = {
        1: {
            1: [{keyword: 'kangkung', points: 15}, {keyword: 'wortel', points: 15}, {keyword: 'kol', points: 10}, 
                {keyword: 'input', points: 15}, {keyword: 'int(', points: 10}, {keyword: 'float(', points: 10}, {keyword: 'print', points: 15}],
            2: [{keyword: '9/5', points: 25}, {keyword: '273.15', points: 25}, {keyword: 'float(', points: 20}, 
                {keyword: 'input', points: 15}, {keyword: 'print', points: 10}],
            3: [{keyword: '0.11', points: 25}, {keyword: 'ppn', points: 20}, {keyword: 'subtotal', points: 15}, 
                {keyword: 'total', points: 15}, {keyword: 'input', points: 10}, {keyword: 'print', points: 10}],
            4: [{keyword: 'tahun_lahir', points: 15}, {keyword: 'tahun_target', points: 15}, {keyword: 'if', points: 20}, 
                {keyword: '<', points: 15}, {keyword: 'else', points: 15}, {keyword: 'print', points: 15}],
            5: [{keyword: 'rata', points: 25}, {keyword: '60', points: 20}, 
                {keyword: '>=', points: 20}, {keyword: 'if', points: 20}, {keyword: 'print', points: 15}]
        },
        2: {
            1: [{keyword: 'while', points: 20}, {keyword: 'elif', points: 20}, {keyword: 'indeks', points: 15}, 
                {keyword: '>=', points: 15}, {keyword: 'break', points: 15}, {keyword: '0 <=', points: 10}],
            2: [{keyword: 'range', points: 20}, {keyword: '% 5', points: 25}, {keyword: 'istirahat', points: 15}, 
                {keyword: 'for', points: 15}, {keyword: 'if', points: 15}],
            3: [{keyword: 'random', points: 20}, {keyword: 'rahasia', points: 15}, {keyword: 'kesempatan', points: 15}, 
                {keyword: 'tebakan', points: 15}, {keyword: 'elif', points: 15}, {keyword: 'break', points: 15}],
            4: [{keyword: 'split()', points: 20}, {keyword: '% 2', points: 25}, {keyword: 'genap', points: 15}, 
                {keyword: '[', points: 15}, {keyword: 'len', points: 15}],
            5: [{keyword: 'while true', points: 25}, {keyword: 'break', points: 25}, {keyword: 'elif', points: 20}, 
                {keyword: 'float', points: 15}, {keyword: 'input', points: 15}]
        },
        3: {
            1: [{keyword: 'len(', points: 25}, {keyword: 'pesan', points: 20}, {keyword: 'if', points: 15}, 
                {keyword: '<=', points: 15}, {keyword: 'else', points: 15}],
            2: [{keyword: '[::-1]', points: 35}, {keyword: 'lower()', points: 25}, {keyword: 'ya', points: 20}, 
                {keyword: 'if', points: 10}, {keyword: '==', points: 10}],
            3: [{keyword: "split(',')", points: 25}, {keyword: "split(':')", points: 25}, {keyword: 'total', points: 20}, 
                {keyword: 'for', points: 15}, {keyword: 'append', points: 15}],
            4: [{keyword: 'set', points: 30}, {keyword: 'unik', points: 20}, {keyword: 'split()', points: 20}, 
                {keyword: 'lower()', points: 15}, {keyword: 'len', points: 10}],
            5: [{keyword: 'copy()', points: 25}, {keyword: 'sort', points: 25}, {keyword: 'reverse=true', points: 20}, 
                {keyword: '[:3]', points: 15}, {keyword: 'split()', points: 10}]
        },
        4: {
            1: [{keyword: '[[0', points: 25}, {keyword: 'range(c)', points: 20}, {keyword: 'range(r)', points: 20}, 
                {keyword: 'for', points: 20}, {keyword: 'print', points: 10}],
            2: [{keyword: "[['-'", points: 20}, {keyword: 'join', points: 20}, {keyword: 'papan', points: 20}, 
                {keyword: 'int(input', points: 20}, {keyword: 'for row', points: 15}],
            3: [{keyword: 'sum(row)', points: 25}, {keyword: 'enumerate', points: 25}, {keyword: 'map(int', points: 20}, 
                {keyword: 'append', points: 15}, {keyword: 'for', points: 10}],
            4: [{keyword: '(i + j) % 2', points: 35}, {keyword: '# ', points: 25}, {keyword: 'range(n)', points: 20}, 
                {keyword: 'for i', points: 10}, {keyword: 'for j', points: 10}],
            5: [{keyword: 'mat[i][j]', points: 25}, {keyword: 'found', points: 20}, {keyword: 'break', points: 20}, 
                {keyword: 'for i in range', points: 15}, {keyword: 'for j in range', points: 15}]
        },
        5: {
            1: [{keyword: 'def hitung_total', points: 25}, {keyword: '0.11', points: 20}, {keyword: '500000', points: 20}, 
                {keyword: 'return', points: 20}, {keyword: 'if', points: 10}],
            2: [{keyword: 'def cek_umur', points: 25}, {keyword: 'minimal=15', points: 25}, {keyword: 'return', points: 20}, 
                {keyword: '>=', points: 15}, {keyword: 'if', points: 10}],
            3: [{keyword: 'def kalkulator', points: 25}, {keyword: 'error', points: 20}, {keyword: 'return', points: 20}, 
                {keyword: 'elif', points: 15}, {keyword: 'if', points: 15}],
            4: [{keyword: 'def cetak_papan', points: 20}, {keyword: 'def ganti_giliran', points: 20}, {keyword: '|', points: 20}, 
                {keyword: 'return', points: 20}, {keyword: 'for row', points: 15}],
            5: [{keyword: 'def rata2', points: 25}, {keyword: 'if not nums', points: 25}, {keyword: 'return none', points: 20}, 
                {keyword: 'sum', points: 15}, {keyword: 'len', points: 10}]
        }
    };
    return reqs[chapter]?.[problem] || [];
}

function resetCode(problemId) {
    const editor = document.getElementById(`editor-${problemId}`);
    const output = document.getElementById(`output-${problemId}`);
    const scoreDisplay = document.getElementById(`score-${problemId}`);
    
    editor.value = '';
    output.textContent = 'Tekan tombol "Jalankan Kode" untuk melihat hasil...';
    scoreDisplay.textContent = 'Skor: 0/100';
    scoreDisplay.style.background = 'var(--gradient-accent)';
}

function showMessage(container, type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    container.insertBefore(messageDiv, container.firstChild);
    setTimeout(() => {
        if (messageDiv.parentNode) messageDiv.parentNode.removeChild(messageDiv);
    }, 5000);
}

// ==================== DRAG & DROP ====================
// ==================== DRAG & DROP ====================
let draggedElement = null;
let isDragInitialized = false;

const dragDropProblems = [
    {
        title: "Menyusun Fungsi Hitung Rata-rata",
        blocks: [
            {id:'1',code:'def hitung_rata(nilai):'},
            {id:'2',code:'    total = sum(nilai)'},
            {id:'3',code:'    return total / len(nilai)'},
            {id:'4',code:'nilai_siswa = [80, 90, 75, 85]'},
            {id:'5',code:'print(f"Rata-rata: {hitung_rata(nilai_siswa)}")'}
        ],
        correctOrder: ['4','1','2','3','5'],
        hint: "variabel → fungsi → panggil"
    },
    {
        title: "Loop dengan Kondisi",
        blocks: [
            {id:'1',code:'for i in range(5):'},
            {id:'2',code:'    if i % 2 == 0:'},
            {id:'3',code:'        print("Genap")'},
            {id:'4',code:'    print(f"Angka: {i}")'}
        ],
        correctOrder: ['1','2','3','4'],
        hint: "loop → if → aksi"
    }
];
let currentProblemIndex = 0;

// ✅ EVENT HANDLERS (Desktop)
function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.drag-zone').forEach(zone => {
        zone.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    if (this.classList.contains('drag-zone')) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    if (this.classList.contains('drag-zone')) {
        this.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    
    if (!draggedElement) return;
    
    this.classList.remove('drag-over');
    
    // Hapus empty message jika ada
    const emptyMsg = this.querySelector('.empty-message');
    if (emptyMsg) emptyMsg.remove();
    
    // Clone element
    const clone = draggedElement.cloneNode(true);
    
    // ✅ ATTACH SEMUA EVENT KE CLONE (Desktop + Touch)
    attachEventListeners(clone);
    
    // Append ke drop zone
    this.appendChild(clone);
    
    // Hapus original jika dari solution area
    if (draggedElement.parentElement && draggedElement.parentElement.id === 'solution-area') {
        draggedElement.remove();
    }
    
    draggedElement = null;
}

// ✅ EVENT HANDLERS (Mobile/Touch)
let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(e) {
    e.preventDefault();
    draggedElement = this;
    this.classList.add('dragging');
    
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    
    this.style.opacity = '0.5';
    this.style.transform = 'scale(1.05)';
}

function handleTouchMove(e) {
    e.preventDefault();
    
    if (!draggedElement) return;
    
    const touch = e.touches[0];
    
    // Visual feedback: highlight drop zone
    const dropZone = document.getElementById('solution-area');
    const rect = dropZone.getBoundingClientRect();
    
    if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
        touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        dropZone.classList.add('drag-over');
    } else {
        dropZone.classList.remove('drag-over');
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    
    if (!draggedElement) return;
    
    const touch = e.changedTouches[0];
    const dropZone = document.getElementById('solution-area');
    const rect = dropZone.getBoundingClientRect();
    
    draggedElement.style.opacity = '';
    draggedElement.style.transform = '';
    draggedElement.classList.remove('dragging');
    dropZone.classList.remove('drag-over');
    
    // Check if dropped in valid zone
    if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
        touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        
        const emptyMsg = dropZone.querySelector('.empty-message');
        if (emptyMsg) emptyMsg.remove();
        
        const clone = draggedElement.cloneNode(true);
        
        // ✅ ATTACH EVENT KE CLONE
        attachEventListeners(clone);
        
        dropZone.appendChild(clone);
        
        if (draggedElement.parentElement && draggedElement.parentElement.id === 'solution-area') {
            draggedElement.remove();
        }
    }
    
    draggedElement = null;
}

// ✅ FUNGSI HELPER: ATTACH SEMUA EVENT LISTENER
function attachEventListeners(element) {
    // Desktop drag events
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragend', handleDragEnd);
    
    // Mobile touch events
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });
}

// ✅ FUNGSI HELPER: REMOVE SEMUA EVENT LISTENER
function removeEventListeners(element) {
    // Desktop
    element.removeEventListener('dragstart', handleDragStart);
    element.removeEventListener('dragend', handleDragEnd);
    
    // Mobile
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchmove', handleTouchMove);
    element.removeEventListener('touchend', handleTouchEnd);
}

// ✅ INITIALIZE DRAG & DROP (Dipanggil saat page load & reset)
function initDragAndDrop() {
    if (isDragInitialized) {
        console.log('⚠️ Drag & Drop already initialized, skipping...');
        return;
    }
    
    console.log('✅ Initializing Drag & Drop...');
    
    // Attach event ke semua code blocks
    document.querySelectorAll('.code-block').forEach(attachEventListeners);
    
    // Attach event ke drop zones
    document.querySelectorAll('.drag-zone').forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
    });
    
    isDragInitialized = true;
}

// ✅ CLEANUP (Dipanggil sebelum reset)
function cleanupDragAndDrop() {
    console.log('🧹 Cleaning up Drag & Drop events...');
    
    // Remove event dari code blocks
    document.querySelectorAll('.code-block').forEach(removeEventListeners);
    
    // Remove event dari drop zones
    document.querySelectorAll('.drag-zone').forEach(zone => {
        zone.removeEventListener('dragover', handleDragOver);
        zone.removeEventListener('drop', handleDrop);
        zone.removeEventListener('dragenter', handleDragEnter);
        zone.removeEventListener('dragleave', handleDragLeave);
    });
    
    isDragInitialized = false;
}

// ✅ CHECK SOLUTION
async function checkDragSolution() {
    const blocks = document.getElementById('solution-area').querySelectorAll('.code-block');
    const feedback = document.getElementById('drag-feedback');
    
    if (blocks.length === 0) {
        feedback.textContent = '❌ Belum ada kode! Drag blok ke area solusi.';
        feedback.className = 'feedback-area show incorrect';
        return;
    }

    const userOrder = Array.from(blocks).map(b => b.dataset.id);
    const problem = dragDropProblems[currentProblemIndex];
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(problem.correctOrder);
    
    if (isCorrect) {
        feedback.textContent = '🎉 Sempurna! Urutan kode sudah benar!';
        feedback.className = 'feedback-area show correct';
        
        blocks.forEach((block, index) => {
            setTimeout(() => {
                block.style.animation = 'pulse 0.5s ease';
            }, index * 100);
        });
        
        await updateDragDropStats(true);
    } else {
        feedback.textContent = `❌ Belum tepat. Hint: ${problem.hint}`;
        feedback.className = 'feedback-area show incorrect';
        await updateDragDropStats(false);
    }
}

// ✅ RESET EXERCISE
function resetDragExercise() {
    console.log('🔄 Resetting Drag & Drop exercise...');
    
    // Cleanup event listeners lama
    cleanupDragAndDrop();
    
    // Pilih problem random
    currentProblemIndex = Math.floor(Math.random() * dragDropProblems.length);
    const problem = dragDropProblems[currentProblemIndex];
    
    // Update title
    document.querySelector('#drag-drop .page-title').textContent = `Latihan Drag & Drop - ${problem.title}`;
    
    // Clear solution area
    const solutionArea = document.getElementById('solution-area');
    solutionArea.innerHTML = '<h3>Area Solusi (Drag di sini)</h3><p class="empty-message">Drag blok kode ke sini untuk menyusun program</p>';
    
    // Clear feedback
    document.getElementById('drag-feedback').className = 'feedback-area';
    document.getElementById('drag-feedback').textContent = '';
    
    // Regenerate code blocks
    const codeBlocksArea = document.getElementById('code-blocks');
    codeBlocksArea.innerHTML = '<h3>Blok Kode Tersedia</h3>';
    
    const shuffled = [...problem.blocks].sort(() => Math.random() - 0.5);
    shuffled.forEach(item => {
        const block = document.createElement('div');
        block.className = 'code-block';
        block.draggable = true;
        block.dataset.id = item.id;
        block.innerHTML = `<code>${item.code}</code>`;
        codeBlocksArea.appendChild(block);
    });
    
    // ✅ RE-INITIALIZE (dengan delay kecil untuk DOM update)
    setTimeout(() => {
        initDragAndDrop();
    }, 100);
}

// ==================== CANVAS ====================
const canvas = document.getElementById('sortCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let array = [];
let comparisons = 0;
let swaps = 0;
let isSorting = false;

function generateRandomArray() {
    if (isSorting) return;
    array = [];
    for (let i = 0; i < 40; i++) array.push(Math.floor(Math.random() * 350) + 20);
    comparisons = 0;
    swaps = 0;
    updateStats();
    drawArray();
    document.getElementById('sortStatus').textContent = 'Siap';
}

function drawArray(colorArray = []) {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / array.length;
    for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = colorArray[i] || '#3b82f6';
        ctx.fillRect(i * barWidth, canvas.height - array[i], barWidth - 2, array[i]);
    }
}

function updateStats() {
    document.getElementById('comparisons').textContent = comparisons;
    document.getElementById('swaps').textContent = swaps;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (!isSorting) return;
            comparisons++;
            updateStats();
            drawArray(array.map((_, idx) => idx === j || idx === j + 1 ? '#ef4444' : '#3b82f6'));
            await sleep(50);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swaps++;
            }
        }
    }
    drawArray(array.map(() => '#22c55e'));
}

async function startSorting() {
    if (isSorting || array.length === 0) return;
    isSorting = true;
    document.getElementById('sortStatus').textContent = 'Sorting...';
    await bubbleSort();
    isSorting = false;
    document.getElementById('sortStatus').textContent = 'Selesai!';
}

function resetCanvas() {
    isSorting = false;
    generateRandomArray();
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initSupabase();
    
    document.querySelectorAll('.code-editor').forEach(editor => {
        editor.addEventListener('input', function() {
            this.style.color = 'var(--text-primary)';
        });
    });

    if (document.querySelector('.code-block')) {
        resetDragExercise();
    }
    
    if (canvas) {
        generateRandomArray();
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            const activeEditor = document.activeElement;
            if (activeEditor && activeEditor.classList.contains('code-editor')) {
                const problemId = activeEditor.id.split('-').slice(1).join('-');
                runCode(problemId);
            }
            e.preventDefault();
        }
    });
});