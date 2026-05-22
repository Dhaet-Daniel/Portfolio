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
// ACTIVE NAV LINK ON SCROLL
// ============================================

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});


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
    const target = document.querySelector(this.getAttribute("href"));
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