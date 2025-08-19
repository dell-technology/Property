// Homepage interactive functionality
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

  // Smooth scroll for anchor links
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

  // Search functionality
  const searchBtn = document.querySelector('[data-id="search-properties-btn"]');
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      const location = document.querySelector('[data-id="location-select"]').value;
      const propertyType = document.querySelector('[data-id="property-type-select"]').value;
      const price = document.querySelector('[data-id="price-select"]').value;
      
      // Build query string
      const params = new URLSearchParams();
      if (location && location !== 'Select Location') params.append('location', location);
      if (propertyType && propertyType !== 'Any Type') params.append('type', propertyType);
      if (price && price !== 'Any Price') params.append('price', price);
      
      // Navigate to properties page with filters
      window.location.href = `properties.html?${params.toString()}`;
    });
  }

  // Favorite buttons
  document.querySelectorAll('[data-id^="favorite-btn-"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const icon = this.querySelector('i');
      const isFavorited = icon.classList.contains('fill-current');
      
      if (isFavorited) {
        icon.classList.remove('fill-current', 'text-red-500');
        icon.classList.add('text-gray-600');
      } else {
        icon.classList.remove('text-gray-600');
        icon.classList.add('fill-current', 'text-red-500');
      }
    });
  });

  // CTA buttons
  const browseBtn = document.querySelector('[data-id="browse-properties-btn"]');
  if (browseBtn) {
    browseBtn.addEventListener('click', function() {
      window.location.href = 'properties.html';
    });
  }

  const contactBtn = document.querySelector('[data-id="contact-us-btn"]');
  if (contactBtn) {
    contactBtn.addEventListener('click', function() {
      window.location.href = 'contact.html';
    });
  }

  // Property detail buttons
  document.querySelectorAll('[data-id^="view-details-btn-"]').forEach(btn => {
    btn.addEventListener('click', function() {
      // Extract property ID from data-id
      const propertyId = this.getAttribute('data-id').replace('view-details-btn-', '');
      window.location.href = `property-detail.html?id=${propertyId}`;
    });
  });

  // Animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);

  // Observe property cards and feature sections
  document.querySelectorAll('[data-id^="property-card-"], [data-id^="feature-"]').forEach(card => {
    observer.observe(card);
  });

  // Enhanced poster interactions
  function initPosterInteractions() {
    const posters = document.querySelectorAll('[data-id="grand-launch-poster"], [data-id="limited-offer-poster"]');
    
    posters.forEach(poster => {
      poster.addEventListener('mouseenter', () => {
        const badge = poster.querySelector('[data-id$="-badge"]');
        if (badge) {
          badge.style.animation = 'pulse 1s infinite';
        }
      });

      poster.addEventListener('mouseleave', () => {
        const badge = poster.querySelector('[data-id$="-badge"]');
        if (badge) {
          badge.style.animation = '';
        }
      });
    });

    // Add click handlers for CTA buttons
    const ctaButtons = document.querySelectorAll('[data-id$="-cta"]');
    ctaButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Scroll to contact section or open inquiry modal
        const contactSection = document.querySelector('[data-id="contact-section"]') || document.querySelector('footer');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Animate statistics counter
  function animateCounters() {
    const counters = document.querySelectorAll('[data-id$="-number"]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.textContent);
          let current = 0;
          const increment = target / 50;
          
          const updateCounter = () => {
            if (current < target) {
              current += increment;
              counter.textContent = Math.floor(current) + '+';
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + '+';
            }
          };
          
          updateCounter();
          observer.unobserve(counter);
        }
      });
    });
    
    counters.forEach(counter => observer.observe(counter));
  }
  
  // Initialize everything
  initHero();
  initPropertyCards();
  initSearch();
  initPosterInteractions();
  animateCounters();
});

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }
`;
document.head.appendChild(style);