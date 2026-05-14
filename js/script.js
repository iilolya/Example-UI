// инициализация после загрузки
document.addEventListener('DOMContentLoaded', () => {

  // скрытие прелоадера
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('preloader--hidden');
      }, 300);
    });
  }

  // управление мобильным меню
  const burgerBtn = document.getElementById('burgerBtn');
  const navList = document.getElementById('navList');
  const navOverlay = document.getElementById('navOverlay');

  function closeMenu() {
    if (burgerBtn) burgerBtn.classList.remove('nav__burger--active');
    if (navList) navList.classList.remove('nav__list--open');
    if (navOverlay) navOverlay.classList.remove('nav__overlay--active');
    document.body.style.overflow = '';
  }

  function openMenu() {
    if (burgerBtn) burgerBtn.classList.add('nav__burger--active');
    if (navList) navList.classList.add('nav__list--open');
    if (navOverlay) navOverlay.classList.add('nav__overlay--active');
    document.body.style.overflow = 'hidden';
  }

  if (burgerBtn && navList) {
    burgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navList.classList.contains('nav__list--open');
      isOpen ? closeMenu() : openMenu();
    });
    
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navList?.classList.contains('nav__list--open')) {
        closeMenu();
      }
    });
  }

  // фильтрация галереи
  const filterBtns = document.querySelectorAll('.gallery__filter-btn');
  const galleryItems = document.querySelectorAll('.gallery__item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('gallery__filter-btn--active'));
      btn.classList.add('gallery__filter-btn--active');
      
      const filter = btn.dataset.filter;
      
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('gallery__item--hidden');
        } else {
          item.classList.add('gallery__item--hidden');
        }
      });
    });
  });

  // лайтбокс для просмотра фото
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryGrid = document.querySelector('.gallery__grid');
  
  if (lightbox && galleryGrid && lightboxImg) {
    
    galleryGrid.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery__item');
      if (!item) return;
      
      const img = item.querySelector('.gallery__item-img');
      if (!img) return;
      
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('lightbox--active');
      document.body.style.overflow = 'hidden';
    });
    
    const closeLightbox = () => {
      lightbox.classList.remove('lightbox--active');
      document.body.style.overflow = '';
    };
    
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // обработка формы записи
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Спасибо! Ваша заявка принята. Я свяжусь с вами скоро');
      bookingForm.reset();
    });
  }

  // плавная прокрутка по якорям
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // изменение шапки при прокрутке
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 50);
    });
  }

  // показ уведомлений
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('toast--active');
    
    setTimeout(() => {
      toast.classList.remove('toast--active');
    }, 3000);
  }

});