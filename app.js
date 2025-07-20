// SPA Router and Page Rendering
const app = document.getElementById('app');

// Simple in-memory data for tours (will be replaced by localStorage)
let tours = [];
let bookings = [];
 
// Routing
function showTourDetails(id) {
  const tour = tours.find(t => t.id === id);
  if (!tour) return;
  app.innerHTML = `
    <div class="tour-details animated-fadein">
      <img src="${tour.image}" alt="${tour.title}" class="tour-details-img">
      <div class="tour-details-info">
        <h2>${tour.title}</h2>
        <p>${tour.details}</p>
        <div class="tour-details-price">$${tour.price}</div>
        <button class="btn" id="bookTourBtn">Book Now</button>
        <button class="btn btn-secondary" id="backToHomeBtn">Back</button>
      </div>
    </div>
  `;
  document.getElementById('bookTourBtn').onclick = function() {
    window.location.hash = '#book-' + id;
  };
  document.getElementById('backToHomeBtn').onclick = function() {
    window.location.hash = '#home';
  };
}
function showContact() {
  document.getElementById('hero').style.display = 'none';
  document.getElementById('about').style.display = 'none';
  document.getElementById('testimonials').style.display = 'none';
  document.getElementById('partners').style.display = 'none';
  document.getElementById('contact-section').style.display = 'block';
  document.getElementById('app').style.display = 'none';
}
function showMainSections() {
  document.getElementById('hero').style.display = '';
  document.getElementById('about').style.display = '';
  document.getElementById('testimonials').style.display = '';
  document.getElementById('partners').style.display = '';
  document.getElementById('contact-section').style.display = 'none';
  document.getElementById('app').style.display = '';
}
function router() {
  const hash = window.location.hash || '#home';
  if (hash === '#contact') {
    showContact();
  } else if (hash.startsWith('#tour-')) {
    showMainSections();
    const id = hash.replace('#tour-', '');
    showTourDetails(id);
  } else if (hash === '#bookings') {
    showMainSections();
    animatePageTransition('left', renderMyBookings);
  } else if (hash === '#admin') {
    showMainSections();
    animatePageTransition('down', renderAdmin);
  } else if (hash.startsWith('#book-')) {
    showMainSections();
    animatePageTransition('left', () => {
      const id = hash.replace('#book-', '');
      renderBookTour(id);
    });
  } else if (hash.startsWith('#search-')) {
    showMainSections();
    animatePageTransition('left', () => {
      const query = decodeURIComponent(hash.replace('#search-', ''));
      renderSearchResults(query);
    });
  } else {
    showMainSections();
    animatePageTransition('left', renderHome);
  }
}

window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  router();
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.onsubmit = function(e) {
      e.preventDefault();
      document.getElementById('contact-success').textContent = 'Thank you for contacting us!';
      contactForm.reset();
      setTimeout(() => {
        document.getElementById('contact-success').textContent = '';
      }, 2500);
    };
  }
});

// Load tours and bookings from localStorage
function loadData() {
  tours = JSON.parse(localStorage.getItem('tours')) || getDefaultTours();
  bookings = JSON.parse(localStorage.getItem('bookings')) || [];
}
function saveTours() {
  localStorage.setItem('tours', JSON.stringify(tours));
}
function saveBookings() {
  localStorage.setItem('bookings', JSON.stringify(bookings));
}

// --- Reveal on Scroll ---
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  for (const el of reveals) {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('visible');
    }
  }
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// --- Newsletter Signup ---
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.onsubmit = function(e) {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value.trim();
      if (email) {
        this.reset();
        this.querySelector('button').textContent = 'Subscribed!';
        setTimeout(() => {
          this.querySelector('button').textContent = 'Subscribe';
        }, 2000);
      }
    };
  }
});

// --- Search Functionality ---
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.onsubmit = function(e) {
      e.preventDefault();
      const query = document.getElementById('search-input').value.trim().toLowerCase();
      if (query) {
        window.location.hash = '#search-' + encodeURIComponent(query);
      }
    };
  }
});

