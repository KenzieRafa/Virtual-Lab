import { supabaseClient, isSupabaseEnabled, loadUserProfile, getCurrentUser, setCurrentUser, updateUIForAuthenticatedUser, updateUIForGuestUser, currentUser } from "./supabase.js";
import { loadUserProgress } from './progress.js';
import { showWelcomeModal, closeWelcomeModal } from "./welcome.js";

export function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
    }
    clearAuthMessage();
}

export async function signIn() {
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
        
        setCurrentUser(data.user);
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

export async function signUp() {
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
            closeAuthModal();
            alert(`✅ Pendaftaran Berhasil!\n\n📧 Kami telah mengirim email konfirmasi ke:\n${email}\n\nSilakan buka email Anda dan klik link konfirmasi sebelum Sign In.\n\n⚠️ Cek folder Spam jika tidak ada di Inbox.`);
        }
    } catch (error) {
        showAuthMessage(error.message, 'error');
    }
}

export async function signOut() {
    if (!isSupabaseEnabled) return;
    try {
        await supabaseClient.auth.signOut();
        setCurrentUser(null);
        updateUIForGuestUser();
        showPage('home');
        alert('Sign out berhasil!');
    } catch (error) {
        console.error('Sign out error:', error);
    }
}

export function showAuthModal(type) {
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

export function switchAuthForm(type) {
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

export async function signInWithGoogle() {
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
        
    } catch (error) {
        console.error('Google Sign In error:', error);
        showAuthMessage('Gagal sign in dengan Google: ' + error.message, 'error');
    }
}

export function showAuthMessage(message, type) {
    const messageDiv = document.getElementById('authMessage');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `auth-message show ${type}`;
    }
}

export function clearAuthMessage() {
    const messageDiv = document.getElementById('authMessage');
    if (messageDiv) {
        messageDiv.className = 'auth-message';
        messageDiv.textContent = '';
    }
}

export async function checkAuthState() {
    if (!isSupabaseEnabled) return;
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session && session.user) {
            setCurrentUser(session.user);
            currentUser = getCurrentUser();
            
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