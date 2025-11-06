import { showAuthModal } from './auth.js';
import { isSupabaseEnabled, currentUser, supabaseClient } from "./supabase.js";

export async function markChapterComplete(chapterNum) {
    if (!isSupabaseEnabled || !currentUser) {
        alert('Silakan Sign In terlebih dahulu untuk menyimpan progress!');
        if (isSupabaseEnabled) showAuthModal('signin');
        return;
    }
    
    try {
        const { data: progress, error: fetchError } = await supabaseClient
            .from('user_progress')
            .select('completed_modules')
            .eq('user_id', currentUser.id)
            .single();
        
        if (fetchError) throw fetchError;
        
        let completedModules = progress?.completed_modules || [];
        
        if (completedModules.includes(chapterNum)) {
            alert('Bab ini sudah ditandai selesai!');
            return;
        }
        
        completedModules.push(chapterNum);
        
        await supabaseClient
            .from('user_progress')
            .update({ 
                completed_modules: completedModules,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', currentUser.id);
        
        const btn = document.getElementById(`completeBtn-${chapterNum}`);
        if (btn) {
            btn.classList.add('completed');
            btn.innerHTML = '<span class="check-icon">✓</span> Pembelajaran Selesai!';
        }
        
        alert(`Selamat! Bab ${chapterNum} telah ditandai selesai! 🎉`);
    } catch (error) {
        console.error('Error marking chapter complete:', error);
    }
}

export async function updateDragDropStats(isCorrect) {
    if (!isSupabaseEnabled || !currentUser) return;
    
    try {
        const { data: progress } = await supabaseClient
            .from('user_progress')
            .select('drag_drop_stats')
            .eq('user_id', currentUser.id)
            .single();
        
        let stats = progress?.drag_drop_stats || { attempts: 0, correct: 0 };
        stats.attempts += 1;
        if (isCorrect) stats.correct += 1;
        
        await supabaseClient
            .from('user_progress')
            .update({ 
                drag_drop_stats: stats,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', currentUser.id);
    } catch (error) {
        console.error('Error updating drag&drop stats:', error);
    }
}