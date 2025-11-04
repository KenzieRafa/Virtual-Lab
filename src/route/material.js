import { loadUserProgress, markChapterComplete } from '../service/progress.js';

document.addEventListener('DOMContentLoaded', () => {
    loadUserProgress();
});

function playVideo(chapterNumber) {
    const videoLinks = {
        1: "https://www.youtube.com/watch?v=gxmTFXfrMzk",
        2: "https://www.youtube.com/watch?v=Hqndpzj0ZFg",
        3: "https://www.youtube.com/watch?v=MPvC9uWATLI",
        4: "https://www.youtube.com/watch?v=6VDCFBKyn7Y",
        5: "https://www.youtube.com/watch?v=wQwf5eKpxqs"
    };
    if (videoLinks[chapterNumber]) {
        window.open(videoLinks[chapterNumber], "_blank");
    }
}

window.markChapterComplete = markChapterComplete;
window.playVideo = playVideo;