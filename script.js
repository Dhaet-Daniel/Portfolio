// ============================================
// MOBILE MENU TOGGLE
// ============================================

const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Close menu when a nav link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});


// ============================================
// PREMIUM CUSTOM CURSOR
// ============================================

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
const cursorGlow = document.querySelector(".cursor-glow");
const supportsFinePointer =
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(max-width: 768px)").matches;

if (cursorDot && cursorOutline && cursorGlow && supportsFinePointer) {
  document.body.classList.add("custom-cursor-active");

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let outlineX = targetX;
  let outlineY = targetY;
  let glowX = targetX;
  let glowY = targetY;
  let dotX = targetX;
  let dotY = targetY;

  const magneticItems = document.querySelectorAll(".btn, .nav-cta, button, .view-btn");
  const interactiveItems = document.querySelectorAll("a, button, .btn, .nav-link, .nav-cta, .menu-icon, .view-btn");

  const setCursorPosition = (element, x, y) => {
    element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  };

  const resetMagnetic = (element) => {
    element.style.setProperty("--magnetic-x", "0px");
    element.style.setProperty("--magnetic-y", "0px");
  };

  const animateCursor = () => {
    dotX += (targetX - dotX) * 0.35;
    dotY += (targetY - dotY) * 0.35;
    outlineX += (targetX - outlineX) * 0.16;
    outlineY += (targetY - outlineY) * 0.16;
    glowX += (targetX - glowX) * 0.1;
    glowY += (targetY - glowY) * 0.1;

    setCursorPosition(cursorDot, dotX, dotY);
    setCursorPosition(cursorOutline, outlineX, outlineY);
    setCursorPosition(cursorGlow, glowX, glowY);

    window.requestAnimationFrame(animateCursor);
  };

  const showCursor = () => {
    document.body.classList.add("cursor-visible");
    document.body.classList.remove("cursor-hidden");
  };

  const hideCursor = () => {
    document.body.classList.add("cursor-hidden");
    document.body.classList.remove("cursor-visible");
  };

  window.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    showCursor();
  }, { passive: true });

  window.addEventListener("mousedown", () => {
    cursorDot.classList.add("is-pressed");
    cursorOutline.classList.add("is-pressed");
  });

  window.addEventListener("mouseup", () => {
    cursorDot.classList.remove("is-pressed");
    cursorOutline.classList.remove("is-pressed");
  });

  document.addEventListener("mouseleave", hideCursor);
  document.addEventListener("mouseenter", showCursor);

  interactiveItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      cursorDot.classList.add("is-hover");
      cursorOutline.classList.add("is-hover");
    });

    item.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("is-hover");
      cursorOutline.classList.remove("is-hover");
    });
  });

  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      item.style.setProperty("--magnetic-x", `${offsetX * 0.14}px`);
      item.style.setProperty("--magnetic-y", `${offsetY * 0.14}px`);
    });

    item.addEventListener("mouseleave", () => {
      resetMagnetic(item);
    });
  });

  window.addEventListener("blur", hideCursor);
  window.addEventListener("resize", () => {
    targetX = Math.min(targetX, window.innerWidth);
    targetY = Math.min(targetY, window.innerHeight);
  });

  animateCursor();
} else {
  document.body.classList.remove("custom-cursor-active", "cursor-visible", "cursor-hidden");
}


// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

const updateActiveNavLink = () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href && href.startsWith("#") && href.slice(1) === current) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);


// ============================================
// SCROLL ANIMATION FOR ELEMENTS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll(".about, .skills, .work, .contact, .work-card, .info-item").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  observer.observe(el);
});


// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetSelector = this.getAttribute("href");
    const target = document.querySelector(targetSelector);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  });
});


// ============================================
// SKILL PROGRESS BAR ANIMATION
// ============================================

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.style.getPropertyValue("--progress");
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".progress").forEach((progress) => {
  progress.style.width = "0";
  skillObserver.observe(progress);
});


// ============================================
// PROJECT MODAL: Phishing Detector
// ============================================

const phishingModal = document.getElementById('phishingModal');
if (phishingModal) {
  const galleryImage = phishingModal.querySelector('.gallery-image');
  const thumbButtons = Array.from(phishingModal.querySelectorAll('.gallery-thumb'));
  const prevBtn = phishingModal.querySelector('.modal-prev');
  const nextBtn = phishingModal.querySelector('.modal-next');
  const closeBtn = phishingModal.querySelector('.modal-close');
  const projectTriggers = document.querySelectorAll('.view-btn[data-project="phishing-detector"]');

  const galleryItems = [
    { src: 'assets/projects/phishing-detector/thumbnail.png', alt: 'Email Analysis Result Page' },
    { src: 'assets/projects/phishing-detector/prediction-history.png', alt: 'Prediction History Page' },
    { src: 'assets/projects/phishing-detector/admin-dashboard.png', alt: 'Admin Command Center' }
  ];

  let currentIndex = 0;

  const updateGallery = (index) => {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIndex];
    galleryImage.src = item.src;
    galleryImage.alt = item.alt;
    thumbButtons.forEach((button, idx) => {
      button.classList.toggle('active', idx === currentIndex);
    });
  };

  const openModal = () => {
    updateGallery(0);
    phishingModal.classList.add('active');
    phishingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    phishingModal.classList.remove('active');
    phishingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  projectTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openModal();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateGallery(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateGallery(currentIndex + 1);
    });
  }

  thumbButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      updateGallery(index);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  phishingModal.addEventListener('click', (event) => {
    if (event.target === phishingModal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && phishingModal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ============================================
// FORM SUBMISSION
// ============================================

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Show success message
    const formInputs = contactForm.querySelectorAll("input, textarea");
    const submitBtn = contactForm.querySelector("button");
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = "Message Sent! ✓";
    submitBtn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
    
    // Reset form
    contactForm.reset();
    
    // Restore button after 3 seconds
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = "";
    }, 3000);
  });
}


// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;
  const profileImg = document.querySelector(".profile-img");
  
  if (profileImg && scrollY < window.innerHeight) {
    profileImg.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
});


// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease-out";
setTimeout(() => {
  document.body.style.opacity = "1";
}, 100);
