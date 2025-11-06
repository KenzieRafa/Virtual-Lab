export async function loadUserProgress() {
    if (!isSupabaseEnabled || !currentUser) return;
    
    try {
        const { data, error } = await supabaseClient
            .from('user_progress')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();
        
        if (error && error.code === 'PGRST116') {
            await supabaseClient.from('user_progress').insert([{
                user_id: currentUser.id,
                completed_modules: [],
                chapter_scores: {},
                drag_drop_stats: { attempts: 0, correct: 0 }
            }]);
        } else if (data) {
            const completedModules = data.completed_modules || [];
            completedModules.forEach(chapterNum => {
                const btn = document.getElementById(`completeBtn-${chapterNum}`);
                if (btn) {
                    btn.classList.add('completed');
                    btn.innerHTML = '<span class="check-icon">✓</span> Pembelajaran Selesai!';
                }
            });
        }
    } catch (error) {
        console.error('Error loading progress:', error);
    }
}