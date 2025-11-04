import { isSupabaseEnabled, currentUser, supabaseClient } from "./supabase.js";

export function calculateChapterAverage(chapterScores, chapterNum) {
    const babKey = `bab${chapterNum}`;
    const soalScores = chapterScores[babKey] || {};
    
    const scores = [];
    for (let i = 1; i <= 5; i++) {
        scores.push(soalScores[`soal${i}`] || 0);
    }
    
    const average = scores.reduce((sum, score) => sum + score, 0) / 5;
    return Math.round(average);
}

export function calculateTotalScore(chapterScores) {
    let total = 0;
    for (let bab = 1; bab <= 5; bab++) {
        total += calculateChapterAverage(chapterScores, bab);
    }
    return total;
}

export async function saveChapterScore(chapterNum, problemNum, score) {
    if (!isSupabaseEnabled || !currentUser) return;
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // ⏱️ 5s safety

    try {
        let { data: progress, error: fetchError } = await supabaseClient
            .from('user_progress')
            .select('chapter_scores')
            .eq('user_id', currentUser.id)
            .maybeSingle(); 
        
        if (!progress) {
            console.log('🆕 Creating new user_progress record...');
            const { error: insertError } = await supabaseClient
                .from('user_progress')
                .insert([{
                    user_id: currentUser.id,
                    completed_modules: [],
                    chapter_scores: {},
                    drag_drop_stats: { attempts: 0, correct: 0 }
                }]);
            
            if (insertError) {
                console.error('❌ Failed to create user_progress:', insertError);
                throw insertError;
            }
            
            progress = { chapter_scores: {} };
        }
        
        if (fetchError) throw fetchError;
        
        let chapterScores = progress?.chapter_scores || {};
        
        const babKey = `bab${chapterNum}`;
        const soalKey = `soal${problemNum}`;
        
        if (!chapterScores[babKey] || typeof chapterScores[babKey] !== 'object') {
            chapterScores[babKey] = {};
        }
        
        const currentScore = chapterScores[babKey][soalKey] || 0;
        
        if (score > currentScore) {
            chapterScores[babKey][soalKey] = score;
            
            const { error: updateError } = await supabaseClient
                .from('user_progress')
                .update({ 
                    chapter_scores: chapterScores,
                    updated_at: new Date().toISOString()
                })
                .eq('user_id', currentUser.id);
            
            if (updateError) throw updateError;
            
            console.log(`✅ Saved: Bab ${chapterNum} Soal ${problemNum} = ${score}`);
        }
    } catch (error) {
        console.error('Error saving score:', error);
    } finally {
        clearTimeout(timeout);
    }
}