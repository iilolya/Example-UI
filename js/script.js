document.addEventListener('DOMContentLoaded', () => {

  // Загрузка
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 300);
    });
  }

  //Мобильное меню
const burgerBtn = document.getElementById('burgerBtn');
const navList = document.getElementById('navList');
const navOverlay = document.getElementById('navOverlay');

function closeMenu() {
  if (burgerBtn) burgerBtn.classList.remove('active');
  if (navList) navList.classList.remove('open');
  if (navOverlay) navOverlay.classList.remove('active');
  // Восстанавливаем прокрутку страницы
  document.body.style.overflow = '';
}

function openMenu() {
  if (burgerBtn) burgerBtn.classList.add('active');
  if (navList) navList.classList.add('open');
  if (navOverlay) navOverlay.classList.add('active');
  // Блокируем прокрутку фона
  document.body.style.overflow = 'hidden';
}

if (burgerBtn && navList) {
  // Открытие/закрытие по клику на бургер
  burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navList.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });
  
  // Закрытие при клике на ссылку меню
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Закрытие при клике на затемнение
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }
  
  // Закрытие по клавише Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList?.classList.contains('open')) {
      closeMenu();
    }
  });
    
    // Закрыть меню при клике на ссылку
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        navList.classList.remove('open');
      });
    });
  }

  // Фильтры галереи
  const filterBtns = document.querySelectorAll('.gallery__filter-btn');
  const galleryItems = document.querySelectorAll('.gallery__item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Активная кнопка
      filterBtns.forEach(b => b.classList.remove('gallery__filter-btn--active'));
      btn.classList.add('gallery__filter-btn--active');
      
      const filter = btn.dataset.filter;
      
      // Показать/скрыть фото
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('gallery__item--hidden');
        } else {
          item.classList.add('gallery__item--hidden');
        }
      });
    });
  });

  // Увеличение фото
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryGrid = document.querySelector('.gallery__grid');
  
  if (lightbox && galleryGrid && lightboxImg) {
    
    //Открыть по клику на фото
    galleryGrid.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery__item');
      if (!item) return;
      
      const img = item.querySelector('.gallery__item-img');
      if (!img) return;
      
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    // Закрыть
    const closeLightbox = () => {
      lightbox.classList.remove('active');
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

  // Форма записи
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Спасибо! Ваша заявка принята. Я свяжусь с вами скоро');
      bookingForm.reset();
    });
  }

  //Плавный скролл по якорям
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  //Эффект шапки при скролле
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Уведомления
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
      toast.classList.remove('active');
    }, 3000);
  }

});