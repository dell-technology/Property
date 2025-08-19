// Properties page functionality
document.addEventListener('DOMContentLoaded', function() {
  // Sample property data
  const properties = [
    {
      id: 1,
      title: "Modern Luxury Villa",
      price: "$850,000",
      location: "Miami, FL",
      type: "villa",
      beds: 4,
      baths: 3,
      sqft: "2,500",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "For Sale",
      isNewLaunch: true,
      isReadyToMove: false,
      isPremium: true,
      description: "Beautiful 4-bedroom villa with ocean views, modern amenities, and private pool."
    },
    {
      id: 2,
      title: "Downtown Penthouse",
      price: "$3,200/mo",
      location: "New York, NY",
      type: "apartment",
      beds: 3,
      baths: 2,
      sqft: "1,800",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "For Rent",
      isNewLaunch: false,
      isReadyToMove: true,
      isPremium: true,
      description: "Stunning penthouse with city views, luxury finishes, and prime downtown location."
    },
    {
      id: 3,
      title: "Suburban Family Home",
      price: "$425,000",
      location: "Chicago, IL",
      type: "house",
      beds: 5,
      baths: 4,
      sqft: "3,200",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "For Sale",
      isNewLaunch: true,
      isReadyToMove: false,
      isPremium: false,
      description: "Spacious family home in quiet neighborhood with large backyard and garage."
    },
    {
      id: 4,
      title: "Modern Condo",
      price: "$320,000",
      location: "Los Angeles, CA",
      type: "condo",
      beds: 2,
      baths: 2,
      sqft: "1,200",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "For Sale",
      isNewLaunch: false,
      isReadyToMove: true,
      isPremium: true,
      description: "Contemporary condo with modern finishes and great amenities."
    },
    {
      id: 5,
      title: "Luxury Townhouse",
      price: "$675,000",
      location: "Miami, FL",
      type: "house",
      beds: 3,
      baths: 3,
      sqft: "2,100",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "For Sale",
      isNewLaunch: true,
      isReadyToMove: false,
      isPremium: false,
      description: "Elegant townhouse with premium finishes and private patio."
    },
    {
      id: 6,
      title: "Studio Apartment",
      price: "$1,800/mo",
      location: "New York, NY",
      type: "apartment",
      beds: 1,
      baths: 1,
      sqft: "600",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "For Rent",
      isNewLaunch: true,
      isReadyToMove: false,
      isPremium: true,
      description: "Cozy studio in prime location with modern amenities."
    },
    {
      id: 7,
      title: "Waterfront Villa",
      price: "$1,250,000",
      location: "Miami, FL",
      type: "villa",
      beds: 5,
      baths: 4,
      sqft: "3,800",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "For Sale",
      description: "Stunning waterfront villa with private dock and panoramic views."
    },
    {
      id: 8,
      title: "Modern Loft",
      price: "$2,500/mo",
      location: "Chicago, IL",
      type: "apartment",
      beds: 2,
      baths: 2,
      sqft: "1,400",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "For Rent",
      description: "Industrial-style loft with high ceilings and exposed brick."
    },
    {
      id: 9,
      title: "Country Estate",
      price: "$950,000",
      location: "Los Angeles, CA",
      type: "house",
      beds: 6,
      baths: 5,
      sqft: "4,500",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "For Sale",
      description: "Magnificent estate with sprawling grounds and luxury amenities."
    }
  ];

  let displayedProperties = [];
  let filteredProperties = [...properties];
  let currentPage = 0;
  const propertiesPerPage = 6;

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

  // Load URL parameters on page load
  function loadURLFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('location')) {
      document.querySelector('[data-id="location-select"]').value = urlParams.get('location');
    }
    if (urlParams.get('type')) {
      document.querySelector('[data-id="type-select"]').value = urlParams.get('type');
    }
    if (urlParams.get('price')) {
      document.querySelector('[data-id="price-select"]').value = urlParams.get('price');
    }
  }

  // Create property card HTML
  function createPropertyCard(property) {
    const statusColor = property.status === 'For Rent' ? 'bg-green-500' : 'bg-primary';
    
    return `
      <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" data-id="property-card-${property.id}">
        ${property.isNewLaunch ? '<div class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">NEW LAUNCH</div>' : ''}
        <div class="relative" data-id="property-image-${property.id}">
          <img src="${property.image}" alt="${property.title}" class="w-full h-64 object-cover">
          <div class="absolute top-4 left-4 ${statusColor} text-white px-3 py-1 rounded-full text-sm font-semibold" data-id="property-status-${property.id}">
            ${property.status}
          </div>
          <div class="absolute top-4 right-4 bg-white p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer" data-id="favorite-btn-${property.id}">
            <i data-lucide="heart" class="w-5 h-5 text-gray-600"></i>
          </div>
        </div>
        <div class="p-6" data-id="property-content-${property.id}">
          <div class="flex items-center justify-between mb-2" data-id="property-price-${property.id}">
            <h3 class="text-2xl font-bold text-primary">${property.price}</h3>
            <span class="text-sm text-gray-500">${property.location}</span>
          </div>
          <h4 class="text-lg font-semibold text-gray-800 mb-2" data-id="property-title-${property.id}">${property.title}</h4>
          <p class="text-gray-600 mb-4" data-id="property-description-${property.id}">
            ${property.description}
          </p>
          <div class="flex items-center justify-between text-sm text-gray-500 mb-4" data-id="property-features-${property.id}">
            <span class="flex items-center gap-1"><i data-lucide="bed" class="w-4 h-4"></i> ${property.beds} Beds</span>
            <span class="flex items-center gap-1"><i data-lucide="bath" class="w-4 h-4"></i> ${property.baths} Baths</span>
            <span class="flex items-center gap-1"><i data-lucide="maximize" class="w-4 h-4"></i> ${property.sqft} ft²</span>
          </div>
          <button class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors" data-id="view-details-btn-${property.id}">
            View Details
          </button>
        </div>
      </div>
    `;
  }

  // Filter properties based on current filter selections
  function filterProperties() {
    const location = document.querySelector('[data-id="location-select"]').value;
    const type = document.querySelector('[data-id="type-select"]').value;
    const priceRange = document.querySelector('[data-id="price-select"]').value;
    const bedrooms = document.querySelector('[data-id="bedrooms-select"]').value;

    filteredProperties = properties.filter(property => {
      // Location filter
      if (location && !property.location.toLowerCase().includes(location.replace('-', ' '))) {
        return false;
      }

      // Type filter
      if (type && property.type !== type) {
        return false;
      }

      // Bedrooms filter
      if (bedrooms && property.beds < parseInt(bedrooms)) {
        return false;
      }

      // Price filter (simplified - would need more complex logic for rentals vs sales)
      if (priceRange) {
        const price = parseInt(property.price.replace(/[$,k]/g, '').replace('/mo', ''));
        switch (priceRange) {
          case '100-300':
            return price >= 100000 && price <= 300000;
          case '300-500':
            return price >= 300000 && price <= 500000;
          case '500-1000':
            return price >= 500000 && price <= 1000000;
          case '1000+':
            return price > 1000000;
        }
      }

      return true;
    });

    currentPage = 0;
    displayProperties();
    updateResultsCount();
  }

  // Sort properties
  function sortProperties() {
    const sortBy = document.querySelector('[data-id="sort-select"]').value;

    switch (sortBy) {
      case 'price-low':
        filteredProperties.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[$,k]/g, '').replace('/mo', ''));
          const priceB = parseInt(b.price.replace(/[$,k]/g, '').replace('/mo', ''));
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filteredProperties.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[$,k]/g, '').replace('/mo', ''));
          const priceB = parseInt(b.price.replace(/[$,k]/g, '').replace('/mo', ''));
          return priceB - priceA;
        });
        break;
      case 'size':
        filteredProperties.sort((a, b) => {
          const sizeA = parseInt(a.sqft.replace(',', ''));
          const sizeB = parseInt(b.sqft.replace(',', ''));
          return sizeB - sizeA;
        });
        break;
      default:
        // newest first (default order)
        filteredProperties.sort((a, b) => b.id - a.id);
    }

    displayProperties();
  }

  // Display properties
  function displayProperties() {
    const container = document.getElementById('properties-container');
    const startIndex = currentPage * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const propertiesToShow = filteredProperties.slice(0, endIndex);

    container.innerHTML = propertiesToShow.map(property => createPropertyCard(property)).join('');

    // Re-initialize Lucide icons
    lucide.createIcons();

    // Add event listeners to new cards
    addPropertyCardListeners();

    // Show/hide load more button
    const loadMoreBtn = document.querySelector('[data-id="load-more-btn"]');
    if (loadMoreBtn) {
      if (endIndex >= filteredProperties.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-block';
      }
    }
  }

  // Add event listeners to property cards
  function addPropertyCardListeners() {
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

    // View details buttons
    document.querySelectorAll('[data-id^="view-details-btn-"]').forEach(btn => {
      btn.addEventListener('click', function() {
        const propertyId = this.getAttribute('data-id').replace('view-details-btn-', '');
        window.location.href = `property-detail.html?id=${propertyId}`;
      });
    });
  }

  // Update results count
  function updateResultsCount() {
    const resultsCount = document.querySelector('[data-id="results-count"]');
    const totalResults = filteredProperties.length;
    const displayedCount = Math.min((currentPage + 1) * propertiesPerPage, totalResults);
    
    if (resultsCount) {
      resultsCount.textContent = `Showing ${displayedCount} of ${totalResults} properties`;
    }
  }

  // Event listeners
  document.querySelector('[data-id="search-btn"]').addEventListener('click', filterProperties);
  document.querySelector('[data-id="sort-select"]').addEventListener('change', sortProperties);
  
  const loadMoreBtn = document.querySelector('[data-id="load-more-btn"]');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      currentPage++;
      displayProperties();
    });
  }

  // Quick filter buttons
  function initQuickFilters() {
    const quickFilterButtons = document.querySelectorAll('[data-id^="filter-"]');
    
    quickFilterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Reset all button states
        quickFilterButtons.forEach(btn => {
          btn.classList.remove('bg-blue-600', 'text-white');
          btn.classList.add('bg-white', 'text-gray-700');
        });
        
        // Activate clicked button
        button.classList.remove('bg-white', 'text-gray-700');
        button.classList.add('bg-blue-600', 'text-white');
        
        // Apply filter
        const filterId = button.getAttribute('data-id');
        applyQuickFilter(filterId);
      });
    });
  }
  
  function applyQuickFilter(filterId) {
    let currentFilteredProperties = [...properties]; // Start with all properties for quick filters
    
    switch(filterId) {
      case 'filter-new-launch':
        currentFilteredProperties = properties.filter(p => p.isNewLaunch);
        break;
      case 'filter-ready-move':
        currentFilteredProperties = properties.filter(p => p.isReadyToMove);
        break;
      case 'filter-premium':
        currentFilteredProperties = properties.filter(p => p.isPremium);
        break;
      case 'filter-luxury':
        currentFilteredProperties = properties.filter(p => parseInt(p.price.replace(/[$,]/g, '')) > 500000); // Assuming prices are in USD and > $500k is luxury
        break;
      case 'filter-affordable':
        currentFilteredProperties = properties.filter(p => parseInt(p.price.replace(/[$,]/g, '')) < 300000); // Assuming prices are in USD and < $300k is affordable
        break;
      default:
        // If no specific quick filter, revert to the main filter logic or show all
        filterProperties(); // Re-apply main filters if no quick filter is active
        return; // Exit to prevent double display
    }
    
    filteredProperties = currentFilteredProperties; // Update the global filteredProperties
    currentPage = 0; // Reset pagination
    displayProperties();
    updateResultsCount();
  }

  // Initialize page
  loadURLFilters();
  filterProperties();
  initQuickFilters();
});