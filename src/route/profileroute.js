import { loadProfilePage } from '../app/profile.js';
import { checkAuthState } from '../service/supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    await checkAuthState();
    loadProfilePage();
});