// --- More Sample Tours ---
function getDefaultTours() {
  return [
    {
      id: '1',
      title: 'Everest Base Camp Trek',
      desc: 'A classic trek to the base of the world’s highest mountain.',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      details: 'Experience the breathtaking beauty of the Himalayas with our guided trek to Everest Base Camp. Includes accommodation, meals, and permits.'
    },
    {
      id: '2',
      title: 'Annapurna Circuit',
      desc: 'A diverse trek through Nepal’s most beautiful landscapes.',
      price: 950,
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
      details: 'Journey through lush forests, terraced fields, and high mountain passes on the Annapurna Circuit. Suitable for all experience levels.'
    },
    {
      id: '3',
      title: 'Kathmandu City Tour',
      desc: 'Discover the rich culture and history of Nepal’s capital.',
      price: 200,
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
      details: 'Explore ancient temples, bustling markets, and UNESCO World Heritage sites in Kathmandu with our expert guides.'
    },
    {
      id: '4',
      title: 'Pokhara Adventure',
      desc: 'Paragliding, boating, and mountain views in Pokhara.',
      price: 350,
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
      details: 'Enjoy adventure sports and serene lakeside moments in Nepal’s most beautiful city.'
    },
    {
      id: '5',
      title: 'Chitwan Jungle Safari',
      desc: 'Wildlife safari in Chitwan National Park.',
      price: 400,
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      details: 'Spot rhinos, tigers, and elephants on a guided jungle safari.'
    },
    {
      id: '6',
      title: 'Lumbini Pilgrimage',
      desc: 'Visit the birthplace of Buddha.',
      price: 250,
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
      details: 'A spiritual journey to Lumbini, a UNESCO World Heritage site.'
    },
    {
      id: '7',
      title: 'Bhaktapur Heritage Walk',
      desc: 'Explore medieval squares and temples.',
      price: 120,
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
      details: 'Step back in time in Bhaktapur’s ancient city squares.'
    },
    {
      id: '8',
      title: 'Langtang Valley Trek',
      desc: 'A scenic trek close to Kathmandu.',
      price: 800,
      image: 'https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?auto=format&fit=crop&w=800&q=80',
      details: 'Trek through forests, villages, and glaciers in the Langtang region.'
    },
    {
      id: '9',
      title: 'Poon Hill Sunrise',
      desc: 'Short trek for stunning Himalayan sunrise views.',
      price: 350,
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      details: 'Perfect for beginners, this trek offers breathtaking sunrise panoramas.'
    },
    {
      id: '10',
      title: 'Rara Lake Escape',
      desc: 'Remote adventure to Nepal’s largest lake.',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      details: 'Discover the pristine beauty of Rara Lake, far from the crowds.'
    }
  ];
}

// --- Animated Page Transitions ---
function animatePageTransition(type, cb) {
  const main = document.getElementById('app');
  if (!main) { cb(); return; }
  main.classList.remove('slide-in-left', 'slide-down');
  void main.offsetWidth;
  if (type === 'left') {
    main.classList.add('slide-in-left');
  } else if (type === 'down') {
    main.classList.add('slide-down');
  }
  function removeAnimationClass() {
    main.classList.remove('slide-in-left', 'slide-down');
    main.removeEventListener('animationend', removeAnimationClass);
  }
  main.addEventListener('animationend', removeAnimationClass);
  setTimeout(cb, 350);
}

// --- Animated Counters ---
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = Math.ceil(target / 60);
    function update() {
      count += increment;
      if (count > target) count = target;
      counter.textContent = count.toLocaleString();
      if (count < target) requestAnimationFrame(update);
    }
    update();
  });
}
window.addEventListener('DOMContentLoaded', animateCounters);

