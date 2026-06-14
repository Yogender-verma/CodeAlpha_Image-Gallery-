const cards = document.querySelectorAll('.card');
const filterBtns = document.querySelectorAll('.filters button');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const themeToggle = document.getElementById('themeToggle');

let current = 0;

/* =========================
   GET ONLY VISIBLE CARDS
========================= */
function getVisibleCards() {
  return Array.from(document.querySelectorAll('.card'))
    .filter(card => card.style.display !== 'none');
}

/* =========================
   OPEN LIGHTBOX
========================= */
document.querySelectorAll('.card img').forEach((img) => {
  img.addEventListener('click', () => {
    const visibleCards = getVisibleCards();

    const clickedCard = img.parentElement;
    current = visibleCards.indexOf(clickedCard);

    updateImage(visibleCards);
    lightbox.style.display = 'flex';
  });
});

/* =========================
   UPDATE LIGHTBOX IMAGE
========================= */
function updateImage(list) {
  lightboxImg.src = list[current].querySelector('img').src;
}

/* =========================
   NEXT IMAGE
========================= */
nextBtn.onclick = () => {
  const list = getVisibleCards();
  current = (current + 1) % list.length;
  updateImage(list);
};

/* =========================
   PREVIOUS IMAGE
========================= */
prevBtn.onclick = () => {
  const list = getVisibleCards();
  current = (current - 1 + list.length) % list.length;
  updateImage(list);
};

/* =========================
   CLOSE LIGHTBOX
========================= */
closeBtn.onclick = () => {
  lightbox.style.display = 'none';
};

/* Close when clicking outside image */
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

/* =========================
   KEYBOARD CONTROLS
========================= */
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'Escape') closeBtn.click();
  }
});

/* =========================
   FILTER SYSTEM
========================= */
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    document.querySelector('.active').classList.remove('active');
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else {
        card.style.display =
          card.classList.contains(filter) ? 'block' : 'none';
      }
    });
  });
});

/* =========================
   THEME TOGGLE
========================= */
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});
