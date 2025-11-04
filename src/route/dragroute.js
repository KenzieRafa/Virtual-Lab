import { resetDragExercise, checkDragSolution } from '../app/dragdrop.js';

document.addEventListener('DOMContentLoaded', () => {
    resetDragExercise();
});

window.resetDragExercise = resetDragExercise;
window.checkDragSolution = checkDragSolution;