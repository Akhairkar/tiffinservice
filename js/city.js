/**
 * TiffinWale - City & Search Results Discovery Logic (city.js)
 * Powers city.html with dynamic URL parameter filtering, locality chips,
 * split map toggle, and multi-criteria provider search.
 */

'use strict';

/**
 * City-Specific Locality Database
 */
const CITY_LOCALITIES = {
  "Nagpur": ["Dharampeth", "Ramdaspeth", "Sitabuldi", "Sadar", "Pratap Nagar", "Manish Nagar", "Gokulpeth", "Trimurti Nagar"],
  "Mumbai": ["Andheri West", "Bandra", "Dadar", "Borivali", "Goregaon", "Powai", "Thane", "Malad", "Lower Parel"],
  "Pune": ["Kothrud", "Deccan", "Viman Nagar", "Hinjewadi", "Wakad", "Aundh", "Baner", "Hadapsar", "Karve Nagar"],
  "Bengaluru": ["Indiranagar", "Koramangala", "HSR Layout", "Whitefield", "Jayanagar", "BTM Layout", "Electronic City"],
  "Delhi": ["Laxmi Nagar", "Connaught Place", "Preet Vihar", "Rohini", "Saket", "Hauz Khas", "Dwarka", "Pitampura"],
  "Ahmedabad": ["Navrangpura", "Vastrapur", "Paldi", "Satellite", "CG Road", "Bodakdev", "Maninagar", "Prahlad Nagar"],
  "Hyderabad": ["Madhapur", "Gachibowli", "Hitec City", "Banjara Hills", "Jubilee Hills", "Kukatpally", "Ameerpet"],
  "Chennai": ["T. Nagar", "Adyar", "Velachery", "Anna Nagar", "Mylapore", "Nungambakkam", "OMR"],
  "Kolkata": ["Salt Lake", "New Town", "Park Street", "Ballygunge", "Dum Dum", "Garia", "Behala"],
  "Jaipur": ["Malviya Nagar", "Vaishali Nagar", "Mansarovar", "C-Scheme", "Raja Park", "Tonk Road"],
  "Surat": ["Athwa Lines", "Vesu", "Adajan", "Piplod", "Varachha", "Rander"],
  "Indore": ["Vijay Nagar", "Palasia", "Bhawarkua", "Geeta Bhawan", "Annapurna Road", "Chappan Dukan"]
};

/**
 * City-State Code and Static Page Mapping
 */
const CITY_STATE_MAP = {
  "Mumbai": { stateCode: "IN-MH", slug: "mumbai" },
  "Pune": { stateCode: "IN-MH", slug: "pune" },
  "Delhi": { stateCode: "IN-DL", slug: "delhi" },
  "Bengaluru": { stateCode: "IN-KA", slug: "bengaluru" },
  "Nagpur": { stateCode: "IN-MH", slug: "nagpur" },
  "Ahmedabad": { stateCode: "IN-GJ", slug: "ahmedabad" },
  "Hyderabad": { stateCode: "IN-TG", slug: "hyderabad" },
  "Chennai": { stateCode: "IN-TN", slug: "chennai" },
  "Kolkata": { stateCode: "IN-WB", slug: "kolkata" },
  "Jaipur": { stateCode: "IN-RJ", slug: "jaipur" },
  "Surat": { stateCode: "IN-GJ", slug: "surat" },
  "Indore": { stateCode: "IN-MP", slug: "indore" }
};

/**
 * City Page Controller Object
 */
