import { resetDragExercise, checkDragSolution } from '../app/dragdrop.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Drag & Drop page loaded');

    // Load first problem (this will also initialize drag & drop)
    resetDragExercise();
});

// Make functions available globally for onclick handlers
window.resetDragExercise = resetDragExercise;
window.checkDragSolution = checkDragSolution;