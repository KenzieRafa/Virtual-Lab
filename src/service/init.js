import { initSupabase } from './supabase.js';
import { resetDragExercise } from '../app/dragdrop';
import { generateRandomArray } from '../app/canvas.js';

document.addEventListener('DOMContentLoaded', function() {
    initSupabase();
    
    document.querySelectorAll('.code-editor').forEach(editor => {
        editor.addEventListener('input', function() {
            this.style.color = 'var(--text-primary)';
        });
    });

    if (document.querySelector('.code-block')) {
        resetDragExercise();
    }
    
    if (canvas) {
        generateRandomArray();
    }
    
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
});