const cityPage = {
  currentCity: "Nagpur",
  selectedLocality: "",
  activeDietFilters: new Set(),
  activePlanFilters: new Set(),
  priceFilter: "all",
  currentSort: "recommended",
  currentViewMode: "grid", // 'grid', 'list', 'map'

  /**
   * Initialize City Page
   */
  init: function() {
    this.parseUrlParams();
    this.updateCityHeadings();
    this.renderLocalityChips();
    this.bindFilterEvents();
    this.bindSortEvents();
    this.bindViewToggleEvents();
    this.syncMobileFilters();
    this.applyFilters();
  },

  /**
   * Extract City and Preferences from URL Search Parameters
   */
  parseUrlParams: function() {
    const params = new URLSearchParams(window.location.search);
    const cityParam = params.get('city') || params.get('search');
    const prefParam = params.get('pref') || params.get('category');

    if (cityParam) {
      // Find matching standard city name or use capitalized string
      const matched = Object.keys(CITY_LOCALITIES).find(
        c => c.toLowerCase() === cityParam.toLowerCase()
      );
      this.currentCity = matched || (cityParam.charAt(0).toUpperCase() + cityParam.slice(1));
    }

    if (prefParam) {
      const p = prefParam.toLowerCase();
      if (p === 'veg') this.activeDietFilters.add('Veg');
      if (p === 'jain') this.activeDietFilters.add('Jain');
      if (p === 'nonveg') this.activeDietFilters.add('Non-Veg');
      if (p === 'monthly') this.activePlanFilters.add('Monthly');
      if (p === 'daily') this.activePlanFilters.add('Daily');
      if (p === 'lunch') this.activePlanFilters.add('Lunch');
      if (p === 'dinner') this.activePlanFilters.add('Dinner');
    }
  },

  /**
   * Update City Title, Subtitle, Badges & Structured Data
   */
  updateCityHeadings: function() {
    const city = this.currentCity;

    // Document Title & Meta
    document.title = `Tiffin Services in ${city} | Homemade Food & Monthly Dabba Delivery`;
    const metaTitle = document.getElementById('metaPageTitle');
    const metaDesc = document.getElementById('metaPageDesc');
    const ogTitle = document.getElementById('ogTitle');
    const ogDesc = document.getElementById('ogDesc');

    if (metaTitle) metaTitle.textContent = `Tiffin Services in ${city} | Homemade Food & Monthly Dabba Delivery`;
    if (metaDesc) metaDesc.setAttribute('content', `Find the best tiffin services in ${city}. Compare pure veg, Jain, and homemade daily and monthly meal plans with direct provider contact numbers.`);
    if (ogTitle) ogTitle.setAttribute('content', `Tiffin Services in ${city} | TiffinWale`);
    if (ogDesc) ogDesc.setAttribute('content', `Find the best tiffin services in ${city}. Compare pure veg, Jain, and homemade meal plans.`);

    // Canonical & Geo Tags Dynamic Updating
    const cityMeta = CITY_STATE_MAP[city];
    const metaGeoRegion = document.getElementById('metaGeoRegion');
    const metaGeoPlace = document.getElementById('metaGeoPlace');
    const metaCanonical = document.getElementById('metaCanonical');
    const ogUrl = document.getElementById('ogUrl');
    const twitterUrl = document.getElementById('twitterUrl');
    const twitterTitle = document.getElementById('twitterTitle');
    const twitterDesc = document.getElementById('twitterDesc');

    if (cityMeta && metaGeoRegion) metaGeoRegion.setAttribute('content', cityMeta.stateCode);
    if (metaGeoPlace) metaGeoPlace.setAttribute('content', city);

    let canonicalUrl = `https://akhairkar.github.io/tiffinservice/city.html?city=${encodeURIComponent(city)}`;
    if (cityMeta && cityMeta.slug) {
      canonicalUrl = `https://akhairkar.github.io/tiffinservice/tiffin-service-${cityMeta.slug}.html`;
    }
    if (metaCanonical) metaCanonical.setAttribute('href', canonicalUrl);
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
    if (twitterUrl) twitterUrl.setAttribute('content', canonicalUrl);
    if (twitterTitle) twitterTitle.setAttribute('content', `Tiffin Services in ${city} | TiffinWale`);
    if (twitterDesc) twitterDesc.setAttribute('content', `Find the best tiffin services in ${city}. Compare pure veg, Jain, and homemade meal plans.`);

    // Structured Data JSON-LD Dynamic Updating
    const jsonLdEl = document.getElementById('cityJsonLd');
    if (jsonLdEl) {
      try {
        const schema = JSON.parse(jsonLdEl.textContent);
        if (schema && schema['@graph']) {
          const breadcrumbs = schema['@graph'].find(item => item['@type'] === 'BreadcrumbList');
          if (breadcrumbs && breadcrumbs.itemListElement && breadcrumbs.itemListElement[2]) {
            breadcrumbs.itemListElement[2].name = `${city} Tiffin Services`;
            breadcrumbs.itemListElement[2].item = canonicalUrl;
          }
          const colPage = schema['@graph'].find(item => item['@type'] === 'CollectionPage');
          if (colPage) {
            colPage.name = `Tiffin Services in ${city}`;
            colPage.description = `Directory of verified home chefs and tiffin services in ${city} providing homemade daily and monthly meals.`;
            colPage.url = canonicalUrl;
          }
          jsonLdEl.textContent = JSON.stringify(schema, null, 2);
        }
      } catch (e) {
        // Fallback gracefully
      }
    }

    // Breadcrumb & Headings
    const breadcrumbCity = document.getElementById('breadcrumbCity');
    const cityBadgeName = document.getElementById('cityBadgeName');
    const cityHeaderTitle = document.getElementById('cityHeaderTitle');
    const cityHeaderSubtitle = document.getElementById('cityHeaderSubtitle');
    const localityCityLabel = document.getElementById('localityCityLabel');
    const btnCityLabel = document.getElementById('btnCityLabel');
    const mapCityName = document.getElementById('mapCityName');
    const leadCardCityName = document.getElementById('leadCardCityName');
    const faqCityTitle = document.getElementById('faqCityTitle');
    const faqCitySubTitle = document.getElementById('faqCitySubTitle');
    const faqAnsCity1 = document.getElementById('faqAnsCity1');
    const faqAnsCity2 = document.getElementById('faqAnsCity2');

    if (breadcrumbCity) breadcrumbCity.textContent = `${city} Tiffin Services`;
    if (cityBadgeName) cityBadgeName.textContent = city;
    if (cityHeaderTitle) cityHeaderTitle.textContent = city;
    if (cityHeaderSubtitle) cityHeaderSubtitle.textContent = `Discover verified homemade tiffin services, pure veg & Jain meals, student food delivery, and monthly dabba subscription packages across ${city}.`;
    if (localityCityLabel) localityCityLabel.textContent = city;
    if (btnCityLabel) btnCityLabel.textContent = city;
    if (mapCityName) mapCityName.textContent = city;
    if (leadCardCityName) leadCardCityName.textContent = city;
    if (faqCityTitle) faqCityTitle.textContent = city;
    if (faqCitySubTitle) faqCitySubTitle.textContent = city;
    if (faqAnsCity1) faqAnsCity1.textContent = city;
    if (faqAnsCity2) faqAnsCity2.textContent = city;
  },

  /**
   * Render Locality Quick Chips
   */
  renderLocalityChips: function() {
    const container = document.getElementById('localityChipsContainer');
    if (!container) return;

    const localities = CITY_LOCALITIES[this.currentCity] || [
      "City Center", "North Area", "South Area", "East Area", "West Area", "College Road", "Station Area"
    ];

    let html = `<a href="javascript:void(0)" class="locality-chip active" data-locality="" onclick="cityPage.selectLocality('')">All ${this.currentCity}</a>`;
    localities.forEach(loc => {
      html += `<a href="javascript:void(0)" class="locality-chip" data-locality="${loc}" onclick="cityPage.selectLocality('${loc}')">${loc}</a>`;
    });

    container.innerHTML = html;
  },

  /**
   * Handle Locality Chip Click
   */
  selectLocality: function(loc) {
    this.selectedLocality = loc;

    document.querySelectorAll('.locality-chip').forEach(chip => {
      if (chip.dataset.locality === loc) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    const filterInput = document.getElementById('filterLocalityInput');
    if (filterInput) filterInput.value = loc;

    this.applyFilters();
  },

  /**
   * Bind Desktop & Mobile Filter Events
   */
  bindFilterEvents: function() {
    // Locality text input filter
    const localityInput = document.getElementById('filterLocalityInput');
    if (localityInput) {
      localityInput.addEventListener('input', (e) => {
        this.selectedLocality = e.target.value.trim();
        this.applyFilters();
      });
    }

    // Dietary checkboxes
    document.querySelectorAll('.filter-checkbox').forEach(cb => {
      // Sync initial active filters from URL
      if (this.activeDietFilters.has(cb.value)) {
        cb.checked = true;
      }

      cb.addEventListener('change', () => {
        if (cb.checked) {
          this.activeDietFilters.add(cb.value);
        } else {
          this.activeDietFilters.delete(cb.value);
        }
        this.applyFilters();
      });
    });

    // Plan checkboxes
    document.querySelectorAll('.filter-plan-checkbox').forEach(cb => {
      if (this.activePlanFilters.has(cb.value)) {
        cb.checked = true;
      }

      cb.addEventListener('change', () => {
        if (cb.checked) {
          this.activePlanFilters.add(cb.value);
        } else {
          this.activePlanFilters.delete(cb.value);
        }
        this.applyFilters();
      });
    });

    // Price radio buttons
    document.querySelectorAll('input[name="priceRange"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.priceFilter = e.target.value;
        this.applyFilters();
      });
    });
  },

  /**
   * Bind Sorting Event
   */
  bindSortEvents: function() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.applyFilters();
    });
  },

  /**
   * Bind View Toggle Events (Grid vs List vs Map)
   */
  bindViewToggleEvents: function() {
    const btnGrid = document.getElementById('btnViewGrid');
    const btnList = document.getElementById('btnViewList');
    const btnMap = document.getElementById('btnViewMap');
    const cardsContainer = document.getElementById('cityProvidersContainer');
    const mapContainer = document.getElementById('citySplitMapView');

    if (!btnGrid || !btnList || !btnMap) return;

    const setActiveBtn = (activeBtn) => {
      [btnGrid, btnList, btnMap].forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      activeBtn.classList.add('active');
      activeBtn.setAttribute('aria-pressed', 'true');
    };

    btnGrid.addEventListener('click', () => {
      this.currentViewMode = 'grid';
      setActiveBtn(btnGrid);
      if (mapContainer) mapContainer.classList.add('d-none');
      if (cardsContainer) cardsContainer.classList.remove('d-none');
      this.applyFilters();
    });

    btnList.addEventListener('click', () => {
      this.currentViewMode = 'list';
      setActiveBtn(btnList);
      if (mapContainer) mapContainer.classList.add('d-none');
      if (cardsContainer) cardsContainer.classList.remove('d-none');
      this.applyFilters();
    });

    btnMap.addEventListener('click', () => {
      this.currentViewMode = 'map';
      setActiveBtn(btnMap);
      if (mapContainer) mapContainer.classList.remove('d-none');
      if (cardsContainer) cardsContainer.classList.add('d-none');
      this.renderCityMapPins();
    });
  },

  /**
   * Sync Desktop Filter Form to Mobile Offcanvas
   */
  syncMobileFilters: function() {
    const desktopAside = document.querySelector('.filter-sidebar-card');
    const mobileContainer = document.getElementById('mobileFilterContainer');
    if (!desktopAside || !mobileContainer) return;

    // Clone content for mobile offcanvas
    mobileContainer.innerHTML = desktopAside.innerHTML;

    // Rebind inputs inside mobile offcanvas
    mobileContainer.querySelectorAll('.filter-checkbox').forEach(cb => {
      cb.id = 'm_' + cb.id;
      cb.addEventListener('change', () => {
        if (cb.checked) {
          this.activeDietFilters.add(cb.value);
        } else {
          this.activeDietFilters.delete(cb.value);
        }
        // Mirror to desktop
        const dCb = desktopAside.querySelector(`.filter-checkbox[value="${cb.value}"]`);
        if (dCb) dCb.checked = cb.checked;
        this.applyFilters();
      });
    });

    mobileContainer.querySelectorAll('.filter-plan-checkbox').forEach(cb => {
      cb.id = 'm_' + cb.id;
      cb.addEventListener('change', () => {
        if (cb.checked) {
          this.activePlanFilters.add(cb.value);
        } else {
          this.activePlanFilters.delete(cb.value);
        }
        const dCb = desktopAside.querySelector(`.filter-plan-checkbox[value="${cb.value}"]`);
        if (dCb) dCb.checked = cb.checked;
        this.applyFilters();
      });
    });
  },

  /**
   * Reset All Filters
   */
  resetFilters: function() {
    this.selectedLocality = "";
    this.activeDietFilters.clear();
    this.activePlanFilters.clear();
    this.priceFilter = "all";

    document.querySelectorAll('.filter-checkbox, .filter-plan-checkbox').forEach(cb => cb.checked = false);
    const radioAll = document.getElementById('priceAll');
    if (radioAll) radioAll.checked = true;

    const localityInput = document.getElementById('filterLocalityInput');
    if (localityInput) localityInput.value = "";

    document.querySelectorAll('.locality-chip').forEach(c => {
      if (c.dataset.locality === "") c.classList.add('active');
      else c.classList.remove('active');
    });

    this.applyFilters();
  },

  /**
   * Apply All Active Filters and Re-Render
   */
  applyFilters: function() {
    let list = SAMPLE_PROVIDERS;

    // 1. Filter by current city
    list = list.filter(p => p.city.toLowerCase() === this.currentCity.toLowerCase());

    // If no provider exact matches city, show all providers as sample demonstration with a helpful banner
    let isFallbackCity = false;
    if (list.length === 0) {
      isFallbackCity = true;
      list = SAMPLE_PROVIDERS;
    }

    // 2. Filter by Locality
    if (this.selectedLocality) {
      const locQ = this.selectedLocality.toLowerCase();
      list = list.filter(p => 
        p.locality.toLowerCase().includes(locQ) ||
        p.deliveryAreas.toLowerCase().includes(locQ)
      );
    }

    // 3. Filter by Dietary Preferences
    if (this.activeDietFilters.size > 0) {
      list = list.filter(p => {
        return Array.from(this.activeDietFilters).every(diet => {
          if (diet === 'Veg') return p.foodTypes.includes('Veg');
          if (diet === 'Jain') return p.foodTypes.includes('Jain');
          if (diet === 'Non-Veg') return p.foodTypes.includes('Non-Veg');
          if (diet === 'Homemade') return p.foodTypes.includes('Homemade');
          return true;
        });
      });
    }

    // 4. Filter by Plan / Meal Type
    if (this.activePlanFilters.size > 0) {
      list = list.filter(p => {
        return Array.from(this.activePlanFilters).every(plan => {
          return p.mealTypes.includes(plan);
        });
      });
    }

    // 5. Filter by Price Range
    if (this.priceFilter === 'under75') {
      list = list.filter(p => p.priceStarting < 75);
    } else if (this.priceFilter === '75to90') {
      list = list.filter(p => p.priceStarting >= 75 && p.priceStarting <= 90);
    } else if (this.priceFilter === 'above90') {
      list = list.filter(p => p.priceStarting > 90);
    }

    // 6. Sorting
    if (this.currentSort === 'price-asc') {
      list.sort((a, b) => a.priceStarting - b.priceStarting);
    } else if (this.currentSort === 'rating-desc') {
      list.sort((a, b) => b.rating - a.rating);
    }

    // Update results count
    const countEl = document.getElementById('resultsCountText');
    if (countEl) {
      if (isFallbackCity) {
        countEl.innerHTML = `<span class="text-primary">${list.length} sample kitchens</span> (Expanding rapidly in ${this.currentCity})`;
      } else {
        countEl.innerHTML = `Showing <span class="text-primary">${list.length} verified tiffin services</span> in ${this.currentCity}`;
      }
    }

    this.renderCards(list, isFallbackCity);
  },

  /**
   * Render Filtered Cards
   */
  renderCards: function(list, isFallbackCity = false) {
    const container = document.getElementById('cityProvidersContainer');
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="p-4 bg-white rounded-4 border shadow-sm mx-auto" style="max-width: 520px;">
            <i class="bi bi-funnel fs-1 text-muted d-block mb-3"></i>
            <h3 class="h5 fw-bold mb-2">No matching tiffin providers</h3>
            <p class="text-secondary small mb-3">No providers match your exact combination of locality, diet, and price filters.</p>
            <button type="button" class="btn btn-primary-custom btn-sm" onclick="cityPage.resetFilters()">
              <i class="bi bi-arrow-counterclockwise me-1"></i> Clear All Filters
            </button>
          </div>
        </div>
      `;
      return;
    }

    let html = "";
    if (isFallbackCity) {
      html += `
        <div class="col-12">
          <div class="alert alert-info d-flex align-items-center gap-2 py-2 small mb-0 rounded-3">
            <i class="bi bi-info-circle-fill fs-5"></i>
            <span>We are currently onboarding kitchens in <strong>${this.currentCity}</strong>. Below are representative sample kitchens and meal models operating across India.</span>
          </div>
        </div>
      `;
    }

    list.forEach(p => {
      const isVeg = p.foodTypes.includes("Veg");
      const isJain = p.foodTypes.includes("Jain");
      const isNonVeg = p.foodTypes.includes("Non-Veg");

      let dietBadges = "";
      if (isVeg) dietBadges += `<span class="diet-tag veg"><i class="bi bi-circle-fill me-1 small"></i> Pure Veg</span>`;
      if (isJain) dietBadges += `<span class="diet-tag jain">Jain Available</span>`;
      if (isNonVeg) dietBadges += `<span class="diet-tag nonveg">Non-Veg Option</span>`;

      const isList = this.currentViewMode === 'list';
      const colClass = isList ? 'col-12' : 'col-12 col-md-6';

      html += `
        <div class="${colClass}">
          <article class="provider-card ${isList ? 'list-layout' : ''}">
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
              <div class="d-flex justify-content-between align-items-start mb-1">
                <h3 class="provider-name mb-0">${p.businessName}</h3>
              </div>
              <div class="provider-location">
                <i class="bi bi-geo-alt-fill text-danger"></i>
                <span>${p.locality}, ${p.city}</span>
              </div>
              <div class="rating-row">
                <span class="stars-pill"><i class="bi bi-star-fill text-warning"></i> ${p.rating} / 5.0</span>
                <span class="demo-rating-note">(Sample demo listing)</span>
              </div>
              <div class="provider-meta-row">
                <div>
                  <span class="d-block small text-muted">Daily Meal</span>
                  <span class="price-indicator">₹${p.priceStarting}</span>
                </div>
                <div>
                  <span class="d-block small text-muted">Monthly Plan</span>
                  <span class="fw-bold text-dark small">From ₹${p.monthlyStarting}</span>
                </div>
                <div class="text-end">
                  <span class="delivery-badge"><i class="bi bi-bicycle me-1"></i> ${p.deliveryDistance}</span>
                </div>
              </div>
              <div class="provider-actions">
                <button type="button" class="btn btn-call btn-sm" onclick="app.handleCallPrompt('${p.phone}', '${p.businessName.replace(/'/g, "\\'")}')">
                  <i class="bi bi-telephone-fill"></i> Call
                </button>
                <a href="https://wa.me/${p.whatsapp}?text=${encodeURIComponent(`Hello ${p.businessName}, I found your listing on TiffinWale and would like to inquire about meal delivery in ${p.locality}.`)}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">
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
   * Render Map Pins in Split Map View
   */
  renderCityMapPins: function() {
    const container = document.getElementById('cityMapPinsContainer');
    if (!container) return;

    let pinsHtml = "";
    SAMPLE_PROVIDERS.forEach((p, idx) => {
      const topPct = 30 + (idx * 15) % 55;
      const leftPct = 25 + (idx * 22) % 65;

      pinsHtml += `
        <div class="map-pin ${idx === 0 ? 'active' : ''}" style="top: ${topPct}%; left: ${leftPct}%;" onclick="cityPage.highlightMapPin(${p.id})">
          <div class="pin-bubble"><i class="bi bi-shop"></i></div>
          <div class="pin-pulse"></div>
        </div>
      `;
    });

    container.innerHTML = pinsHtml;
    this.highlightMapPin(1);
  },

  /**
   * Highlight Map Pin and show Tooltip Card
   */
  highlightMapPin: function(providerId) {
    const provider = SAMPLE_PROVIDERS.find(p => p.id === providerId) || SAMPLE_PROVIDERS[0];
    const tooltip = document.getElementById('cityMapTooltip');
    const titleEl = document.getElementById('cityMapTooltipTitle');
    const descEl = document.getElementById('cityMapTooltipDesc');

    if (tooltip && titleEl && descEl && provider) {
      tooltip.style.display = "flex";
      titleEl.textContent = provider.businessName;
      descEl.innerHTML = `<i class="bi bi-geo-alt text-danger me-1"></i>${provider.locality}, ${provider.city} • ₹${provider.priceStarting}/meal`;
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  cityPage.init();
});
