// Contact page functionality
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

  // Form handling
  const contactForm = document.getElementById('contactForm');
  const messageOverlay = document.getElementById('message-overlay');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Collect form data
      const formData = new FormData(contactForm);
      const formObject = {};
      
      for (let [key, value] of formData.entries()) {
        formObject[key] = value;
      }

      // Simulate form submission
      showMessage('success', 'Message Sent!', 'Thank you for your message. We\'ll get back to you within 24 hours.');
      
      // Reset form
      contactForm.reset();
      
      // In a real application, you would send this data to your server
      console.log('Form submitted with data:', formObject);
    });
  }

  // Message overlay functionality
  function showMessage(type, title, message) {
    const overlay = document.querySelector('[data-id="message-overlay"]');
    const iconContainer = document.querySelector('[data-id="message-icon-container"]');
    const icon = document.querySelector('[data-id="message-icon"]');
    const titleElement = document.querySelector('[data-id="message-title"]');
    const messageElement = document.querySelector('[data-id="message-text"]');
    
    if (overlay && iconContainer && icon && titleElement && messageElement) {
      // Set content based on type
      if (type === 'success') {
        iconContainer.className = 'w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100';
        icon.className = 'w-8 h-8 text-green-500';
        icon.setAttribute('data-lucide', 'check-circle');
      } else if (type === 'error') {
        iconContainer.className = 'w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100';
        icon.className = 'w-8 h-8 text-red-500';
        icon.setAttribute('data-lucide', 'x-circle');
      }
      
      titleElement.textContent = title;
      messageElement.textContent = message;
      
      // Show overlay
      overlay.classList.remove('hidden');
      
      // Re-initialize icons
      lucide.createIcons();
    }
  }

  // Close message overlay
  const closeButton = document.querySelector('[data-id="message-close"]');
  if (closeButton && messageOverlay) {
    closeButton.addEventListener('click', function() {
      messageOverlay.classList.add('hidden');
    });

    // Close on overlay click
    messageOverlay.addEventListener('click', function(e) {
      if (e.target === messageOverlay) {
        messageOverlay.classList.add('hidden');
      }
    });
  }

  // Form validation enhancements
  const requiredFields = document.querySelectorAll('input[required], textarea[required]');
  
  requiredFields.forEach(field => {
    // Add real-time validation feedback
    field.addEventListener('blur', function() {
      validateField(this);
    });

    field.addEventListener('input', function() {
      // Clear error styling on input
      this.classList.remove('border-red-500', 'ring-red-500');
      this.classList.add('border-gray-300');
    });
  });

  function validateField(field) {
    const isValid = field.checkValidity();
    
    if (!isValid) {
      field.classList.remove('border-gray-300');
      field.classList.add('border-red-500', 'ring-red-500');
    } else {
      field.classList.remove('border-red-500', 'ring-red-500');
      field.classList.add('border-gray-300');
    }
    
    return isValid;
  }

  // Phone number formatting
  const phoneInput = document.querySelector('[data-id="phone-input"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
      }
      e.target.value = value;
    });
  }

  // Social media hover effects
  document.querySelectorAll('[data-id^="social-"]').forEach(link => {
    if (link.getAttribute('data-id') !== 'social-section' && link.getAttribute('data-id') !== 'social-title') {
      link.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'all 0.3s ease';
      });

      link.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    }
  });

  // Animate form fields on focus
  const formInputs = document.querySelectorAll('input, textarea, select');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });

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

  // Contact method click handlers (for demonstration)
  document.querySelectorAll('[data-id$="-link"]').forEach(link => {
    link.addEventListener('click', function(e) {
      // For tel: and mailto: links, let them work normally
      if (this.getAttribute('href').startsWith('tel:') || this.getAttribute('href').startsWith('mailto:')) {
        return;
      }
      
      e.preventDefault();
      const method = this.getAttribute('data-id').replace('-link', '');
      showMessage('success', 'Contact Information', `You can reach us via ${method}. We'll respond as soon as possible!`);
    });
  });
});

// Add CSS for enhanced form styling
const style = document.createElement('style');
style.textContent = `
  .focused {
    transform: scale(1.02);
    transition: transform 0.2s ease;
  }

  .focused label {
    color: #1a365d;
    font-weight: 600;
  }

  .focused input,
  .focused textarea,
  .focused select {
    border-color: #1a365d;
    box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.1);
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .form-submitting {
    animation: pulse 2s infinite;
  }
`;
document.head.appendChild(style);