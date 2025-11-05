import { calculateTotalScore, calculateChapterAverage } from '../service/score.js';
import { isSupabaseEnabled } from '../service/supabase.js';

export async function loadProfilePage() {
    if (!isSupabaseEnabled) {
        document.getElementById('profileName').textContent = 'Demo Mode';
        document.getElementById('profileEmail').textContent = 'Fitur profil memerlukan Supabase';
        document.getElementById('completedModules').textContent = '-';
        document.getElementById('totalScore').textContent = '-';
        document.getElementById('dragDropAccuracy').textContent = '-';
        document.getElementById('chapterScoresList').innerHTML = '<p style="text-align:center; color:var(--text-secondary)">Supabase belum dikonfigurasi.</p>';
        return;
    }

    if (!currentUser) {
        document.getElementById('profileName').textContent = 'Guest User';
        document.getElementById('profileEmail').textContent = 'Silakan Sign In';
        document.getElementById('completedModules').textContent = '-';
        document.getElementById('totalScore').textContent = '-';
        document.getElementById('dragDropAccuracy').textContent = '-';
        document.getElementById('chapterScoresList').innerHTML = '<p style="text-align:center; color:var(--text-secondary)">Silakan Sign In terlebih dahulu.</p>';
        return;
    }
    
    try {
        const { data: profile } = await supabaseClient
            .from('user_profiles')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();
        
        const { data: progress } = await supabaseClient
            .from('user_progress')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();
        
        const displayName = profile?.display_name || currentUser.email.split('@')[0];
        document.getElementById('profileName').textContent = displayName;
        document.getElementById('profileEmail').textContent = currentUser.email;
        document.getElementById('profileInitial').textContent = displayName.charAt(0).toUpperCase();
        
        const completedModules = progress?.completed_modules || [];
        const chapterScores = progress?.chapter_scores || {};
        const dragDropStats = progress?.drag_drop_stats || { attempts: 0, correct: 0 };
        
        const totalScore = calculateTotalScore(chapterScores);
        const accuracy = dragDropStats.attempts > 0 
            ? Math.round((dragDropStats.correct / dragDropStats.attempts) * 100) 
            : 0;
        
        document.getElementById('completedModules').textContent = `${completedModules.length} / 5`;
        document.getElementById('totalScore').textContent = `${totalScore} / 500`;
        document.getElementById('dragDropAccuracy').textContent = `${accuracy}%`;
        
        const chapterScoresList = document.getElementById('chapterScoresList');
        chapterScoresList.innerHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            const average = calculateChapterAverage(chapterScores, i);
            const babKey = `bab${i}`;
            const soalScores = chapterScores[babKey] || {};
            const completedSoals = Object.keys(soalScores).length;
            
            const item = document.createElement('div');
            item.className = 'chapter-score-item';
            
            const perfectBadge = average === 100 ? ' <span style="color: #fbbf24;">⭐ Perfect!</span>' : '';
            
            item.innerHTML = `
                <div class="chapter-score-name">
                    Bab ${i}
                    <span style="font-size: 0.85rem; color: var(--text-muted); margin-left: 0.5rem;">
                        (${completedSoals}/5 soal)
                    </span>
                </div>
                <div class="chapter-score-value">${average} / 100${perfectBadge}</div>
            `;
            chapterScoresList.appendChild(item);
            
            const detailDiv = document.createElement('div');
            detailDiv.className = 'chapter-detail';
            detailDiv.style.paddingLeft = '1.5rem';
            detailDiv.style.fontSize = '0.9rem';
            detailDiv.style.color = 'var(--text-muted)';
            detailDiv.style.marginTop = '0.5rem';
            
            let detailHTML = '';
            for (let j = 1; j <= 5; j++) {
                const soalScore = soalScores[`soal${j}`] || 0;
                const soalStatus = soalScore === 100 ? '✓' : soalScore > 0 ? '◯' : '—';
                detailHTML += `
                    <div style="display: flex; justify-content: space-between; padding: 0.25rem 0;">
                        <span>${soalStatus} Soal ${i}.${j}</span>
                        <span style="font-weight: 600; color: ${soalScore === 100 ? '#22c55e' : 'var(--text-primary)'};">
                            ${soalScore}
                        </span>
                    </div>
                `;
            }
            detailDiv.innerHTML = detailHTML;
            chapterScoresList.appendChild(detailDiv);
        }
        
        const summaryDiv = document.createElement('div');
        summaryDiv.style.marginTop = '1.5rem';
        summaryDiv.style.padding = '1rem';
        summaryDiv.style.background = 'var(--primary-dark)';
        summaryDiv.style.borderRadius = '8px';
        summaryDiv.style.textAlign = 'center';
        summaryDiv.innerHTML = `
            <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                Total Nilai Latihan
            </div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--accent-blue);">
                ${totalScore} / 500
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">
                ${((totalScore / 500) * 100).toFixed(1)}% Complete
            </div>
        `;
        chapterScoresList.appendChild(summaryDiv);
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}