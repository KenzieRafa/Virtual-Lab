import { calculateTotalScore } from '../service/score.js';
import { isSupabaseEnabled, supabaseClient } from '../service/supabase.js';

export async function loadLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    if (!leaderboardList) return;
    
    if (!isSupabaseEnabled) {
        leaderboardList.innerHTML = '<div class="loading-message">Fitur leaderboard memerlukan Supabase.</div>';
        return;
    }

    try {
        leaderboardList.innerHTML = '<div class="loading-message">Memuat data leaderboard...</div>';
        
        const { data: progressData } = await supabaseClient.from('user_progress').select('*');
        const { data: profilesData } = await supabaseClient.from('user_profiles').select('*');
        
        const leaderboardData = progressData.map(progress => {
            const profile = profilesData.find(p => p.user_id === progress.user_id);
            const chapterScores = progress.chapter_scores || {};
            const totalScore = calculateTotalScore(chapterScores);
            const completedModules = (progress.completed_modules || []).length;
            
            return {
                userId: progress.user_id,
                name: profile?.display_name || 'User',
                totalScore: totalScore,
                completedModules: completedModules
            };
        });
        
        leaderboardData.sort((a, b) => b.totalScore - a.totalScore);
        
        if (leaderboardData.length === 0) {
            leaderboardList.innerHTML = '<div class="loading-message">Belum ada data leaderboard.</div>';
            return;
        }
        
        leaderboardList.innerHTML = '';
        leaderboardData.forEach((user, index) => {
            const rank = index + 1;
            const item = document.createElement('div');
            item.className = `leaderboard-item ${rank <= 3 ? `top-${rank}` : ''}`;
            
            let rankDisplay = rank;
            if (rank === 1) rankDisplay = '🥇';
            else if (rank === 2) rankDisplay = '🥈';
            else if (rank === 3) rankDisplay = '🥉';
            
            item.innerHTML = `
                <div class="leaderboard-rank">${rankDisplay}</div>
                <div class="leaderboard-user-info">
                    <div class="leaderboard-name">${user.name}</div>
                    <div class="leaderboard-progress">${user.completedModules} / 5 Modul Selesai</div>
                </div>
                <div class="leaderboard-score">${user.totalScore} / 500</div>
            `;
            
            leaderboardList.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        leaderboardList.innerHTML = '<div class="loading-message">Gagal memuat leaderboard.</div>';
    }
}
