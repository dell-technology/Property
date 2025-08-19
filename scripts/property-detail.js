// Property detail page functionality
document.addEventListener('DOMContentLoaded', function() {
  // Sample property data (in a real app, this would come from an API)
  const properties = {
    1: {
      id: 1,
      title: "Modern Luxury Villa",
      price: "$850,000",
      location: "Miami, FL",
      type: "villa",
      beds: 4,
      baths: 3,
      sqft: "2,500",
      yearBuilt: 2020,
      status: "For Sale",
      description: `This stunning modern luxury villa represents the pinnacle of contemporary design and sophisticated living. Located in one of Miami's most prestigious neighborhoods, this property offers an unparalleled lifestyle experience.

The open-concept design seamlessly blends indoor and outdoor living spaces, creating an environment perfect for both relaxation and entertainment. Floor-to-ceiling windows flood the interior with natural light while providing breathtaking views of the surrounding landscape.

The gourmet kitchen features top-of-the-line appliances, custom cabinetry, and a large island perfect for casual dining and entertaining. The master suite is a private retreat with a spa-like ensuite bathroom, walk-in closet, and private balcony overlooking the pool area.

Additional highlights include a private pool, landscaped gardens, smart home technology, and a two-car garage. This property is perfect for those seeking luxury, privacy, and modern convenience in one of Florida's most desirable locations.`,
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ]
    },
    2: {
      id: 2,
      title: "Downtown Penthouse",
      price: "$3,200/mo",
      location: "New York, NY",
      type: "apartment",
      beds: 3,
      baths: 2,
      sqft: "1,800",
      yearBuilt: 2018,
      status: "For Rent",
      description: `Experience luxury living in the heart of Manhattan with this stunning penthouse apartment. This sophisticated residence offers breathtaking city views and premium amenities in one of New York's most coveted locations.

The open-plan living area features soaring ceilings, hardwood floors, and floor-to-ceiling windows that showcase panoramic views of the city skyline. The modern kitchen boasts high-end appliances, granite countertops, and custom cabinetry.

The master bedroom suite offers a peaceful retreat with an ensuite bathroom featuring marble finishes and a spa-like atmosphere. Two additional bedrooms provide flexibility for guests or home office space.

Building amenities include 24/7 concierge service, fitness center, rooftop terrace, and private parking. Located within walking distance of world-class shopping, dining, and entertainment venues.`,
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ]
    },
    3: {
      id: 3,
      title: "Suburban Family Home",
      price: "$425,000",
      location: "Chicago, IL",
      type: "house",
      beds: 5,
      baths: 4,
      sqft: "3,200",
      yearBuilt: 2015,
      status: "For Sale",
      description: `Discover the perfect family home in this charming suburban neighborhood. This spacious property offers comfort, convenience, and quality construction in a family-friendly community.

The welcoming foyer leads to an open-concept living area perfect for family gatherings and entertaining. The updated kitchen features modern appliances, ample counter space, and a breakfast nook overlooking the backyard.

Five generously sized bedrooms provide plenty of space for a growing family, including a master suite with walk-in closet and ensuite bathroom. The finished basement offers additional living space perfect for recreation or home office use.

The large backyard is ideal for outdoor activities and includes a wooden deck perfect for summer barbecues. Additional features include a two-car garage, central air conditioning, and proximity to excellent schools and parks.`,
      images: [
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ]
    }
  };

  // Get property ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get('id') || '1';
  const property = properties[propertyId];

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

  // Load property data
  function loadPropertyData() {
    if (!property) {
      // Property not found, redirect to properties page
      window.location.href = 'properties.html';
      return;
    }

    // Update basic information
    document.querySelector('[data-id="property-title"]').textContent = property.title;
    document.querySelector('[data-id="property-location"] span').textContent = property.location;
    document.querySelector('[data-id="property-price"]').textContent = property.price;
    document.querySelector('[data-id="property-status"]').textContent = property.status;
    
    // Update status color
    const statusElement = document.querySelector('[data-id="property-status"]');
    if (property.status === 'For Rent') {
      statusElement.className = 'bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold';
    }

    // Update breadcrumb
    document.querySelector('[data-id="breadcrumb-current"]').textContent = property.title;

    // Update features
    document.querySelector('[data-id="beds-count"]').textContent = property.beds;
    document.querySelector('[data-id="baths-count"]').textContent = property.baths;
    document.querySelector('[data-id="sqft-count"]').textContent = property.sqft;
    document.querySelector('[data-id="year-built"]').textContent = property.yearBuilt;

    // Update description
    const descriptionElement = document.querySelector('[data-id="property-description"]');
    const paragraphs = property.description.split('\n\n').map(p => `<p class="mb-4">${p}</p>`).join('');
    descriptionElement.innerHTML = paragraphs;

    // Update images
    loadPropertyImages();
    
    // Update page title
    document.title = `${property.title} - Elite Properties`;
  }

  // Load property images
  function loadPropertyImages() {
    const images = property.images;
    
    // Main image
    document.querySelector('[data-id="main-image"]').src = images[0];
    
    // Thumbnail images
    for (let i = 1; i <= 4 && i < images.length; i++) {
      const thumbElement = document.querySelector(`[data-id="thumb-${i}"]`);
      if (thumbElement) {
        thumbElement.src = images[i];
      }
    }
  }

  // Gallery functionality
  function setupGallery() {
    const mainImage = document.querySelector('[data-id="main-image"]');
    const thumbnails = document.querySelectorAll('[data-id^="thumb-"]');
    
    // Thumbnail click handlers
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', function() {
        mainImage.src = this.src;
        
        // Update active thumbnail styling
        thumbnails.forEach(t => t.classList.remove('ring-4', 'ring-primary'));
        this.classList.add('ring-4', 'ring-primary');
      });
    });

    // View all photos overlay
    const viewAllOverlay = document.querySelector('[data-id="view-all-overlay"]');
    if (viewAllOverlay) {
      viewAllOverlay.addEventListener('click', function() {
        // In a real app, this would open a lightbox gallery
        alert('Gallery lightbox would open here showing all photos');
      });
    }
  }

  // Contact form handling
  function setupContactForms() {
    // Quick inquiry form
    const inquiryForm = document.querySelector('[data-id="inquiry-form"]');
    if (inquiryForm) {
      inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
          name: document.querySelector('[data-id="inquiry-name"]').value,
          email: document.querySelector('[data-id="inquiry-email"]').value,
          phone: document.querySelector('[data-id="inquiry-phone"]').value,
          message: document.querySelector('[data-id="inquiry-message"]').value,
          propertyId: propertyId
        };
        
        // Simulate form submission
        alert('Thank you for your inquiry! We\'ll contact you within 24 hours.');
        inquiryForm.reset();
        
        console.log('Inquiry submitted:', formData);
      });
    }

    // Contact buttons
    document.querySelector('[data-id="call-agent-btn"]').addEventListener('click', function() {
      window.open('tel:+15551234567');
    });

    document.querySelector('[data-id="message-agent-btn"]').addEventListener('click', function() {
      // Scroll to inquiry form
      document.querySelector('[data-id="inquiry-form"]').scrollIntoView({ 
        behavior: 'smooth' 
      });
      document.querySelector('[data-id="inquiry-name"]').focus();
    });
  }

  // Property actions
  function setupPropertyActions() {
    // Save property
    document.querySelector('[data-id="save-property-btn"]').addEventListener('click', function() {
      const icon = this.querySelector('i');
      const text = this.querySelector('span');
      
      if (icon.getAttribute('data-lucide') === 'heart') {
        icon.setAttribute('data-lucide', 'heart');
        icon.classList.add('fill-current', 'text-red-500');
        text.innerHTML = '<i data-lucide="heart" class="w-5 h-5 fill-current text-red-500"></i>Saved';
        alert('Property saved to your favorites!');
      } else {
        icon.setAttribute('data-lucide', 'heart');
        icon.classList.remove('fill-current', 'text-red-500');
        text.innerHTML = '<i data-lucide="heart" class="w-5 h-5"></i>Save Property';
        alert('Property removed from favorites.');
      }
      lucide.createIcons();
    });

    // Share property
    document.querySelector('[data-id="share-property-btn"]').addEventListener('click', function() {
      if (navigator.share) {
        navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: window.location.href
        });
      } else {
        // Fallback for browsers without native sharing
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert('Property link copied to clipboard!');
        });
      }
    });

    // Schedule tour
    document.querySelector('[data-id="schedule-tour-btn"]').addEventListener('click', function() {
      alert('Tour scheduling feature would open here. You would be redirected to a calendar booking system.');
    });
  }

  // Load similar properties
  function loadSimilarProperties() {
    const similarContainer = document.getElementById('similar-properties');
    const similarIds = Object.keys(properties).filter(id => id !== propertyId).slice(0, 3);
    
    similarContainer.innerHTML = similarIds.map(id => {
      const prop = properties[id];
      const statusColor = prop.status === 'For Rent' ? 'bg-green-500' : 'bg-primary';
      
      return `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer" data-id="similar-property-${id}" onclick="window.location.href='property-detail.html?id=${id}'">
          <div class="relative">
            <img src="${prop.images[0]}" alt="${prop.title}" class="w-full h-48 object-cover">
            <div class="absolute top-4 left-4 ${statusColor} text-white px-3 py-1 rounded-full text-sm font-semibold">
              ${prop.status}
            </div>
            <div class="absolute top-4 right-4 bg-white p-2 rounded-full hover:bg-gray-100 transition-colors">
              <i data-lucide="heart" class="w-5 h-5 text-gray-600"></i>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-xl font-bold text-primary">${prop.price}</h3>
              <span class="text-sm text-gray-500">${prop.location}</span>
            </div>
            <h4 class="text-lg font-semibold text-gray-800 mb-2">${prop.title}</h4>
            <div class="flex items-center justify-between text-sm text-gray-500">
              <span class="flex items-center gap-1"><i data-lucide="bed" class="w-4 h-4"></i> ${prop.beds} Beds</span>
              <span class="flex items-center gap-1"><i data-lucide="bath" class="w-4 h-4"></i> ${prop.baths} Baths</span>
              <span class="flex items-center gap-1"><i data-lucide="maximize" class="w-4 h-4"></i> ${prop.sqft} ft²</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Re-initialize Lucide icons for similar properties
    lucide.createIcons();
  }

  // Initialize page
  loadPropertyData();
  setupGallery();
  setupContactForms();
  setupPropertyActions();
  loadSimilarProperties();

  // Phone number formatting for inquiry form
  const phoneInput = document.querySelector('[data-id="inquiry-phone"]');
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

  // Smooth scrolling for internal navigation
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

  // Add scroll-based animations
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

  // Observe cards for animations
  document.querySelectorAll('[data-id$="-card"]').forEach(card => {
    observer.observe(card);
  });
});

// Add CSS animations
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

  .gallery-thumb {
    transition: all 0.3s ease;
  }

  .gallery-thumb:hover {
    transform: scale(1.05);
  }

  .property-action-btn {
    transition: all 0.3s ease;
  }

  .property-action-btn:hover {
    background-color: #f9fafb;
    transform: translateX(4px);
  }
`;
document.head.appendChild(style);