// --- Enhanced Carousel with Indicators ---
function renderFeaturedTours() {
  const featured = tours.slice(0, 3);
  let idx = 0;
  const featuredDiv = document.createElement('div');
  featuredDiv.className = 'featured-carousel';
  featuredDiv.innerHTML = `
    <div class="featured-card">
      <img src="${featured[0].image}" alt="${featured[0].title}">
      <div class="featured-info">
        <h3>${featured[0].title}</h3>
        <p>${featured[0].desc}</p>
        <a class="btn" href="#tour-${featured[0].id}">View Details</a>
      </div>
    </div>
    <div class="carousel-controls">
      <button class="btn" id="prev-featured">&#8592;</button>
      <button class="btn" id="next-featured">&#8594;</button>
    </div>
    <div class="carousel-indicators">
      <span class="carousel-indicator active"></span>
      <span class="carousel-indicator"></span>
      <span class="carousel-indicator"></span>
    </div>
  `;
  app.prepend(featuredDiv);
  function updateFeatured(i) {
    const f = featured[i];
    featuredDiv.querySelector('.featured-card').innerHTML = `
      <img src="${f.image}" alt="${f.title}">
      <div class="featured-info">
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
        <a class="btn" href="#tour-${f.id}">View Details</a>
      </div>
    `;
    const indicators = featuredDiv.querySelectorAll('.carousel-indicator');
    indicators.forEach((ind, j) => {
      ind.classList.toggle('active', j === i);
    });
  }
  featuredDiv.querySelector('#prev-featured').onclick = () => {
    idx = (idx - 1 + featured.length) % featured.length;
    updateFeatured(idx);
  };
  featuredDiv.querySelector('#next-featured').onclick = () => {
    idx = (idx + 1) % featured.length;
    updateFeatured(idx);
  };
}

// --- Enhanced About Section with Counters ---
function enhanceAboutCounters() {
  const about = document.querySelector('.about-highlights');
  if (about) {
    about.innerHTML = `
      <li><span class="counter" data-target="1000">0</span>+ Happy Travelers</li>
      <li><span class="counter" data-target="50">0</span>+ Destinations</li>
      <li><span class="counter" data-target="24">0</span>/7 Support</li>
      <li><span class="counter" data-target="20">0</span> Trusted Local Guides</li>
    `;
    animateCounters();
  }
}
window.addEventListener('DOMContentLoaded', enhanceAboutCounters);

