const videos = [document.getElementById('video1'), document.getElementById('video2')];
const titles = [
  "Join Dew Diamond at IIJS Premiere 2025",
  "A Diamond for Every Moment"
];
const subtitles = [
  "Bombay Exhibition Centre - Mumbai | 31<sup>st</sup> July - 4<sup>th</sup> August | Hall No: 2, Stall No: 2H.258C",
  "World-class Diamond Jewelry handcrafted with integrity and quality."
];

let current = 0;
let muted = true;

const titleEl = document.getElementById('slide-title');
const subtitleEl = document.getElementById('slide-subtitle');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeBtn = document.getElementById('volume');
const volumeIcon = document.getElementById('volume-icon');

function showSlide(index) {
  videos.forEach((vid, i) => {
    vid.classList.remove('active');
    vid.pause();
    vid.currentTime = 0;
  });

  videos[index].classList.add('active');
  videos[index].muted = muted;
  videos[index].play();

  titleEl.innerHTML = titles[index];
  subtitleEl.innerHTML = subtitles[index];
}

// Auto play next video when one ends
videos.forEach((video, index) => {
  video.addEventListener('ended', () => {
    current = (index + 1) % videos.length;
    showSlide(current);
  });
});

// Manual arrows
prevBtn.addEventListener('click', () => {
  current = (current - 1 + videos.length) % videos.length;
  showSlide(current);
});
nextBtn.addEventListener('click', () => {
  current = (current + 1) % videos.length;
  showSlide(current);
});

// Mute/unmute
volumeBtn.addEventListener('click', () => {
  muted = !muted;
  videos.forEach(v => v.muted = muted);
  volumeIcon.src = muted ? 'assets/mute.svg' : 'assets/unmute.svg';
});

// Navbar background scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
    // Close mobile menu when scrolling
    const navLinks = document.querySelector(".nav-links");
    const hamburgerMenu = document.getElementById("hamburger-menu");
    if (navLinks && hamburgerMenu) {
      navLinks.classList.remove("mobile-menu-open");
      hamburgerMenu.classList.remove("active");
    }
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile Hamburger Menu Functionality
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.getElementById("navbar");

  if (hamburgerMenu && navLinks) {
    hamburgerMenu.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Always allow menu toggle on mobile
      navLinks.classList.toggle("mobile-menu-open");
      hamburgerMenu.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbar.classList.contains("scrolled") && 
          navLinks.classList.contains("mobile-menu-open") &&
          !hamburgerMenu.contains(e.target) && 
          !navLinks.contains(e.target)) {
        navLinks.classList.remove("mobile-menu-open");
        hamburgerMenu.classList.remove("active");
      }
    });

    // Close menu when clicking on nav links
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A" && navLinks.classList.contains("mobile-menu-open")) {
        navLinks.classList.remove("mobile-menu-open");
        hamburgerMenu.classList.remove("active");
      }
    });
    
    // Close menu on window resize to larger screen
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navLinks.classList.remove("mobile-menu-open");
        hamburgerMenu.classList.remove("active");
      }
    });
  }
});

