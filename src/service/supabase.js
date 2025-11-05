import { showWelcomeModal } from "./welcome.js";

const SUPABASE_URL = 'https://blkplgvhkgtsgnindwht.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsa3BsZ3Zoa2d0c2duaW5kd2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5NDM1NjMsImV4cCI6MjA3NTUxOTU2M30.HClTmehLskf_mgebwpRH9g-gyprqjIs8mn97HBOIT1k';
export let supabaseClient = null;
export let currentUser = null;
export let isSupabaseEnabled = false;

export function initSupabase() {
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

export function getCurrentUser() {
    return currentUser;
}

export function setCurrentUser(user) {
    currentUser = user;
}

export function updateUIForAuthenticatedUser() {
    const signInBtn = document.getElementById('signInBtn');
    const userProfileHeader = document.getElementById('userProfileHeader');
    const userNameHeader = document.getElementById('userNameHeader');
    
    if (signInBtn) signInBtn.style.display = 'none';
    if (userProfileHeader) userProfileHeader.style.display = 'flex';
    if (userNameHeader) {
        userNameHeader.textContent = currentUser.displayName || currentUser.email.split('@')[0];
    }
}

export function updateUIForGuestUser() {
    const signInBtn = document.getElementById('signInBtn');
    const userProfileHeader = document.getElementById('userProfileHeader');
    
    if (signInBtn) signInBtn.style.display = 'block';
    if (userProfileHeader) userProfileHeader.style.display = 'none';
}

export async function checkAuthState() {
    if (!isSupabaseEnabled) return;
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session && session.user) {
            currentUser = session.user;
            
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

export async function loadUserProfile() {
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

export async function createUserProfile() {
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