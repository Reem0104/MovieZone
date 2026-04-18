/* =========================================
   MovieZone - Main JavaScript 
========================================= */

'use strict';

/* =========================================
   HELPER FUNCTIONS
========================================= */

// Select one element
const $ = (selector, context = document) => context.querySelector(selector);


/* =========================================
   NAVBAR SECTION
========================================= */
function initNavbar() {
  const navbar = $('.navbar');

  if (!navbar) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}


/* =========================================
   MOVIE DATA (WITH LOCAL IMAGES)
========================================= */
const movies = [
  {
    id: "1",
    title: "Inception",
    thumb: "images/Inception.webp",
    genres: ["Action", "Sci-Fi"],
    year: "2010",
    duration: "2h 28m",
    match: "95%"
  },
  {
    id: "2",
    title: "Interstellar",
    thumb: "images/Interstellar.webp",
    genres: ["Sci-Fi", "Drama"],
    year: "2014",
    duration: "2h 49m",
    match: "97%"
  },
  {
    id: "3",
    title: "Frozen",
    thumb: "images/Frozen.webp",
    genres: ["Animation", "Family"],
    year: "2013",
    duration: "1h 42m",
    match: "90%"
  },
  {
    id: "4",
    title: "Joker",
    thumb: "images/Joker.jpg",
    genres: ["Drama", "Crime"],
    year: "2019",
    duration: "2h 2m",
    match: "91%"
  },
  {
    id: "5",
    title: "Avengers",
    thumb: "images/Avengers.webp",
    genres: ["Action", "Adventure"],
    year: "2012",
    duration: "2h 23m",
    match: "94%"
  },
  {
    id: "6",
    title: "Titanic",
    thumb: "images/Titanic.webp",
    genres: ["Romance", "Drama"],
    year: "1997",
    duration: "3h 14m",
    match: "89%"
  }
];


/* =========================================
   BUILD MOVIE CARD
========================================= */
function buildCard(movie) {
  return `
    <div class="card">
      <img class="card__thumb" src="${movie.thumb}" alt="${movie.title}">
      
      <div class="card__info">
        <p class="card__title">${movie.title}</p>

        <div class="card__meta-row">
          <span>${movie.match} Match</span>
          <span>${movie.year}</span>
          <span>${movie.duration}</span>
        </div>

        <p class="card__genres">${movie.genres.join(' · ')}</p>
      </div>
    </div>
  `;
}


/* =========================================
   SEARCH FUNCTION
========================================= */
function initSearch() {
  const input = $('.search-bar__input');
  const results = $('.search-results');

  if (!input || !results) return;

  input.addEventListener('input', function () {
    const query = input.value.toLowerCase().trim();

    // If empty → clear results
    if (query === "") {
      results.innerHTML = "";
      return;
    }

    // Filter movies
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(query)
    );

    // If no results
    if (filtered.length === 0) {
      results.innerHTML = `
        <p class="search-results__title">Results for "${query}"</p>
        <p style="color:white;">No movies found</p>
      `;
      return;
    }

    // Display results
    results.innerHTML = `
      <p class="search-results__title">Results for "${query}"</p>
      <div class="slider-track" style="flex-wrap:wrap;gap:6px;">
        ${filtered.map(buildCard).join('')}
      </div>
    `;
  });
}
/* =========================================
   PROFILE PAGE
========================================= */
function initProfile() {
  const editBtn = document.getElementById('editProfileBtn');
  const saveBtn = document.getElementById('saveProfileBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');

  const profileName = document.querySelector('.profile-card__name');
  const profileEmail = document.querySelector('.profile-card__email');

  if (!editBtn || !saveBtn || !logoutBtn || !nameInput || !emailInput || !profileName || !profileEmail) return;

  // Fill inputs with current data
  nameInput.value = profileName.textContent;
  emailInput.value = profileEmail.textContent;

  // Edit button
  editBtn.addEventListener('click', function () {
    nameInput.disabled = false;
    emailInput.disabled = false;
    saveBtn.style.display = 'inline-flex';
    nameInput.focus();
  });

  // Save button
  saveBtn.addEventListener('click', function () {
    profileName.textContent = nameInput.value;
    profileEmail.textContent = emailInput.value;

    nameInput.disabled = true;
    emailInput.disabled = true;
    saveBtn.style.display = 'none';
  });

  // Logout button
  logoutBtn.addEventListener('click', function () {
    alert('You have been logged out.');
    window.location.href = 'login.html';
  });
}

/* =========================================
   INITIALIZE  EVERYTHING
========================================= */
document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  initSearch();
  initProfile();
});
