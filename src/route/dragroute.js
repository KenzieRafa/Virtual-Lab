import { resetDragExercise, checkDragSolution, initDragAndDrop } from '../app/dragdrop.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Drag & Drop page loaded');

    // Initialize drag and drop functionality
    initDragAndDrop();

    // Load first problem
    resetDragExercise();
});

// Make functions available globally for onclick handlers
window.resetDragExercise = resetDragExercise;
window.checkDragSolution = checkDragSolution;