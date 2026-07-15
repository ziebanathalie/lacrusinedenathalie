

/* ===== Témoignages + animations au scroll ===== */
const testimonials = [
  {
    quote: "«\u00a0En quelques semaines de transition accompagnée par Nathalie, j'ai retrouvé une énergie que je n'avais plus depuis des années. Ses recettes sont vraiment délicieuses je ne me sens pas du tout frustrée\u00a0!&nbsp;»",
    author: "— Sophie M., 38 ans · Transition réussie en 6 semaines"
  },
  {
    quote: "«\u00a0Ce qui m'a convaincue, c'est l'authenticité de Nathalie. Elle ne vend pas un régime, elle partage une vraie expérience de vie. J'ai perdu 4 kg et trouvé le goût de Cru'siner\u00a0»",
    author: "— Marie-Claire T., 52 ans · Suivi personnalisé 3 mois"
  },
  {
    quote: "«\u00a0Les crackers aux herbes de garrigue sont devenus un incontournable chez nous. Merci pour ces recettes qui rendent le cru vraiment gourmand\u00a0!&nbsp;»",
    author: "— Isabelle R., 44 ans · Ebook starter"
  }
];
function showTestimonial(i) {
  document.getElementById('tquote').innerHTML = testimonials[i].quote;
  document.getElementById('tauthor').textContent = testimonials[i].author;
  document.querySelectorAll('.t-dot').forEach((d,j) => d.classList.toggle('active', j===i));
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.pillar, .recipe-card, .offer-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .6s, transform .6s';
  observer.observe(el);
});

/* ===== Modales recettes ===== */
function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal(e, id) {
  if (e.target === e.currentTarget) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(function(m) {
      m.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
});

// Reset scroll sur tous les liens de navigation
document.querySelectorAll('nav a, .nav-cta').forEach(function(link) {
  link.addEventListener('click', function() {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  });
});

/* ===== Formulaire de contact ===== */
// Gestion formulaire contact avec confirmation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = new FormData(contactForm);
    try {
      const response = await fetch('https://formspree.io/f/mzdqjozo', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        contactForm.style.display = 'none';
        document.getElementById('formConfirmation').classList.add('active');
        window.scrollTo({ top: document.getElementById('contact').offsetTop - 80, behavior: 'smooth' });
      }
    } catch(err) {
      alert('Une erreur est survenue. Merci de réessayer.');
    }
  });
}

function resetForm() {
  contactForm.reset();
  contactForm.style.display = 'block';
  document.getElementById('formConfirmation').classList.remove('active');
}

/* ===== Menu hamburger mobile ===== */
// Menu hamburger mobile
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

function toggleMenu() {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ===== Carrousel piliers ===== */
// Carrousel piliers — swipe + dots
(function() {
  var track = document.getElementById('pilliersTrack');
  var dots = document.querySelectorAll('#pillieresDots .carousel-dot');
  var slides = document.querySelectorAll('.pillar-slide');
  if (!track || !slides.length) return;

  var current = 0;
  var total = slides.length;
  var startX = 0;
  var isDragging = false;

  function goTo(idx) {
    if (idx < 0) idx = 0;
    if (idx >= total) idx = total - 1;
    current = idx;
    track.style.transform = 'translateX(-' + (100 * current) + '%)';
    slides.forEach(function(s, i) {
      s.classList.toggle('active', i === current);
    });
    dots.forEach(function(d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  // Init first slide
  goTo(0);

  // Dots
  dots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      goTo(parseInt(dot.dataset.slide));
    });
  });

  // Touch swipe
  track.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', function(e) {
    if (!isDragging) return;
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
    isDragging = false;
  }, { passive: true });
})();

/* ===== Protection des photos : signature + anti-clic droit/glisser ===== */
(function() {
  var frames = document.querySelectorAll('.gallery-img, .about-collage-frame, .pillars-photo-frame, .hero-photo-frame');
  frames.forEach(function(el) {
    var sig = document.createElement('span');
    sig.className = 'photo-signature';
    sig.textContent = "© La Cru'Sine de Nathalie";
    el.appendChild(sig);
  });

  document.querySelectorAll('img').forEach(function(img) {
    img.setAttribute('draggable', 'false');
    img.addEventListener('contextmenu', function(e) { e.preventDefault(); });
    img.addEventListener('dragstart', function(e) { e.preventDefault(); });
  });
})();