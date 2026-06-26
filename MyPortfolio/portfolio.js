(function() {
  // ===== LOADER =====
  window.addEventListener('load', () => {
    document.getElementById('loader').classList.add('hide');
  });

  // ===== TYPING EFFECT =====
  const titles = ['IT Graduate', 'Web Developer', 'UI/UX Enthusiast', 'App Developer'];
  let idx = 0,
    charIdx = 0,
    isDeleting = false;
  const typingEl = document.getElementById('typingText');

  function type() {
    const current = titles[idx];
    if (!isDeleting) {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
      setTimeout(type, 100);
    } else {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        idx = (idx + 1) % titles.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 50);
    }
  }
  type();

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // ===== ACTIVE NAV =====
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 100;
      if (window.scrollY >= top) current = s.getAttribute('id');
    });
    navItems.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });

    // Scroll to top button visibility
    const btn = document.getElementById('scrollTop');
    if (window.scrollY > 500) btn.classList.add('show');
    else btn.classList.remove('show');
  });

  // ===== SCROLL TO TOP =====
  document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== AVATAR MODAL / LIGHTBOX =====
  const avatarTrigger = document.getElementById('avatarTrigger');
  const avatarModal = document.getElementById('avatarModal');
  const avatarModalClose = document.getElementById('avatarModalClose');

  function openAvatarModal(e) {
    e.preventDefault();
    avatarModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAvatarModal() {
    avatarModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  avatarTrigger.addEventListener('click', openAvatarModal);
  avatarModalClose.addEventListener('click', closeAvatarModal);

  avatarModal.addEventListener('click', function(e) {
    if (e.target === this) closeAvatarModal();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeAvatarModal();
  });

  // ===== SLIDER =====
  const track = document.getElementById('sliderTrack');
  const slides = track.querySelectorAll('img');
  const label = document.getElementById('sliderLabel');
  const slideNames = [
    'Login Page',
    'Order Page',
    'View Order',
    'Menu Page',
    'Reports Page',
    'Employee View',
    'Notifications',
    'User Management',
    'User Profile'
  ];
  let currentSlide = 0;

  function updateSlider(index) {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    label.textContent = slideNames[currentSlide];
  }

  document.getElementById('sliderPrev').addEventListener('click', () => {
    updateSlider(currentSlide - 1);
  });

  document.getElementById('sliderNext').addEventListener('click', () => {
    updateSlider(currentSlide + 1);
  });

  // ===== RESUME BUTTON =====
  function viewResume() {
    window.open('files/RESUMEGRADUATE.pdf', '_blank');
  }

  document.getElementById('viewResumeBtn2').addEventListener('click', viewResume);

  // ===== COPY EMAIL =====
  document.getElementById('copyEmailBtn').addEventListener('click', function() {
    const email = 'raphaelregis.work@gmail.com';

    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        showCopiedFeedback(this);
      }).catch(() => {
        fallbackCopy(email, this);
      });
    } else {
      fallbackCopy(email, this);
    }
  });

  function showCopiedFeedback(button) {
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.classList.add('copied');
    setTimeout(() => {
      button.innerHTML = '<i class="fas fa-copy"></i> Copy';
      button.classList.remove('copied');
    }, 2000);
  }

  function fallbackCopy(email, button) {
    const textarea = document.createElement('textarea');
    textarea.value = email;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showCopiedFeedback(button);
  }

  // ===== FADE-IN OBSERVER =====
  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  faders.forEach(el => observer.observe(el));

  // ===== PARTICLES =====
  const particleContainer = document.getElementById('particles');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 4 + Math.random() * 20;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.animationDuration = 10 + Math.random() * 12 + 's';
    particleContainer.appendChild(p);
  }
})();