import { initSupabase } from '../service/supabase.js';
import { 
    showAuthModal, 
    signIn, 
    signOut, 
    closeAuthModal, 
    signInWithGoogle,
    signUp,
    switchAuthForm
    } from '../service/auth.js';
import { closeWelcomeModal } from '../service/welcome.js';
import { toggleMobileMenu } from '../app/mobile.js';

document.addEventListener('DOMContentLoaded', function() {
    initSupabase();
    
    document.querySelectorAll('.code-editor').forEach(editor => {
        editor.addEventListener('input', function() {
            this.style.color = 'var(--text-primary)';
        });
    });
    
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

    document.addEventListener('click', function(event) {
        const nav = document.getElementById('mainNav');
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const body = document.body;
        
        if (window.innerWidth <= 768 && 
            nav.classList.contains('active') && 
            !nav.contains(event.target) && 
            !hamburgerBtn.contains(event.target)) {
            
            nav.classList.remove('active');
            hamburgerBtn.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

window.toggleMobileMenu = toggleMobileMenu;
window.closeWelcomeModal = closeWelcomeModal;
window.showAuthModal = showAuthModal;
window.signOut = signOut;
window.closeAuthModal = closeAuthModal;
window.signInWithGoogle = signInWithGoogle;
window.signIn = signIn;
window.signUp = signUp;
window.switchAuthForm = switchAuthForm;