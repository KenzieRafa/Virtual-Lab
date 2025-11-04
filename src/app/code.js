import { simulateChapter1, simulateChapter2, simulateChapter3, simulateChapter4, simulateChapter5 } from './chapters.js';

export function simulatePythonExecution(code, problemId) {
    let output = '';
    const [chapter, problem] = problemId.split('-').map(Number);
    
    try {
        switch(chapter) {
            case 1: output = simulateChapter1(code, problem); break;
            case 2: output = simulateChapter2(code, problem); break;
            case 3: output = simulateChapter3(code, problem); break;
            case 4: output = simulateChapter4(code, problem); break;
            case 5: output = simulateChapter5(code, problem); break;
        }
        if (!output) output = 'Kode belum lengkap atau tidak sesuai dengan soal.';
    } catch (error) {
        output = `Error: ${error.message}`;
    }
    return { output };
}