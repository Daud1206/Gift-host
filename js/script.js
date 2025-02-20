// Menambahkan event listener untuk drag pada desktop dan touch pada mobile
const papers = document.querySelectorAll('.paper');

papers.forEach(paper => {
    paper.addEventListener('mousedown', (e) => startDrag(e, paper));
    paper.addEventListener('touchstart', (e) => startDrag(e, paper));
});

function startDrag(e, paper) {
    e.preventDefault();

    const isTouch = e.type === 'touchstart';
    const startX = isTouch ? e.touches[0].clientX : e.clientX;
    const startY = isTouch ? e.touches[0].clientY : e.clientY;
    const offsetX = startX - paper.getBoundingClientRect().left;
    const offsetY = startY - paper.getBoundingClientRect().top;

    function moveDrag(e) {
        const moveX = isTouch ? e.touches[0].clientX : e.clientX;
        const moveY = isTouch ? e.touches[0].clientY : e.clientY;

        paper.style.left = moveX - offsetX + 'px';
        paper.style.top = moveY - offsetY + 'px';
    }

    function stopDrag() {
        document.removeEventListener('mousemove', moveDrag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', moveDrag);
        document.removeEventListener('touchend', stopDrag);
    }

    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', moveDrag);
    document.addEventListener('touchend', stopDrag);
}
