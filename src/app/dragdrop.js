import { updateDragDropStats } from "../service/progress";

let draggedElement = null;
let isDragInitialized = false;
let touchStartX = 0;
let touchStartY = 0;

const dragDropProblems = [
    {
        title: "Menyusun Fungsi Hitung Rata-rata",
        blocks: [
            {id:'1',code:'def hitung_rata(nilai):'},
            {id:'2',code:'    total = sum(nilai)'},
            {id:'3',code:'    return total / len(nilai)'},
            {id:'4',code:'nilai_siswa = [80, 90, 75, 85]'},
            {id:'5',code:'print(f"Rata-rata: {hitung_rata(nilai_siswa)}")'}
        ],
        correctOrder: ['4','1','2','3','5'],
        hint: "variabel → fungsi → panggil"
    },
    {
        title: "Loop dengan Kondisi",
        blocks: [
            {id:'1',code:'for i in range(5):'},
            {id:'2',code:'    if i % 2 == 0:'},
            {id:'3',code:'        print("Genap")'},
            {id:'4',code:'    print(f"Angka: {i}")'}
        ],
        correctOrder: ['1','2','3','4'],
        hint: "loop → if → aksi"
    }
];
let currentProblemIndex = 0;

export function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
}

export function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.drag-zone').forEach(zone => {
        zone.classList.remove('drag-over');
    });
}

export function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

export function handleDragEnter(e) {
    e.preventDefault();
    if (this.classList.contains('drag-zone')) {
        this.classList.add('drag-over');
    }
}

export function handleDragLeave(e) {
    if (this.classList.contains('drag-zone')) {
        this.classList.remove('drag-over');
    }
}

export function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log('Drop event triggered!', draggedElement);

    if (!draggedElement) {
        console.log('No dragged element found');
        return;
    }

    this.classList.remove('drag-over');

    const emptyMsg = this.querySelector('.empty-message');
    if (emptyMsg) emptyMsg.remove();

    const clone = draggedElement.cloneNode(true);

    attachEventListeners(clone);

    this.appendChild(clone);

    if (draggedElement.parentElement && draggedElement.parentElement.id === 'solution-area') {
        draggedElement.remove();
    }

    draggedElement = null;
    return false;
}

export function handleTouchStart(e) {
    e.preventDefault();
    draggedElement = this;
    this.classList.add('dragging');
    
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    
    this.style.opacity = '0.5';
    this.style.transform = 'scale(1.05)';
}

export function handleTouchMove(e) {
    e.preventDefault();
    
    if (!draggedElement) return;
    
    const touch = e.touches[0];
    
    const dropZone = document.getElementById('solution-area');
    const rect = dropZone.getBoundingClientRect();
    
    if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
        touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        dropZone.classList.add('drag-over');
    } else {
        dropZone.classList.remove('drag-over');
    }
}

export function handleTouchEnd(e) {
    e.preventDefault();
    
    if (!draggedElement) return;
    
    const touch = e.changedTouches[0];
    const dropZone = document.getElementById('solution-area');
    const rect = dropZone.getBoundingClientRect();
    
    draggedElement.style.opacity = '';
    draggedElement.style.transform = '';
    draggedElement.classList.remove('dragging');
    dropZone.classList.remove('drag-over');
    
    if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
        touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        
        const emptyMsg = dropZone.querySelector('.empty-message');
        if (emptyMsg) emptyMsg.remove();
        
        const clone = draggedElement.cloneNode(true);
        
        attachEventListeners(clone);
        
        dropZone.appendChild(clone);
        
        if (draggedElement.parentElement && draggedElement.parentElement.id === 'solution-area') {
            draggedElement.remove();
        }
    }
    
    draggedElement = null;
}

export function attachEventListeners(element) {
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragend', handleDragEnd);
    
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });
}

export function removeEventListeners(element) {
    element.removeEventListener('dragstart', handleDragStart);
    element.removeEventListener('dragend', handleDragEnd);
    
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchmove', handleTouchMove);
    element.removeEventListener('touchend', handleTouchEnd);
}

