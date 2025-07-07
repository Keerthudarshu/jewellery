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



   const steps = [
    {
      number: "Step 01",
      title: "Design Creation",
      video: "video1.mp4",
      desc: "Our master designers craft a digital or hand-drawn concept, forming the base of each masterpiece. Every detail is precision-engineered."
    },
    {
      number: "Step 02",
      title: "Pre Casting",
      video: "video2.mp4",
      desc: "A wax model mirrors the design and is encased in a mould. The wax burns out, leaving a cavity for metal, while sprues ensure flow."
    },
    {
      number: "Step 03",
      title: "Casting",
      video: "video3.mp4",
      desc: "Gold, platinum, or silver is melted in a furnace and poured into a mould. After cooling, the mould is broken, revealing a raw metal piece."
    },
    {
      number: "Step 04",
      title: "Stone Setting",
      video: "video4.mp4",
      desc: "Skilled artisans meticulously set each diamond or gemstone by hand, ensuring symmetry, brilliance, and strong hold."
    },
    {
      number: "Step 05",
      title: "Polishing & Finishing",
      video: "video5.mp4",
      desc: "The final masterpiece is polished, buffed, and finished to ensure a flawless shine and smooth surface — ready to dazzle."
    }
  ];

  function showStep(index) {
    document.getElementById("step-number").textContent = steps[index].number;
    document.getElementById("step-title").textContent = steps[index].title;
    document.getElementById("step-description").textContent = steps[index].desc;

    const videoElement = document.getElementById("step-video");
    videoElement.src = steps[index].video;
    videoElement.load();
    videoElement.play();

    // Highlight active dot
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }