const cards = document.querySelectorAll('.card');
const imgs = document.querySelectorAll('.card img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const filterBtns = document.querySelectorAll('.filters button');
const themeToggle = document.getElementById('themeToggle');

let current = 0;

imgs.forEach((img, index) => {
  img.addEventListener('click', () => {
    current = index;
    updateImage();
    lightbox.style.display = 'flex';
  });
});

function updateImage() {
  lightboxImg.src = imgs[current].src;
}

nextBtn.onclick = () => {
  current = (current + 1) % imgs.length;
  updateImage();
};

prevBtn.onclick = () => {
  current = (current - 1 + imgs.length) % imgs.length;
  updateImage();
};

closeBtn.onclick = () => lightbox.style.display = 'none';

document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'Escape') closeBtn.click();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.active').classList.remove('active');
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    cards.forEach(card => {
      card.style.display =
        filter === 'all' || card.classList.contains(filter) ? 'block' : 'none';
    });
  });
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});