export function initDragAndDrop() {
    if (isDragInitialized) {
        console.log('⚠️ Drag & Drop already initialized, skipping...');
        return;
    }
    
    console.log('✅ Initializing Drag & Drop...');
    
    document.querySelectorAll('.code-block').forEach(attachEventListeners);
    
    document.querySelectorAll('.drag-zone').forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
    });
    
    isDragInitialized = true;
}

export function cleanupDragAndDrop() {
    console.log('🧹 Cleaning up Drag & Drop events...');

    // Remove listeners from code blocks
    document.querySelectorAll('.code-block').forEach(removeEventListeners);

    // Remove listeners from drop zones
    document.querySelectorAll('.drag-zone').forEach(zone => {
        zone.removeEventListener('dragover', handleDragOver);
        zone.removeEventListener('drop', handleDrop);
        zone.removeEventListener('dragenter', handleDragEnter);
        zone.removeEventListener('dragleave', handleDragLeave);
    });

    isDragInitialized = false;
}

export async function checkDragSolution() {
    const blocks = document.getElementById('solution-area').querySelectorAll('.code-block');
    const feedback = document.getElementById('drag-feedback');

    if (blocks.length === 0) {
        feedback.textContent = '❌ Belum ada kode! Drag blok ke area solusi.';
        feedback.className = 'feedback-area show incorrect';
        return;
    }

    const problem = dragDropProblems[currentProblemIndex];

    if (blocks.length !== problem.correctOrder.length) {
        feedback.textContent = `❌ Belum lengkap! Masih ada ${problem.correctOrder.length - blocks.length} blok yang kurang.`;
        feedback.className = 'feedback-area show incorrect';
        return;
    }

    const userOrder = Array.from(blocks).map(b => b.dataset.id);
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(problem.correctOrder);

    if (isCorrect) {
        feedback.textContent = '🎉 Sempurna! Urutan kode sudah benar! Progress tersimpan di Academic Progress.';
        feedback.className = 'feedback-area show correct';

        blocks.forEach((block, index) => {
            setTimeout(() => {
                block.style.animation = 'pulse 0.5s ease';
            }, index * 100);
        });

        await updateDragDropStats(true);
    } else {
        feedback.textContent = `❌ Belum tepat. Hint: ${problem.hint}`;
        feedback.className = 'feedback-area show incorrect';
        await updateDragDropStats(false);
    }
}

export function resetDragExercise() {
    console.log('🔄 Resetting Drag & Drop exercise...');

    // Clean up existing listeners
    cleanupDragAndDrop();

    currentProblemIndex = Math.floor(Math.random() * dragDropProblems.length);
    const problem = dragDropProblems[currentProblemIndex];

    // Update title
    const titleElement = document.querySelector('#drag-drop .page-title');
    if (titleElement) {
        titleElement.textContent = `Latihan Drag & Drop - ${problem.title}`;
    }

    // Reset solution area
    const solutionArea = document.getElementById('solution-area');
    if (solutionArea) {
        solutionArea.innerHTML = '<h3>Area Solusi (Drag di sini)</h3><p class="empty-message">Drag blok kode ke sini untuk menyusun program</p>';
    }

    // Reset feedback
    const feedbackElement = document.getElementById('drag-feedback');
    if (feedbackElement) {
        feedbackElement.className = 'feedback-area';
        feedbackElement.textContent = '';
    }

    // Reset code blocks area
    const codeBlocksArea = document.getElementById('code-blocks');
    if (codeBlocksArea) {
        codeBlocksArea.innerHTML = '<h3>Blok Kode Tersedia</h3>';

        // Shuffle and add blocks
        const shuffled = [...problem.blocks].sort(() => Math.random() - 0.5);
        shuffled.forEach(item => {
            const block = document.createElement('div');
            block.className = 'code-block';
            block.draggable = true;
            block.dataset.id = item.id;
            block.innerHTML = `<code>${item.code}</code>`;
            codeBlocksArea.appendChild(block);
        });
    }

    // Re-initialize drag and drop with fresh listeners
    setTimeout(() => {
        console.log('🔧 Re-initializing drag & drop...');
        initDragAndDrop();
    }, 100);
}