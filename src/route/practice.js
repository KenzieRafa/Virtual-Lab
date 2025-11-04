import { generateProblems } from '../app/problems.js';
import { runCode } from '../app/runcode.js';
import { resetCode } from '../service/assessment.js';

document.addEventListener('DOMContentLoaded', () => {
    backToChapterSelection();
});

export function showChapterProblems(chapterNum) {
    document.getElementById('chapter-selection').style.display = 'none';
    document.getElementById('problems-container').style.display = 'block';
    
    const chapterTitles = {
        1: "Bab 1: Fondasi Pemrograman Python",
        2: "Bab 2: Mengontrol Alur Program", 
        3: "Bab 3: Bekerja dengan Kumpulan Data",
        4: "Bab 4: Struktur Data Lanjutan",
        5: "Bab 5: Membuat Kode Modular dengan Fungsi"
    };
    
    document.getElementById('current-chapter-title').textContent = chapterTitles[chapterNum];
    generateProblems(chapterNum);
}

export function backToChapterSelection() {
    document.getElementById('chapter-selection').style.display = 'block';
    document.getElementById('problems-container').style.display = 'none';
}

window.showChapterProblems = showChapterProblems;
window.backToChapterSelection = backToChapterSelection;
window.runCode = runCode;
window.resetCode = resetCode;