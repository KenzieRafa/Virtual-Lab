import { simulatePythonExecution } from './code.js';
import { calculateScore, showMessage } from '../service/assessment.js';
import { saveChapterScore } from '../service/score.js';

export async function runCode(problemId) {
    const editor = document.getElementById(`editor-${problemId}`);
    const output = document.getElementById(`output-${problemId}`);
    const scoreDisplay = document.getElementById(`score-${problemId}`);
    const code = editor.value.trim();
    
    if (!code) {
        showMessage(output, 'error', 'Kode kosong!');
        return;
    }
    
    const runButton = event.target.closest('.run-button');
    runButton.disabled = true;
    runButton.innerHTML = '<span>⏳</span><span>Menjalankan...</span>';
    
    setTimeout(async () => {
        const result = simulatePythonExecution(code, problemId);
        output.innerHTML = result.output;
        
        const score = calculateScore(code, problemId);
        scoreDisplay.textContent = `Skor: ${score}/100`;
        
        if (score >= 70) scoreDisplay.style.background = 'var(--gradient-accent)';
        else if (score >= 40) scoreDisplay.style.background = 'var(--text-muted)';
        else scoreDisplay.style.background = '#ef4444';
        
        runButton.disabled = false;
        runButton.innerHTML = '<span>▶</span><span>Jalankan Kode</span>';
        
        if (score >= 70) showMessage(output, 'success', 'Excellent!');
        
        const [chapter, problem] = problemId.split('-').map(Number);
        await saveChapterScore(chapter, problem, score);
    }, 1500);
}