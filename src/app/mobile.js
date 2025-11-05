export function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const body = document.body;
    
    nav.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
    body.classList.toggle('menu-open');
}