import { loadProfilePage } from '../app/profile.js';

document.addEventListener('DOMContentLoaded', async () => {
    await checkAuthState();
    loadProfilePage();
});