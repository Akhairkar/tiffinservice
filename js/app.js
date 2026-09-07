/**
 * TiffinWale - Core Application JavaScript
 * All-India Tiffin Service Discovery & Lead-Generation Platform
 *
 * Designed for pure client-side execution, GitHub Pages compatibility,
 * and seamless future transition to providers.json and REST APIs.
 */

'use strict';

/**
 * Structured Sample Provider Data
 * Ready to be swapped with future providers.json or API payload.
 */
const SAMPLE_PROVIDERS = [
  {
    id: 1,
    businessName: "Annapurna Rasoi Tiffin Service",
    city: "Nagpur",
    state: "Maharashtra",
    locality: "Dharampeth",
    latitude: 21.1458,
    longitude: 79.0882,
    phone: "9876543210",
    whatsapp: "919876543210",
    foodTypes: ["Veg", "Jain", "Homemade"],
    mealTypes: ["Lunch", "Dinner", "Daily", "Monthly"],
    priceStarting: 75,
    monthlyStarting: 2200,
    deliveryAreas: "Dharampeth, Ramdaspeth, Sitabuldi, Gokulpeth",
    deliveryDistance: "Free delivery within 3 km",
    rating: 4.8,
    isSampleRating: true,
    verified: true,
    featured: true,
    description: "Wholesome ghar-ka-khana cooked by experienced home chefs using minimal oil and fresh ingredients. Special Jain no-onion no-garlic dabba prepared separately.",
    menu: {
      dailyThali: "4 Phulkas (Ghee option), Dal Tadka / Kadhi, 2 Seasonal Sabzi (Dry & Gravy), Jeera Rice, Salad & Pickle",
      specialties: "Jain Thali, Maharashtrian Pithla Bhakri on Sundays, Khichdi Kadi",
      timings: "Lunch: 12:00 PM - 2:00 PM | Dinner: 7:30 PM - 9:30 PM"
    }
  },
  {
    id: 2,
    businessName: "Ghar Ka Swaad Tiffin",
    city: "Mumbai",
    state: "Maharashtra",
    locality: "Andheri West",
    latitude: 19.1197,
    longitude: 72.8464,
    phone: "9876543211",
    whatsapp: "919876543211",
    foodTypes: ["Veg", "Jain", "Homemade"],
    mealTypes: ["Lunch", "Daily", "Monthly"],
    priceStarting: 90,
    monthlyStarting: 2600,
    deliveryAreas: "Andheri West, Lokhandwala, Versova, Oshiwara",
    deliveryDistance: "Free delivery within 4 km",
    rating: 4.9,
    isSampleRating: true,
    verified: true,
    featured: true,
    description: "Authentic Gujarati and North Indian pure vegetarian tiffin box. Leak-proof stainless steel packaging delivered by punctual Mumbai dabbawala network.",
    menu: {
      dailyThali: "5 Soft Rotis, Gujarati Dal / Rajasthani Kadhi, Kathol / Paneer Sabzi, Steamed Basmati Rice, Roasted Papad",
      specialties: "Strict Jain preparations, Special Weekend Sweet (Gulab Jamun / Halwa)",
      timings: "Lunch: 11:30 AM - 1:30 PM"
    }
  },
  {
    id: 3,
    businessName: "Maa Ki Rasoi Meal Box",
    city: "Pune",
    state: "Maharashtra",
    locality: "Kothrud",
    latitude: 18.5074,
    longitude: 73.8077,
    phone: "9876543212",
    whatsapp: "919876543212",
    foodTypes: ["Veg", "Non-Veg", "Homemade"],
    mealTypes: ["Lunch", "Dinner", "Daily", "Monthly"],
    priceStarting: 70,
    monthlyStarting: 2100,
    deliveryAreas: "Kothrud, Karve Nagar, Deccan, Cummins College Area",
    deliveryDistance: "Free delivery within 3 km",
    rating: 4.7,
    isSampleRating: true,
    verified: true,
    featured: false,
    description: "Favorite student and young professional mess service in Pune. Balanced nutritional meals with weekly egg curry and chicken combos.",
    menu: {
      dailyThali: "4 Chapatis, Dal Fry, Seasonal Veg / Paneer, Rice, Onion Salad & Curd",
      specialties: "Student Pocket Thali, Wednesday & Sunday Special Egg / Chicken Curry",
      timings: "Lunch: 12:30 PM - 2:30 PM | Dinner: 8:00 PM - 10:00 PM"
    }
  },
  {
    id: 4,
    businessName: "South Spices & North Kitchen",
    city: "Bengaluru",
    state: "Karnataka",
    locality: "Indiranagar",
    latitude: 12.9784,
    longitude: 77.6408,
    phone: "9876543213",
    whatsapp: "919876543213",
    foodTypes: ["Veg", "Homemade"],
    mealTypes: ["Lunch", "Dinner", "Monthly"],
    priceStarting: 80,
    monthlyStarting: 2400,
    deliveryAreas: "Indiranagar, Domlur, HAL, Old Airport Road",
    deliveryDistance: "Free delivery within 3 km",
    rating: 4.8,
    isSampleRating: true,
    verified: true,
    featured: true,
    description: "Homely South Indian sambar-rasam meals and North Indian roti-sabzi meal combos packed hot in eco-friendly biodegradable boxes.",
    menu: {
      dailyThali: "Choice of 4 Chapatis or Sona Masoori Rice, Traditional Sambar, Poriyal / Dry Veg, Rasam, Curd",
      specialties: "South Indian filter coffee add-on, Healthy Millet Rotis",
      timings: "Lunch: 12:00 PM - 2:00 PM | Dinner: 7:30 PM - 9:30 PM"
    }
  },
  {
    id: 5,
    businessName: "Dilli Dabba Kitchen",
    city: "Delhi",
    state: "Delhi",
    locality: "Laxmi Nagar",
    latitude: 28.6315,
    longitude: 77.2773,
    phone: "9876543214",
    whatsapp: "919876543214",
    foodTypes: ["Veg", "Homemade"],
    mealTypes: ["Lunch", "Dinner", "Daily", "Monthly"],
    priceStarting: 65,
    monthlyStarting: 1950,
    deliveryAreas: "Laxmi Nagar, Preet Vihar, Shakarpur, Nirman Vihar",
    deliveryDistance: "Free delivery within 2.5 km",
    rating: 4.6,
    isSampleRating: true,
    verified: true,
    featured: false,
    description: "Pocket-friendly homely food for civil services and CA aspirants in East Delhi. Warm, fresh rotis delivered right around exam prep hours.",
    menu: {
      dailyThali: "5 Tawa Rotis, Rajma / Chhole / Dal Makhani, Seasonal Sabzi, Rice, Pickle",
      specialties: "Sunday Halwa Puri Special, Extra Roti on demand without extra charge",
      timings: "Lunch: 1:00 PM - 3:00 PM | Dinner: 8:00 PM - 10:00 PM"
    }
  },
  {
    id: 6,
    businessName: "Shreeji Jain & Kathiyawadi Tiffin",
    city: "Ahmedabad",
    state: "Gujarat",
    locality: "Navrangpura",
    latitude: 23.0365,
    longitude: 72.5611,
    phone: "9876543215",
    whatsapp: "919876543215",
    foodTypes: ["Veg", "Jain", "Homemade"],
    mealTypes: ["Lunch", "Dinner", "Monthly"],
    priceStarting: 85,
    monthlyStarting: 2500,
    deliveryAreas: "Navrangpura, Vastrapur, Paldi, CG Road",
    deliveryDistance: "Free delivery within 4 km",
    rating: 4.9,
    isSampleRating: true,
    verified: true,
    featured: true,
    description: "Pure Jain and traditional Kathiyawadi meals prepared in a pristine family kitchen. Ringna no Olo and Bajra no Rotlo seasonal specialties.",
    menu: {
      dailyThali: "5 Phulka Rotis / Bajra Rotla, Gujarati Sweet Dal, Ringan Batata / Sev Tameta Sabzi, Khichdi, Buttermilk (Chaas)",
      specialties: "Traditional Kathiyawadi Thali, 100% strict Jain compliance without root veggies",
      timings: "Lunch: 11:45 AM - 1:45 PM | Dinner: 7:15 PM - 9:00 PM"
    }
  }
];

