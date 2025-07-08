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
  } else {
    navbar.classList.remove("scrolled");
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
  const slidesPerPage = 3;
  let index = 0;
  let autoSlideInterval;

  function showSlide(i) {
    index = (i + totalSlides) % totalSlides;
    const shift = index * (100 / slidesPerPage);
    carousel.style.transform = `translateX(-${shift}%)`;
  }

  function nextSlide() {
    if (index + slidesPerPage < totalSlides) {
      index++;
    } else {
      index = 0;
    }
    showSlide(index);
  }

  function prevSlide() {
    if (index > 0) {
      index--;
    } else {
      index = totalSlides - slidesPerPage;
    }
    showSlide(index);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Setup
  showSlide(0);
  startAutoSlide();

  document.getElementById("prevBtn").addEventListener("click", () => {
    stopAutoSlide();
    prevSlide();
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    stopAutoSlide();
    nextSlide();
  });

  document.querySelector(".carousel-container").addEventListener("mouseenter", stopAutoSlide);
  document.querySelector(".carousel-container").addEventListener("mouseleave", startAutoSlide);

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
