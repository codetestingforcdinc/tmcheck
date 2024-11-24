// GSAP Marquee Animation (smooth scrolling with pauses between each image)
const marquee = document.querySelector('.marquee');
const items = document.querySelectorAll('.marquee .item');

const itemWidth = 150 + 50;  // 150px image width + 50px gap
const totalWidth = items.length * itemWidth;  // Total width of all images combined

// Clone the images for seamless looping without modifying HTML
for (let i = 0; i < items.length; i++) {
    const clone = items[i].cloneNode(true);  // Clone each item
    marquee.appendChild(clone);  // Append the clone to the marquee
}

// GSAP timeline for smooth scrolling with pauses
const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power1.inOut" } });

items.forEach((item, index) => {
    tl.to(marquee, {
        x: `-=${itemWidth}`,  // Slide left by one item's width
        duration: 1.5,  // Slide duration (adjust for speed)
        ease: "power1.inOut"
    })
    .to(marquee, {
        x: `+=0`,  // Pause after sliding
        duration: 1,  // Pause duration (adjust as needed)
        ease: "none"
    });
});

// Ensure smooth looping with seamless transition after the last image
gsap.to(marquee, {
    x: 0,  // Reset to starting position when the last image moves out
    duration: 0,  // Instant reset to avoid any jump
    delay: items.length * 2.5,  // Delay based on the total number of images and time per image
    repeat: -1,  // Infinite repeat for continuous marquee
    ease: "none"
});

// Pause marquee on hover and resume after hover ends
marquee.addEventListener('mouseenter', () => {
    tl.pause();  // Pause the animation
});

marquee.addEventListener('mouseleave', () => {
    tl.resume();  // Resume the animation
});


// Carousel Image Slider (with seamless looping and smooth transition from img3 to img1)
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

// Clone the first slide and append it to the end to create a seamless loop
const carouselSlide = document.querySelector('.carousel-slide');
const firstClone = slides[0].cloneNode(true);
carouselSlide.appendChild(firstClone);

const totalSlidesWithClone = totalSlides + 1;  // Total slides including the cloned first slide

function showSlide(index) {
  const slideWidth = slides[0].offsetWidth;
  carouselSlide.style.transition = 'transform 0.5s ease-in-out';  // Smooth transition
  carouselSlide.style.transform = `translateX(${-slideWidth * index}px)`;
}

function nextSlide() {
  currentSlide++;
  
  if (currentSlide === totalSlidesWithClone) {
    // If it's the cloned slide, jump instantly back to the first real slide
    setTimeout(() => {
      carouselSlide.style.transition = 'none';  // Disable transition
      currentSlide = 0;  // Reset to first slide
      showSlide(currentSlide);
    }, 500);  // Wait for the transition to finish
  } else {
    showSlide(currentSlide);
  }
}

function prevSlide() {
  currentSlide--;
  
  if (currentSlide < 0) {
    // Jump to the last slide (seamlessly)
    currentSlide = totalSlides - 1;
    carouselSlide.style.transition = 'none';  // Disable transition for the jump
    showSlide(currentSlide);
  } else {
    showSlide(currentSlide);
  }
}

// Auto slide every 3 seconds
setInterval(nextSlide, 3000);

// Event listeners for carousel control buttons
document.querySelector('.carousel-next').addEventListener('click', nextSlide);
document.querySelector('.carousel-prev').addEventListener('click', prevSlide);

// Initial setup: Show the first slide
showSlide(currentSlide);

// THE BELOW IS FOR FORM SUBMISSION