/**
 * Extended Master List of Indian Cities (for modal & fast lookup)
 */
const ALL_INDIAN_CITIES = [
  "Mumbai", "Delhi NCR", "Pune", "Bengaluru", "Hyderabad", "Chennai",
  "Ahmedabad", "Nagpur", "Kolkata", "Jaipur", "Surat", "Indore",
  "Lucknow", "Kanpur", "Chandigarh", "Bhopal", "Patna", "Vadodara",
  "Nashik", "Coimbatore", "Visakhapatnam", "Kochi", "Guwahati", "Bhubaneswar",
  "Dehradun", "Ranchi", "Raipur", "Amritsar", "Jodhpur", "Gwalior"
];

/**
 * Extended Master List of Indian States & UTs
 */
const ALL_INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi NCR", "Jammu and Kashmir",
  "Ladakh", "Chandigarh", "Puducherry", "Goa"
];

/**
 * Main Application Object
 */
const app = {
  activePreferences: new Set(),
  currentLocationQuery: "",
  activePinId: 1,

  /**
   * Initialize Application
   */
  init: function() {
    this.bindStickyHeader();
    this.bindHeroSearch();
    this.bindGeolocation();
    this.bindPreferenceChips();
    this.bindCityClickEvents();
    this.bindStateClickEvents();
    this.bindCategoryCardEvents();
    this.bindLeadForm();
    this.bindBusinessRegistrationForm();
    this.bindMapInteractions();
    this.populateAllCitiesModal();
    this.populateAllStatesModal();
    this.renderProviders(SAMPLE_PROVIDERS);
  },

  /**
   * Sticky Header Scroll Shadow
   */
  bindStickyHeader: function() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  },

  /**
   * Hero Search Form Handling with Validation
   */
  bindHeroSearch: function() {
    const form = document.getElementById('heroSearchForm');
    const input = document.getElementById('searchLocationInput');
    const feedback = document.getElementById('locationFeedbackBanner');

    if (!form || !input) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = input.value.trim();

      if (!query) {
        this.showLocationFeedback("Please enter a city, area name, or 6-digit PIN code to search.", "warning");
        input.focus();
        return;
      }

      this.currentLocationQuery = query;
      this.filterAndDisplayProviders(query);

      // Smooth scroll to providers
      const targetSection = document.getElementById('popularProvidersSection');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }

      this.showLocationFeedback(`Showing tiffin services delivering in "${query}". <a href="city.html?city=${encodeURIComponent(query)}" class="btn btn-primary-custom btn-sm ms-2 py-1 px-3" style="font-size: 0.78rem;">Explore Full ${query} Directory & Filters →</a>`, "success");
    });

    // Clear feedback when typing
    input.addEventListener('input', () => {
      if (feedback && feedback.classList.contains('show')) {
        feedback.classList.remove('show');
      }
    });
  },

  /**
   * Explicit Click-Only Browser Geolocation
   */
  bindGeolocation: function() {
    const btnHeroLocation = document.getElementById('btnUseMyLocation');
    const btnNearbyTrigger = document.getElementById('btnNearbyTrigger');

    const handleLocationRequest = () => {
      if (!('geolocation' in navigator)) {
        this.showLocationFeedback("Geolocation is not supported by your browser. Search by city or PIN code instead.", "warning");
        return;
      }

      // Indicate loading
      if (btnHeroLocation) {
        btnHeroLocation.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Locating...`;
        btnHeroLocation.disabled = true;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success Callback
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Restore button
          if (btnHeroLocation) {
            btnHeroLocation.innerHTML = `<i class="bi bi-crosshair" aria-hidden="true"></i> <span class="d-none d-sm-inline">Near Me</span>`;
            btnHeroLocation.disabled = false;
          }

          // Set friendly location notice without leaking raw coordinates into input
          const input = document.getElementById('searchLocationInput');
          if (input) {
            input.value = "Current Location (Near You)";
          }

          this.showLocationFeedback("Location detected! Showing verified tiffin services available around your area.", "success");
          this.showToast("Location detected successfully! Showing nearby kitchens.");

          // Scroll to providers
          const targetSection = document.getElementById('popularProvidersSection');
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }

          // Filter by sample closest providers
          this.filterAndDisplayProviders("Current Location");
        },
        (error) => {
          // Error or Denied Callback
          if (btnHeroLocation) {
            btnHeroLocation.innerHTML = `<i class="bi bi-crosshair" aria-hidden="true"></i> <span class="d-none d-sm-inline">Near Me</span>`;
            btnHeroLocation.disabled = false;
          }

          let msg = "Location access was not available. Search by city, area or PIN code instead.";
          if (error.code === error.PERMISSION_DENIED) {
            msg = "Location permission denied. Please search by entering your city, area or PIN code above.";
          }

          this.showLocationFeedback(msg, "warning");
          this.showToast(msg);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    };

    if (btnHeroLocation) {
      btnHeroLocation.addEventListener('click', handleLocationRequest);
    }
    if (btnNearbyTrigger) {
      btnNearbyTrigger.addEventListener('click', handleLocationRequest);
    }
  },

  /**
   * Helper to display location status banner
   */
  showLocationFeedback: function(message, type = "success") {
    const banner = document.getElementById('locationFeedbackBanner');
    const nearbyBanner = document.getElementById('nearbyFeedbackArea');

    if (banner) {
      banner.className = `location-status-banner show ${type}`;
      banner.textContent = message;
    }

    if (nearbyBanner) {
      nearbyBanner.innerHTML = `<div class="alert alert-${type === 'success' ? 'success' : 'warning'} py-2 mb-0">${message}</div>`;
    }
  },

  /**
   * Preference Chips Toggle & Filter
   */
  bindPreferenceChips: function() {
    const chips = document.querySelectorAll('.preference-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const pref = chip.dataset.pref;
        const isPressed = chip.getAttribute('aria-pressed') === 'true';

        if (isPressed) {
          chip.setAttribute('aria-pressed', 'false');
          chip.classList.remove('active');
          this.activePreferences.delete(pref);
        } else {
          chip.setAttribute('aria-pressed', 'true');
          chip.classList.add('active');
          this.activePreferences.add(pref);
        }

        this.filterAndDisplayProviders(this.currentLocationQuery);
      });
    });
  },

  /**
   * Popular Cities Click Event
   */
  bindCityClickEvents: function() {
    const cityCards = document.querySelectorAll('.city-card');
    cityCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const city = card.dataset.city;
        if (!city) return;

        const input = document.getElementById('searchLocationInput');
        if (input) {
          input.value = city;
        }

        this.currentLocationQuery = city;
        this.filterAndDisplayProviders(city);

        const targetSection = document.getElementById('popularProvidersSection');
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        this.showToast(`Showing tiffin services in ${city}`);
      });
    });
  },

  /**
   * Browse by State Click Event
   */
  bindStateClickEvents: function() {
    const statePills = document.querySelectorAll('.state-pill');
    statePills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const state = pill.dataset.state;
        if (!state) return;

        const input = document.getElementById('searchLocationInput');
        if (input) {
          input.value = state;
        }

        this.currentLocationQuery = state;
        this.filterAndDisplayProviders(state);

        const targetSection = document.getElementById('popularProvidersSection');
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        this.showToast(`Exploring tiffin providers in ${state}`);
      });
    });
  },

  /**
   * Category Cards Click Event
   */
  bindCategoryCardEvents: function() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
      const selectCategory = () => {
        const cat = card.dataset.category;
        if (!cat) return;

        // Activate corresponding preference chip if present
        const matchingChip = document.querySelector(`.preference-chip[data-pref="${cat}"]`);
        if (matchingChip) {
          matchingChip.click();
        } else {
          this.activePreferences.clear();
          this.activePreferences.add(cat);
          this.filterAndDisplayProviders(this.currentLocationQuery);
        }

        const targetSection = document.getElementById('popularProvidersSection');
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

      card.addEventListener('click', selectCategory);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCategory();
        }
      });
    });
  },

  /**
   * Filter and Display Providers
   */
  filterAndDisplayProviders: function(query = "") {
    const q = query.toLowerCase().trim();
    let filtered = SAMPLE_PROVIDERS;

    // Filter by text query
    if (q && q !== "current location" && q !== "current location (near you)") {
      filtered = filtered.filter(p => 
        p.city.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.businessName.toLowerCase().includes(q) ||
        p.deliveryAreas.toLowerCase().includes(q)
      );
    }

    // Filter by active preference chips
    if (this.activePreferences.size > 0) {
      filtered = filtered.filter(p => {
        return Array.from(this.activePreferences).every(pref => {
          const prefLower = pref.toLowerCase();
          if (prefLower === 'veg') return p.foodTypes.includes('Veg');
          if (prefLower === 'jain') return p.foodTypes.includes('Jain');
          if (prefLower === 'nonveg') return p.foodTypes.includes('Non-Veg');
          if (prefLower === 'monthly') return p.mealTypes.includes('Monthly');
          if (prefLower === 'daily') return p.mealTypes.includes('Daily');
          if (prefLower === 'lunch') return p.mealTypes.includes('Lunch');
          if (prefLower === 'dinner') return p.mealTypes.includes('Dinner');
          return true;
        });
      });
    }

    // Render results
    this.renderProviders(filtered);
  },

  /**
   * Render Provider Cards to DOM
   */
  renderProviders: function(providersList) {
    const container = document.getElementById('providersGridContainer');
    if (!container) return;

    if (!providersList || providersList.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="p-4 bg-white rounded-4 border shadow-sm mx-auto" style="max-width: 500px;">
            <i class="bi bi-search fs-1 text-muted d-block mb-3"></i>
            <h3 class="h5 fw-bold mb-2">No matching tiffin services found</h3>
            <p class="text-secondary small mb-3">We couldn't find an exact match for your selected criteria. Try resetting filters or searching a nearby major city.</p>
            <button type="button" class="btn btn-outline-custom btn-sm" onclick="app.resetAllFilters()">
              <i class="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
            </button>
          </div>
        </div>
      `;
      return;
    }

    let html = "";
    providersList.forEach(p => {
      const isVeg = p.foodTypes.includes("Veg");
      const isJain = p.foodTypes.includes("Jain");
      const isNonVeg = p.foodTypes.includes("Non-Veg");

      let dietBadges = "";
      if (isVeg) dietBadges += `<span class="diet-tag veg"><i class="bi bi-circle-fill me-1 small"></i> Pure Veg</span>`;
      if (isJain) dietBadges += `<span class="diet-tag jain">Jain Available</span>`;
      if (isNonVeg) dietBadges += `<span class="diet-tag nonveg">Non-Veg Option</span>`;

      html += `
        <div class="col-12 col-md-6 col-lg-4">
          <article class="provider-card">
            <div class="provider-thumb-wrap">
              <svg class="provider-img-art" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${p.businessName} Meal Photo">
                <rect width="400" height="200" fill="#FFF8F1"/>
                <circle cx="200" cy="100" r="75" fill="#FED7AA"/>
                <circle cx="200" cy="100" r="60" fill="#FFFFFF"/>
                <circle cx="200" cy="100" r="22" fill="#FEF08A"/>
                <circle cx="170" cy="75" r="14" fill="#BBF7D0"/>
                <circle cx="230" cy="75" r="14" fill="#FED7AA"/>
                <circle cx="230" cy="125" r="14" fill="#FECDD3"/>
                <circle cx="170" cy="125" r="14" fill="#E2E8F0"/>
              </svg>
              <div class="badge-diet-wrap">
                ${dietBadges}
              </div>
              ${p.verified ? `<div class="verified-stamp"><i class="bi bi-patch-check-fill"></i> Verified</div>` : ''}
            </div>
            <div class="provider-body">
              <h3 class="provider-name">${p.businessName}</h3>
              <div class="provider-location">
                <i class="bi bi-geo-alt-fill text-danger"></i>
                <span>${p.locality}, ${p.city}, ${p.state}</span>
              </div>
              <div class="rating-row">
                <span class="stars-pill"><i class="bi bi-star-fill text-warning"></i> ${p.rating} / 5.0</span>
                <span class="demo-rating-note">(Sample demo listing)</span>
              </div>
              <div class="provider-meta-row">
                <div>
                  <span class="d-block small text-muted">Starting from</span>
                  <span class="price-indicator">₹${p.priceStarting} / meal</span>
                </div>
                <div class="text-end">
                  <span class="delivery-badge"><i class="bi bi-bicycle me-1"></i> ${p.deliveryDistance}</span>
                </div>
              </div>
              <div class="provider-actions">
                <button type="button" class="btn btn-call btn-sm" onclick="app.handleCallPrompt('${p.phone}', '${p.businessName.replace(/'/g, "\\'")}')">
                  <i class="bi bi-telephone-fill"></i> Call
                </button>
                <a href="https://wa.me/${p.whatsapp}?text=${encodeURIComponent(`Hello ${p.businessName}, I found your tiffin service on TiffinWale and would like to know about your meals.`)}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">
                  <i class="bi bi-whatsapp"></i> WhatsApp
                </a>
                <button type="button" class="btn btn-outline-custom btn-sm" onclick="app.showProviderDetails(${p.id})">
                  Details
                </button>
              </div>
            </div>
          </article>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  /**
   * Reset all filters
   */
  resetAllFilters: function() {
    this.activePreferences.clear();
    document.querySelectorAll('.preference-chip').forEach(c => {
      c.setAttribute('aria-pressed', 'false');
      c.classList.remove('active');
    });
    const input = document.getElementById('searchLocationInput');
    if (input) input.value = '';
    this.currentLocationQuery = '';
    this.renderProviders(SAMPLE_PROVIDERS);
  },

  /**
   * Map Interactive Synchronization
   */
  bindMapInteractions: function() {
    const mapCards = document.querySelectorAll('.map-card-item');
    const mapPins = document.querySelectorAll('.map-pin');

    const selectPin = (id) => {
      this.activePinId = id;

      // Update active state in card list
      mapCards.forEach(c => {
        const cardId = parseInt(c.dataset.pinId, 10);
        if (cardId === id) {
          c.classList.add('active');
          c.setAttribute('aria-selected', 'true');
          c.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          c.classList.remove('active');
          c.setAttribute('aria-selected', 'false');
        }
      });

      // Update active state in map pins
      mapPins.forEach(p => {
        const pinId = parseInt(p.dataset.providerId, 10);
        if (pinId === id) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });

      // Update floating tooltip
      const provider = SAMPLE_PROVIDERS.find(p => p.id === id);
      if (provider) {
        const titleEl = document.getElementById('mapTooltipTitle');
        const locEl = document.getElementById('mapTooltipLoc');
        if (titleEl) titleEl.textContent = provider.businessName;
        if (locEl) locEl.innerHTML = `<i class="bi bi-geo-alt text-danger me-1"></i>${provider.locality}, ${provider.city} • ${provider.foodTypes.join(', ')}`;
      }
    };

    mapCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.pinId, 10);
        selectPin(id);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectPin(parseInt(card.dataset.pinId, 10));
        }
      });
    });

    mapPins.forEach(pin => {
      pin.addEventListener('click', () => {
        const id = parseInt(pin.dataset.providerId, 10);
        selectPin(id);
      });
      pin.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectPin(parseInt(pin.dataset.providerId, 10));
        }
      });
    });
  },

  /**
   * Customer Lead Generation Form Validation & Submission
   */
  bindLeadForm: function() {
    const form = document.getElementById('customerLeadForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        this.showToast("Please complete all required fields correctly.");
        return;
      }

      form.classList.add('was-validated');

      // Extract form values (ready for future API dispatch)
      const payload = {
        cityArea: document.getElementById('leadCityArea').value.trim(),
        foodType: document.getElementById('leadFoodType').value,
        mealTime: document.getElementById('leadMealTime').value,
        planType: document.getElementById('leadPlanType').value,
        peopleCount: document.getElementById('leadPeopleCount').value,
        mobile: document.getElementById('leadMobile').value.trim()
      };

      // Friendly confirmation toast
      this.showToast(`Thank you! Your requirement for ${payload.cityArea} has been captured. Matching local providers will reach out shortly on WhatsApp.`);

      // Reset form
      form.reset();
      form.classList.remove('was-validated');
    });
  },

  /**
   * Business Registration Form Validation & Submission
   */
  bindBusinessRegistrationForm: function() {
    const form = document.getElementById('businessRegisterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        this.showToast("Please fill all required business details.");
        return;
      }

      form.classList.add('was-validated');

      const bizName = document.getElementById('bizName').value.trim();
      const bizCity = document.getElementById('bizCity').value.trim();

      // Close modal
      const modalEl = document.getElementById('listBusinessModal');
      if (modalEl) {
        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.hide();
      }

      this.showToast(`Success! "${bizName}" (${bizCity}) has been submitted for free verification.`);
      form.reset();
      form.classList.remove('was-validated');
    });
  },

  /**
   * Provider Details Modal View
   */
  showProviderDetails: function(providerId) {
    const provider = SAMPLE_PROVIDERS.find(p => p.id === providerId);
    if (!provider) return;

    const modalTitle = document.getElementById('providerModalTitle');
    const modalContent = document.getElementById('providerModalContent');
    const modalFooter = document.getElementById('providerModalFooter');

    if (modalTitle) modalTitle.textContent = provider.businessName;

    if (modalContent) {
      modalContent.innerHTML = `
        <div class="row g-4">
          <div class="col-12 col-md-5">
            <div class="rounded-3 overflow-hidden bg-light p-3 text-center border">
              <div class="brand-icon-box mx-auto mb-3" style="width: 54px; height: 54px; font-size: 1.5rem;">
                <i class="bi bi-box2-heart-fill"></i>
              </div>
              <h4 class="h6 fw-bold mb-1">${provider.businessName}</h4>
              <p class="small text-muted mb-2"><i class="bi bi-geo-alt-fill text-danger me-1"></i>${provider.locality}, ${provider.city}</p>
              <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">${provider.foodTypes.join(' • ')}</span>
              <hr class="my-3">
              <div class="d-flex justify-content-between text-start small mb-1">
                <span class="text-muted">Daily Meal:</span>
                <span class="fw-bold text-primary">From ₹${provider.priceStarting}</span>
              </div>
              <div class="d-flex justify-content-between text-start small mb-1">
                <span class="text-muted">Monthly Plan:</span>
                <span class="fw-bold text-primary">From ₹${provider.monthlyStarting}</span>
              </div>
              <div class="d-flex justify-content-between text-start small">
                <span class="text-muted">Delivery:</span>
                <span class="fw-bold text-success">${provider.deliveryDistance}</span>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-7">
            <h4 class="h6 fw-bold text-primary mb-1">About This Kitchen</h4>
            <p class="small text-secondary mb-3">${provider.description}</p>

            <h4 class="h6 fw-bold text-primary mb-1">Standard Daily Thali Menu</h4>
            <p class="small text-secondary mb-3"><i class="bi bi-check2-circle text-success me-1"></i>${provider.menu.dailyThali}</p>

            <h4 class="h6 fw-bold text-primary mb-1">Kitchen Specialties</h4>
            <p class="small text-secondary mb-3"><i class="bi bi-star-fill text-warning me-1"></i>${provider.menu.specialties}</p>

            <h4 class="h6 fw-bold text-primary mb-1">Service & Delivery Timings</h4>
            <p class="small text-muted mb-3"><i class="bi bi-clock-history me-1"></i>${provider.menu.timings}</p>

            <h4 class="h6 fw-bold text-primary mb-1">Serviceable Localities</h4>
            <p class="small text-muted mb-0"><i class="bi bi-pin-map me-1"></i>${provider.deliveryAreas}</p>
          </div>
        </div>
      `;
    }

    if (modalFooter) {
      modalFooter.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-call" onclick="app.handleCallPrompt('${provider.phone}', '${provider.businessName.replace(/'/g, "\\'")}')">
          <i class="bi bi-telephone-fill"></i> Call Kitchen
        </button>
        <a href="https://wa.me/${provider.whatsapp}?text=${encodeURIComponent(`Hello ${provider.businessName}, I would like to inquire about your tiffin service on TiffinWale.`)}" target="_blank" rel="noopener" class="btn btn-whatsapp">
          <i class="bi bi-whatsapp"></i> Chat on WhatsApp
        </a>
      `;
    }

    const modalEl = document.getElementById('providerDetailsModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  },

  /**
   * Phone Call Prompt Handler
   */
  handleCallPrompt: function(phoneNumber, providerName) {
    const confirmCall = confirm(`Call ${providerName} directly at +91 ${phoneNumber}?`);
    if (confirmCall) {
      window.location.href = `tel:+91${phoneNumber}`;
    }
  },

  /**
   * Claim Business Handler
   */
  handleClaimBusiness: function() {
    alert("To claim an existing tiffin service listing, please contact business@tiffinwale.example.com with your FSSAI certificate or kitchen registration details. Our verification team will assist you within 24 hours.");
  },

  /**
   * Populate All Cities Modal
   */
  populateAllCitiesModal: function() {
    const grid = document.getElementById('allCitiesGrid');
    if (!grid) return;

    grid.innerHTML = ALL_INDIAN_CITIES.map(city => `
      <div class="col">
        <button type="button" class="btn btn-light w-100 text-start border small py-2 d-flex justify-content-between align-items-center" onclick="app.selectCityFromModal('${city}')">
          <span>${city}</span>
          <i class="bi bi-arrow-right-short text-primary"></i>
        </button>
      </div>
    `).join('');
  },

  /**
   * Select City From Modal
   */
  selectCityFromModal: function(city) {
    const modalEl = document.getElementById('allCitiesModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
    }
    window.location.href = `city.html?city=${encodeURIComponent(city)}`;
  },

  /**
   * Populate All States Modal
   */
  populateAllStatesModal: function() {
    const grid = document.getElementById('allStatesGrid');
    if (!grid) return;

    grid.innerHTML = ALL_INDIAN_STATES.map(state => `
      <div class="col">
        <button type="button" class="btn btn-light w-100 text-start border small py-2 d-flex justify-content-between align-items-center" onclick="app.selectStateFromModal('${state}')">
          <span>${state}</span>
          <i class="bi bi-arrow-right-short text-primary"></i>
        </button>
      </div>
    `).join('');
  },

  /**
   * Select State From Modal
   */
  selectStateFromModal: function(state) {
    const modalEl = document.getElementById('allStatesModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
    }
    window.location.href = `city.html?city=${encodeURIComponent(state)}`;
  },

  /**
   * Show Toast Notification
   */
  showToast: function(message) {
    const toastEl = document.getElementById('liveFeedbackToast');
    const msgEl = document.getElementById('toastMessage');

    if (toastEl && msgEl) {
      msgEl.innerHTML = `<i class="bi bi-info-circle-fill text-warning me-2"></i><span>${message}</span>`;
      const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
      toast.show();
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
