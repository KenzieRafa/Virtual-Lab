export function calculateScore(code, problemId) {
    let score = 0;
    const [chapter, problem] = problemId.split('-').map(Number);
    const requirements = getRequirements(chapter, problem);
    const lowerCode = code.toLowerCase();
    
    requirements.forEach(req => {
        if (lowerCode.includes(req.keyword.toLowerCase())) {
            score += req.points;
        }
    });
    
    if (code.includes('#')) score += 5;
    if (code.includes('print(f')) score += 5;
    
    return Math.min(score, 100);
}

export function getRequirements(chapter, problem) {
    const reqs = {
        1: {
            1: [{keyword: 'kangkung', points: 15}, {keyword: 'wortel', points: 15}, {keyword: 'kol', points: 10}, 
                {keyword: 'input', points: 15}, {keyword: 'int(', points: 10}, {keyword: 'float(', points: 10}, {keyword: 'print', points: 15}],
            2: [{keyword: '9/5', points: 25}, {keyword: '273.15', points: 25}, {keyword: 'float(', points: 20}, 
                {keyword: 'input', points: 15}, {keyword: 'print', points: 10}],
            3: [{keyword: '0.11', points: 25}, {keyword: 'ppn', points: 20}, {keyword: 'subtotal', points: 15}, 
                {keyword: 'total', points: 15}, {keyword: 'input', points: 10}, {keyword: 'print', points: 10}],
            4: [{keyword: 'tahun_lahir', points: 15}, {keyword: 'tahun_target', points: 15}, {keyword: 'if', points: 20}, 
                {keyword: '<', points: 15}, {keyword: 'else', points: 15}, {keyword: 'print', points: 15}],
            5: [{keyword: 'rata', points: 25}, {keyword: '60', points: 20}, 
                {keyword: '>=', points: 20}, {keyword: 'if', points: 20}, {keyword: 'print', points: 15}]
        },
        2: {
            1: [{keyword: 'while', points: 20}, {keyword: 'elif', points: 20}, {keyword: 'indeks', points: 15}, 
                {keyword: '>=', points: 15}, {keyword: 'break', points: 15}, {keyword: '0 <=', points: 10}],
            2: [{keyword: 'range', points: 20}, {keyword: '% 5', points: 25}, {keyword: 'istirahat', points: 15}, 
                {keyword: 'for', points: 15}, {keyword: 'if', points: 15}],
            3: [{keyword: 'random', points: 20}, {keyword: 'rahasia', points: 15}, {keyword: 'kesempatan', points: 15}, 
                {keyword: 'tebakan', points: 15}, {keyword: 'elif', points: 15}, {keyword: 'break', points: 15}],
            4: [{keyword: 'split()', points: 20}, {keyword: '% 2', points: 25}, {keyword: 'genap', points: 15}, 
                {keyword: '[', points: 15}, {keyword: 'len', points: 15}],
            5: [{keyword: 'while true', points: 25}, {keyword: 'break', points: 25}, {keyword: 'elif', points: 20}, 
                {keyword: 'float', points: 15}, {keyword: 'input', points: 15}]
        },
        3: {
            1: [{keyword: 'len(', points: 25}, {keyword: 'pesan', points: 20}, {keyword: 'if', points: 15}, 
                {keyword: '<=', points: 15}, {keyword: 'else', points: 15}],
            2: [{keyword: '[::-1]', points: 35}, {keyword: 'lower()', points: 25}, {keyword: 'ya', points: 20}, 
                {keyword: 'if', points: 10}, {keyword: '==', points: 10}],
            3: [{keyword: "split(',')", points: 25}, {keyword: "split(':')", points: 25}, {keyword: 'total', points: 20}, 
                {keyword: 'for', points: 15}, {keyword: 'append', points: 15}],
            4: [{keyword: 'set', points: 30}, {keyword: 'unik', points: 20}, {keyword: 'split()', points: 20}, 
                {keyword: 'lower()', points: 15}, {keyword: 'len', points: 10}],
            5: [{keyword: 'copy()', points: 25}, {keyword: 'sort', points: 25}, {keyword: 'reverse=true', points: 20}, 
                {keyword: '[:3]', points: 15}, {keyword: 'split()', points: 10}]
        },
        4: {
            1: [{keyword: '[[0', points: 25}, {keyword: 'range(c)', points: 20}, {keyword: 'range(r)', points: 20}, 
                {keyword: 'for', points: 20}, {keyword: 'print', points: 10}],
            2: [{keyword: "[['-'", points: 20}, {keyword: 'join', points: 20}, {keyword: 'papan', points: 20}, 
                {keyword: 'int(input', points: 20}, {keyword: 'for row', points: 15}],
            3: [{keyword: 'sum(row)', points: 25}, {keyword: 'enumerate', points: 25}, {keyword: 'map(int', points: 20}, 
                {keyword: 'append', points: 15}, {keyword: 'for', points: 10}],
            4: [{keyword: '(i + j) % 2', points: 35}, {keyword: '# ', points: 25}, {keyword: 'range(n)', points: 20}, 
                {keyword: 'for i', points: 10}, {keyword: 'for j', points: 10}],
            5: [{keyword: 'mat[i][j]', points: 25}, {keyword: 'found', points: 20}, {keyword: 'break', points: 20}, 
                {keyword: 'for i in range', points: 15}, {keyword: 'for j in range', points: 15}]
        },
        5: {
            1: [{keyword: 'def hitung_total', points: 25}, {keyword: '0.11', points: 20}, {keyword: '500000', points: 20}, 
                {keyword: 'return', points: 20}, {keyword: 'if', points: 10}],
            2: [{keyword: 'def cek_umur', points: 25}, {keyword: 'minimal=15', points: 25}, {keyword: 'return', points: 20}, 
                {keyword: '>=', points: 15}, {keyword: 'if', points: 10}],
            3: [{keyword: 'def kalkulator', points: 25}, {keyword: 'error', points: 20}, {keyword: 'return', points: 20}, 
                {keyword: 'elif', points: 15}, {keyword: 'if', points: 15}],
            4: [{keyword: 'def cetak_papan', points: 20}, {keyword: 'def ganti_giliran', points: 20}, {keyword: '|', points: 20}, 
                {keyword: 'return', points: 20}, {keyword: 'for row', points: 15}],
            5: [{keyword: 'def rata2', points: 25}, {keyword: 'if not nums', points: 25}, {keyword: 'return none', points: 20}, 
                {keyword: 'sum', points: 15}, {keyword: 'len', points: 10}]
        }
    };
    return reqs[chapter]?.[problem] || [];
}

export function resetCode(problemId) {
    const editor = document.getElementById(`editor-${problemId}`);
    const output = document.getElementById(`output-${problemId}`);
    const scoreDisplay = document.getElementById(`score-${problemId}`);
    
    editor.value = '';
    output.textContent = 'Tekan tombol "Jalankan Kode" untuk melihat hasil...';
    scoreDisplay.textContent = 'Skor: 0/100';
    scoreDisplay.style.background = 'var(--gradient-accent)';
}

export function showMessage(container, type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    container.insertBefore(messageDiv, container.firstChild);
    setTimeout(() => {
        if (messageDiv.parentNode) messageDiv.parentNode.removeChild(messageDiv);
    }, 5000);
}