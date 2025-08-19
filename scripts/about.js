// About page functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileToggle = document.querySelector('[data-id="mobile-menu-toggle"]');
  const mobileNav = document.querySelector('[data-id="mobile-nav"]');
  
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('hidden');
      
      // Toggle icon
      const icon = mobileToggle.querySelector('i');
      if (mobileNav.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
      } else {
        icon.setAttribute('data-lucide', 'x');
      }
      lucide.createIcons();
    });
  }

  // Animate stats counter
  function animateCounters() {
    const counters = document.querySelectorAll('[data-id^="stat-number-"]');
    
    counters.forEach(counter => {
      const target = counter.textContent;
      const number = parseInt(target.replace(/[^0-9]/g, ''));
      const suffix = target.replace(/[0-9]/g, '');
      let current = 0;
      const increment = number / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + suffix;
        }
      }, 20);
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add fade-in animation
        entry.target.classList.add('animate-fade-in');
        
        // Trigger counter animation for stats section
        if (entry.target.getAttribute('data-id') === 'stats-section') {
          animateCounters();
        }
      }
    });
  }, observerOptions);

  // Observe sections for animations
  const sections = document.querySelectorAll('[data-id$="-section"]');
  sections.forEach(section => observer.observe(section));

  // Team member hover effects
  document.querySelectorAll('[data-id^="team-member-"]').forEach(member => {
    member.addEventListener('mouseenter', function() {
      const image = this.querySelector('img');
      if (image) {
        image.style.transform = 'scale(1.05)';
        image.style.transition = 'transform 0.3s ease';
      }
    });

    member.addEventListener('mouseleave', function() {
      const image = this.querySelector('img');
      if (image) {
        image.style.transform = 'scale(1)';
      }
    });
  });

  // Add smooth scroll for any anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.8s ease-out forwards;
  }

  [data-id^="team-member-"] img {
    transition: transform 0.3s ease;
  }

  [data-id^="value-"] {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  [data-id^="value-"]:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;
document.head.appendChild(style);