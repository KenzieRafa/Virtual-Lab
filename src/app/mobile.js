// import { backToChapterSelection } from './navigation.js';
// import { resetDragExercise } from './dragdrop.js';
// import { loadLeaderboard } from './leaderboard.js';
// import { loadProfilePage } from './profile.js';
// import { loadUserProgress } from './progress.js';

export function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const body = document.body;
    
    nav.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
    body.classList.toggle('menu-open');
}

// export function showPage(pageId) {
//     if (window.innerWidth <= 768) {
//         const nav = document.getElementById('mainNav');
//         const hamburgerBtn = document.getElementById('hamburgerBtn');
//         const body = document.body;
        
//         nav.classList.remove('active');
//         hamburgerBtn.classList.remove('active');
//         body.classList.remove('menu-open');
//     }
    
//     const pages = document.querySelectorAll('.page');
//     pages.forEach(page => page.classList.remove('active'));
    
//     const targetPage = document.getElementById(pageId);
//     if (targetPage) targetPage.classList.add('active');

//     const navButtons = document.querySelectorAll('.nav-btn');
//     navButtons.forEach(btn => btn.classList.remove('active'));
//     const selectedButton = document.querySelector(`[data-page="${pageId}"]`);
//     if (selectedButton) selectedButton.classList.add('active');
    
//     if (pageId === 'practice') backToChapterSelection();
//     if (pageId === 'drag-drop') resetDragExercise();
//     if (pageId === 'leaderboard') loadLeaderboard();
//     else if (pageId === 'profile') loadProfilePage();
//     else if (pageId === 'material') loadUserProgress();
// }