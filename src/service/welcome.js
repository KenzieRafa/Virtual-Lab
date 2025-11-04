export function showWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
    }
}

export function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
    }
}