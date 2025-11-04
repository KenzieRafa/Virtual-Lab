const canvas = document.getElementById('sortCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let array = [];
let comparisons = 0;
let swaps = 0;
let isSorting = false;

export function generateRandomArray() {
    if (isSorting) return;
    array = [];
    for (let i = 0; i < 40; i++) array.push(Math.floor(Math.random() * 350) + 20);
    comparisons = 0;
    swaps = 0;
    updateStats();
    drawArray();
    document.getElementById('sortStatus').textContent = 'Siap';
}

export function drawArray(colorArray = []) {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / array.length;
    for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = colorArray[i] || '#3b82f6';
        ctx.fillRect(i * barWidth, canvas.height - array[i], barWidth - 2, array[i]);
    }
}

export function updateStats() {
    document.getElementById('comparisons').textContent = comparisons;
    document.getElementById('swaps').textContent = swaps;
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (!isSorting) return;
            comparisons++;
            updateStats();
            drawArray(array.map((_, idx) => idx === j || idx === j + 1 ? '#ef4444' : '#3b82f6'));
            await sleep(50);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swaps++;
            }
        }
    }
    drawArray(array.map(() => '#22c55e'));
}

export async function startSorting() {
    if (isSorting || array.length === 0) return;
    isSorting = true;
    document.getElementById('sortStatus').textContent = 'Sorting...';
    await bubbleSort();
    isSorting = false;
    document.getElementById('sortStatus').textContent = 'Selesai!';
}

export function resetCanvas() {
    isSorting = false;
    generateRandomArray();
}