// Initialize first video
showSlide(current);



 document.addEventListener("DOMContentLoaded", () => {
  // ------------------- Step Section ------------------- //
  const steps = [
    {
      number: "Step 01",
      title: "Design Creation",
      video: "videos/design-creation.mp4",
      desc: "Our master designers craft a digital or hand-drawn concept, forming the base of each masterpiece."
    },
    {
      number: "Step 02",
      title: "Pre Casting",
      video: "videos/pre-casting.mp4",
      desc: "A wax model mirrors the design and is encased in a mould. The wax burns out, leaving a cavity for metal."
    },
    {
      number: "Step 03",
      title: "Casting",
      video: "videos/casting.mp4",
      desc: "Gold or silver is melted and poured into a mould. After cooling, the mould is broken to reveal the shape."
    },
    {
      number: "Step 04",
      title: "Stone Setting",
      video: "videos/stone-setting.mp4",
      desc: "Artisans hand-place each diamond or stone with precision, ensuring symmetry and secure settings."
    },
    {
      number: "Step 05",
      title: "Polishing & Finishing",
      video: "videos/polishing.mp4",
      desc: "Final polishing and finishing are done to give the jewelry its signature sparkle and smooth finish."
    }
  ];

  const video = document.getElementById('processVideo');
  const stepNumber = document.getElementById('stepNumber');
  const stepTitle = document.getElementById('stepTitle');
  const stepDesc = document.getElementById('stepDesc');
  const dots = document.querySelectorAll('.dot');

  function updateStep(index) {
    const step = steps[index];
    if (video) video.src = step.video;
    if (stepNumber) stepNumber.textContent = step.number;
    if (stepTitle) stepTitle.textContent = step.title;
    if (stepDesc) stepDesc.textContent = step.desc;

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  if (dots.length > 0) {
    updateStep(0); // Initial

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-step'));
        updateStep(index);
      });
    });
  }

  // ------------------- Infrastructure Carousel Section ------------------- //
  const carousel = document.getElementById("carousel");
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  let index = 0;
  let autoSlideInterval;
  
  // Check if carousel elements exist
  if (!carousel || slides.length === 0) {
    console.log("Carousel elements not found");
    return;
  }
  
  // Ensure all images are loaded before initializing carousel
  function ensureImagesLoaded() {
    const images = carousel.querySelectorAll('img');
    let loadedCount = 0;
    
    if (images.length === 0) {
      initializeCarousel();
      return;
    }
    
    images.forEach(img => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.onload = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            initializeCarousel();
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            initializeCarousel();
          }
        };
      }
    });
    
    if (loadedCount === images.length) {
      initializeCarousel();
    }
  }
  
  // Function to get slides per page based on screen size
  function getSlidesPerPage() {
    if (window.innerWidth <= 480) {
      return 1; // Mobile: 1 slide
    } else if (window.innerWidth <= 768) {
      return 2; // Tablet: 2 slides
    } else {
      return 3; // Desktop: 3 slides
    }
  }

  function showSlide(i) {
    const slidesPerPage = getSlidesPerPage();
    index = Math.max(0, Math.min(i, totalSlides - slidesPerPage));
    
    // For mobile, ensure we don't go beyond available slides
    if (slidesPerPage === 1) {
      index = Math.max(0, Math.min(i, totalSlides - 1));
    }
    
    const slideWidth = 100 / slidesPerPage;
    const shift = index * slideWidth;
    carousel.style.transform = `translateX(-${shift}%)`;
    
    // Force repaint for mobile browsers
    carousel.style.display = 'flex';
    carousel.offsetHeight; // Trigger reflow
  }

  function nextSlide() {
    const slidesPerPage = getSlidesPerPage();
    if (slidesPerPage === 1) {
      // Mobile: move one slide at a time
      if (index < totalSlides - 1) {
        index++;
      } else {
        index = 0; // Loop back to start
      }
    } else {
      // Tablet/Desktop: move by slidesPerPage
      if (index + slidesPerPage < totalSlides) {
        index++;
      } else {
        index = 0;
      }
    }
    showSlide(index);
  }

  function prevSlide() {
    const slidesPerPage = getSlidesPerPage();
    if (slidesPerPage === 1) {
      // Mobile: move one slide at a time
      if (index > 0) {
        index--;
      } else {
        index = totalSlides - 1; // Go to last slide
      }
    } else {
      // Tablet/Desktop: move by slidesPerPage
      if (index > 0) {
        index--;
      } else {
        index = Math.max(0, totalSlides - slidesPerPage);
      }
    }
    showSlide(index);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  
  // Handle window resize
  function handleResize() {
    // Reset index for new screen size
    const slidesPerPage = getSlidesPerPage();
    if (index >= totalSlides - slidesPerPage + 1) {
      index = Math.max(0, totalSlides - slidesPerPage);
    }
    showSlide(index);
  }
  
  function initializeCarousel() {
    // Setup carousel after images are loaded
    showSlide(0);
    startAutoSlide();
    
    // Add event listeners
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const carouselContainer = document.querySelector(".carousel-container");
    
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        stopAutoSlide();
        prevSlide();
        setTimeout(startAutoSlide, 2000); // Restart auto-slide after 2 seconds
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        stopAutoSlide();
        nextSlide();
        setTimeout(startAutoSlide, 2000); // Restart auto-slide after 2 seconds
      });
    }
    
    if (carouselContainer) {
      carouselContainer.addEventListener("mouseenter", stopAutoSlide);
      carouselContainer.addEventListener("mouseleave", startAutoSlide);
    }
  }
  
  window.addEventListener('resize', handleResize);
  
  // Initialize carousel with image loading check
  ensureImagesLoaded();

  // ------------------- Diamond Quality Accordion Section ------------------- //
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const icon = otherItem.querySelector('.icon');
        icon.textContent = '+';
      });
      
      // If the clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
        const icon = item.querySelector('.icon');
        icon.textContent = '×';
      }
    });
  });
  
  // ------------------- Testimonials Section ------------------- //
  // Static testimonials layout - no slider functionality needed
  // The testimonials section now displays a fixed layout with 
  // left and right client images with play buttons, and center text content
  
  // Add click handlers for play buttons if needed
  const playButtons = document.querySelectorAll('.play-button');
  playButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Handle video play functionality here
      console.log('Play button clicked');
    });
  });
  
  // ------------------- Testimonial Modal ------------------- //
  const modal = document.getElementById('testimonialModal');
  const readMoreBtn = document.querySelector('.read-more');
  const closeBtn = document.querySelector('.close-btn');
  
  // Open modal when "Read More" is clicked
  if (readMoreBtn) {
    readMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  }
  
  // Close modal when close button is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling
    });
  }
  
  // Close modal when clicking outside the modal content
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  });
});

function setCarouselTrackWidth() {
  const track = document.getElementById('carousel');
  const slides = track ? track.querySelectorAll('.slide') : [];
  if (window.innerWidth <= 768 && track && slides.length) {
    track.style.width = (slides.length * window.innerWidth) + 'px';
  } else if (track) {
    track.style.width = '';
  }
}

window.addEventListener('resize', setCarouselTrackWidth);
document.addEventListener('DOMContentLoaded', setCarouselTrackWidth);