// --- Enhanced Render Functions ---
function renderHome() {
  animatePageTransition('left', () => {
    app.innerHTML = '<h1 class="reveal">Welcome to Travels & Tours</h1><div id="tour-list" class="reveal"></div>';
    renderFeaturedTours();
    renderTourList();
    revealOnScroll();
  });
}
function renderTourList() {
  const list = document.getElementById('tour-list');
  if (!list) return;
  list.innerHTML = tours.map(tour => `
    <div class="tour-card reveal">
      <img src="${tour.image}" alt="${tour.title}">
      <div class="tour-card-content">
        <div class="tour-title">${tour.title}</div>
        <div class="tour-desc">${tour.desc}</div>
        <div class="tour-price">$${tour.price}</div>
        <a class="btn" href="#tour-${tour.id}">View Details</a>
      </div>
    </div>
  `).join('');
  revealOnScroll();
}
function renderTourDetails(id) {
  animatePageTransition('left', () => {
    const tour = tours.find(t => t.id === id);
    if (!tour) {
      app.innerHTML = '<p>Tour not found.</p>';
      return;
    }
    app.innerHTML = `
      <div class="tour-card reveal">
        <img src="${tour.image}" alt="${tour.title}">
        <div class="tour-card-content">
          <div class="tour-title">${tour.title}</div>
          <div class="tour-desc">${tour.details}</div>
          <div class="tour-price">$${tour.price}</div>
          <a class="btn" href="#book-${tour.id}">Book This Tour</a>
          <a class="btn" href="#home" style="background:#64748b;">Back</a>
        </div>
      </div>
    `;
    revealOnScroll();
  });
}
function renderBookTour(id) {
  const tour = tours.find(t => t.id === id);
  if (!tour) return;
  app.innerHTML = `
    <div class="book-tour animated-fadein">
      <h2>Book: ${tour.title}</h2>
      <form id="bookTourForm" class="book-tour-form">
        <input type="text" id="bookName" placeholder="Your Name" required>
        <input type="email" id="bookEmail" placeholder="Your Email" required>
        <input type="number" id="bookPeople" placeholder="Number of People" min="1" value="1" required>
        <button class="btn" type="submit">Confirm Booking</button>
        <button class="btn btn-secondary" type="button" id="cancelBookBtn">Cancel</button>
      </form>
      <div id="bookSuccess" class="book-success"></div>
    </div>
  `;
  document.getElementById('cancelBookBtn').onclick = function() {
    window.location.hash = '#tour-' + id;
  };
  document.getElementById('bookTourForm').onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('bookName').value.trim();
    const email = document.getElementById('bookEmail').value.trim();
    const people = parseInt(document.getElementById('bookPeople').value);
    if (name && email && people > 0) {
      bookings.push({ tourId: id, name, email, people, title: tour.title });
      saveBookings();
      document.getElementById('bookSuccess').textContent = 'Booking Confirmed!';
      document.getElementById('bookTourForm').reset();
      setTimeout(() => { window.location.hash = '#bookings'; }, 1200);
    }
  };
}
function renderMyBookings() {
  app.innerHTML = `
    <div class="my-bookings animated-fadein">
      <h2>My Bookings</h2>
      <div class="my-bookings-list">
        ${bookings.length === 0 ? '<div class="no-bookings">No bookings yet.</div>' : bookings.map(b => `
          <div class="booking-card animated-fadein">
            <div class="booking-title">${b.title}</div>
            <div class="booking-info">Name: ${b.name} | Email: ${b.email} | People: ${b.people}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
window.cancelBooking = function(idx) {
  if (confirm('Cancel this booking?')) {
    bookings.splice(idx, 1);
    saveBookings();
    renderMyBookings();
  }
}
function renderAdmin() {
  app.innerHTML = `
    <div class="admin-page animated-fadein">
      <h2>Manage Tours</h2>
      <button class="btn" id="addTourBtn">Add New Tour</button>
      <div id="adminTourList"></div>
      <div id="adminTourFormContainer"></div>
    </div>
  `;
  renderAdminTourList();
  document.getElementById('addTourBtn').onclick = function() {
    renderAddTourForm();
  };
}
function renderAdminTourList() {
  const list = document.getElementById('adminTourList');
  if (!list) return;
  list.innerHTML = tours.map(t => `
    <div class="admin-tour-card animated-fadein">
      <img src="${t.image}" alt="${t.title}" class="admin-tour-img">
      <div class="admin-tour-info">
        <h3>${t.title}</h3>
        <div class="admin-tour-actions">
          <button class="btn btn-secondary" onclick="editTour('${t.id}')">Edit</button>
          <button class="btn" onclick="deleteTour('${t.id}')">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}
window.editTour = function(id) {
  const tour = tours.find(t => t.id === id);
  if (!tour) return;
  document.getElementById('adminTourFormContainer').innerHTML = `
    <form id="editTourForm" class="admin-tour-form animated-fadein">
      <input type="text" id="editTitle" value="${tour.title}" required>
      <input type="text" id="editImage" value="${tour.image}" required>
      <textarea id="editDetails" required>${tour.details}</textarea>
      <input type="number" id="editPrice" value="${tour.price}" required>
      <button class="btn" type="submit">Save</button>
      <button class="btn btn-secondary" type="button" id="cancelEditTour">Cancel</button>
    </form>
  `;
  document.getElementById('cancelEditTour').onclick = function() {
    document.getElementById('adminTourFormContainer').innerHTML = '';
  };
  document.getElementById('editTourForm').onsubmit = function(e) {
    e.preventDefault();
    tour.title = document.getElementById('editTitle').value;
    tour.image = document.getElementById('editImage').value;
    tour.details = document.getElementById('editDetails').value;
    tour.price = parseFloat(document.getElementById('editPrice').value);
    saveTours();
    renderAdminTourList();
    document.getElementById('adminTourFormContainer').innerHTML = '';
  };
};
window.deleteTour = function(id) {
  const idx = tours.findIndex(t => t.id === id);
  if (idx !== -1) {
    tours.splice(idx, 1);
    saveTours();
    renderAdminTourList();
  }
};
function renderAddTourForm() {
  document.getElementById('adminTourFormContainer').innerHTML = `
    <form id="addTourForm" class="admin-tour-form animated-fadein">
      <input type="text" id="addTitle" placeholder="Title" required>
      <input type="text" id="addImage" placeholder="Image URL" required>
      <textarea id="addDetails" placeholder="Details" required></textarea>
      <input type="number" id="addPrice" placeholder="Price" required>
      <button class="btn" type="submit">Add</button>
      <button class="btn btn-secondary" type="button" id="cancelAddTour">Cancel</button>
    </form>
  `;
  document.getElementById('cancelAddTour').onclick = function() {
    document.getElementById('adminTourFormContainer').innerHTML = '';
  };
  document.getElementById('addTourForm').onsubmit = function(e) {
    e.preventDefault();
    const newTour = {
      id: Date.now().toString(),
      title: document.getElementById('addTitle').value,
      image: document.getElementById('addImage').value,
      details: document.getElementById('addDetails').value,
      price: parseFloat(document.getElementById('addPrice').value)
    };
    tours.push(newTour);
    saveTours();
    renderAdminTourList();
    document.getElementById('adminTourFormContainer').innerHTML = '';
  };
}

// --- SPA Routing (with search) ---
function renderSearchResults(query) {
  animatePageTransition('left', () => {
    app.innerHTML = `<h2 class="reveal">Search Results for "${query}"</h2><div id="tour-list" class="reveal"></div>`;
    const filtered = tours.filter(tour =>
      tour.title.toLowerCase().includes(query) ||
      tour.desc.toLowerCase().includes(query) ||
      tour.details.toLowerCase().includes(query)
    );
    const list = document.getElementById('tour-list');
    if (filtered.length === 0) {
      list.innerHTML = '<p class="reveal">No tours found.</p>';
    } else {
      list.innerHTML = filtered.map(tour => `
        <div class="tour-card reveal">
          <img src="${tour.image}" alt="${tour.title}">
          <div class="tour-card-content">
            <div class="tour-title">${tour.title}</div>
            <div class="tour-desc">${tour.desc}</div>
            <div class="tour-price">$${tour.price}</div>
            <a class="btn" href="#tour-${tour.id}">View Details</a>
          </div>
        </div>
      `).join('');
    }
    revealOnScroll();
  });
}

// --- Micro-interactions ---
document.addEventListener('DOMContentLoaded', () => {
  // Input focus highlight
  document.body.addEventListener('focusin', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      e.target.style.boxShadow = '0 0 0 2px #38bdf8';
      e.target.style.outline = 'none';
    }
  });
  document.body.addEventListener('focusout', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      e.target.style.boxShadow = '';
      e.target.style.outline = '';
    }
  });
  // Button ripple effect
  document.body.addEventListener('click', e => {
    if (e.target.classList.contains('btn')) {
      const btn = e.target;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = e.offsetX + 'px';
      ripple.style.top = e.offsetY + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
  });
}); 

// --- Go to Top Button ---
const goTopBtn = document.getElementById('goTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    goTopBtn.style.display = 'block';
  } else {
    goTopBtn.style.display = 'none';
  }
});
goTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}); 