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
  { id:"ar1", title:"Shabab Al Bomb", thumb:"https://assets.voxcinemas.com/posters/P_HO00011012.jpg", genres:["Comedy","Family"], year:"2026", duration:"1h 55m", match:"96%" },

  { id:"m8", title:"Siwar", thumb:"https://cdn.al-ain.com/lg/images/2025/7/20/205-094545-437490.jpg-2-.jpg", genres:["Drama","Family"], year:"2025", duration:"2h 0m", match:"94%" },

  { id:"ar3", title:"Mandoob", thumb:"https://i.ytimg.com/vi/kbfEXH6T4vA/maxresdefault.jpg", genres:["Drama","Thriller"], year:"2023", duration:"2h 2m", match:"91%" },

  { id:"ar2", title:"Norah", thumb:"https://tse1.mm.bing.net/th/id/OIP.-9ilX7RuwAkUZQdby9I0iAHaK7?rs=1&pid=ImgDetMain&o=7&rm=3", genres:["Drama"], year:"2023", duration:"1h 42m", match:"93%" },

  { id:"m1", title:"Dune: Part Two", thumb:"https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", genres:["Sci-Fi","Adventure"], year:"2024", duration:"2h 46m", match:"97%" },

  { id:"m2", title:"Oppenheimer", thumb:"https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", genres:["Drama","History"], year:"2023", duration:"3h 0m", match:"98%" },

  { id:"m3", title:"Deadpool & Wolverine", thumb:"https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg", genres:["Action","Comedy"], year:"2024", duration:"2h 8m", match:"95%" },

  { id:"m4", title:"Gladiator II", thumb:"https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg", genres:["Action","Drama"], year:"2024", duration:"2h 28m", match:"93%" },

  { id:"m5", title:"Alien: Romulus", thumb:"https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg", genres:["Horror","Sci-Fi"], year:"2024", duration:"1h 59m", match:"91%" },

  { id:"m6", title:"Inside Out 2", thumb:"https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg", genres:["Animation","Family"], year:"2024", duration:"1h 40m", match:"96%" },

  { id:"m7", title:"Planet of the Apes", thumb:"https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg", genres:["Sci-Fi","Action"], year:"2024", duration:"2h 25m", match:"92%" },

  { id:"m14", title:"The Dark Knight", thumb:"https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", genres:["Action","Crime"], year:"2008", duration:"2h 32m", match:"99%" },

  { id:"m15", title:"Avengers: Endgame", thumb:"https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", genres:["Action","Adventure"], year:"2019", duration:"3h 2m", match:"96%" },

  { id:"m17", title:"The Wild Robot", thumb:"https://image.tmdb.org/t/p/w500/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg", genres:["Animation","Family"], year:"2024", duration:"1h 41m", match:"97%" },

  { id:"m18", title:"Moana 2", thumb:"https://image.tmdb.org/t/p/w500/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg", genres:["Animation","Adventure"], year:"2024", duration:"1h 40m", match:"89%" },

  { id:"m19", title:"Kung Fu Panda 4", thumb:"https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg", genres:["Animation","Action"], year:"2024", duration:"1h 34m", match:"88%" },

  { id:"m20", title:"A Quiet Place: Day One", thumb:"https://image.tmdb.org/t/p/w500/yrpPYKijwdMHyTGIOd1iK1h0Xno.jpg", genres:["Horror","Thriller"], year:"2024", duration:"1h 39m", match:"90%" }
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
