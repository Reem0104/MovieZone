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
 // Arabic / Saudi
      { id:"ar1", title:"Shabab Al Bomb",              thumb:"https://assets.voxcinemas.com/posters/P_HO00011012.jpg",                                       genres:["Comedy","Family"],       year:"2026", duration:"1h 55m", match:"96%", desc:"A group of young men find themselves facing a gang of forty. Amer's courage and innovative ideas turn enemies into heroes.",                                                                                              director:"حمد الحارثي",       lang:"Arabic"  },
      { id:"m8",  title:"Siwar",                        thumb:"https://cdn.al-ain.com/lg/images/2025/7/20/205-094545-437490.jpg-2-.jpg",                      genres:["Drama","Family"],        year:"2025", duration:"2h 0m",  match:"94%", desc:"A Saudi drama inspired by true 2003 events. Two newborns — one Saudi, one Turkish — switched in a Najran hospital. Explores identity and belonging across two families in distinct cultural environments.",  director:"Osama Al-Khuraiji", lang:"Arabic"  },
      { id:"ar3", title:"Mandoob",                      thumb:"https://i.ytimg.com/vi/kbfEXH6T4vA/maxresdefault.jpg",                                         genres:["Drama","Thriller"],      year:"2023", duration:"2h 2m",  match:"91%", desc:"A delivery driver is pulled into an underworld of secrets and moral dilemmas in Riyadh.",                                                                                                                        director:"Ali Kalthami",      lang:"Arabic"  },
      { id:"ar2", title:"Norah",                        thumb:"https://tse1.mm.bing.net/th/id/OIP.-9ilX7RuwAkUZQdby9I0iAHaK7?rs=1&pid=ImgDetMain&o=7&rm=3", genres:["Drama"],                 year:"2023", duration:"1h 42m", match:"93%", desc:"A Saudi girl seeks freedom and self-expression in 1990s rural Saudi Arabia.",                                                                                                                          director:"Tawfik Alzaidi",    lang:"Arabic"  },
      // International
      { id:"m1",  title:"Dune: Part Two",               thumb:"https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",                             genres:["Sci-Fi","Adventure"],    year:"2024", duration:"2h 46m", match:"97%", desc:"Paul Atreides unites with the Fremen to seek revenge against the conspirators who destroyed his family.",                                                                                           director:"Denis Villeneuve",  lang:"English" },
      { id:"m2",  title:"Oppenheimer",                  thumb:"https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",                             genres:["Drama","History"],       year:"2023", duration:"3h 0m",  match:"98%", desc:"The story of J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",                                                                                         director:"Christopher Nolan", lang:"English" },
      { id:"m3",  title:"Deadpool & Wolverine",         thumb:"https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",                             genres:["Action","Comedy"],       year:"2024", duration:"2h 8m",  match:"95%", desc:"Deadpool is recruited by the TVA and forced to team up with an unlikely Wolverine.",                                                                                                              director:"Shawn Levy",        lang:"English" },
      { id:"m4",  title:"Gladiator II",                 thumb:"https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",                             genres:["Action","Drama"],        year:"2024", duration:"2h 28m", match:"93%", desc:"Years after witnessing the death of Maximus, Lucius must enter the Colosseum to fight for Rome's future.",                                                                                     director:"Ridley Scott",      lang:"English" },
      { id:"m5",  title:"Alien: Romulus",               thumb:"https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",                             genres:["Horror","Sci-Fi"],       year:"2024", duration:"1h 59m", match:"91%", desc:"Young colonizers face the most terrifying life form in the universe aboard an abandoned space station.",                                                                                       director:"Fede Álvarez",      lang:"English" },
      { id:"m6",  title:"Inside Out 2",                 thumb:"https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",                             genres:["Animation","Family"],    year:"2024", duration:"1h 40m", match:"96%", desc:"Riley enters high school and a new emotion — Anxiety — crashes Headquarters.",                                                                                                               director:"Kelsey Mann",       lang:"English" },
      { id:"m7",  title:"Planet of the Apes",           thumb:"https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",                             genres:["Sci-Fi","Action"],       year:"2024", duration:"2h 25m", match:"92%", desc:"A new tyrannical ape leader builds an empire as a young human rises to challenge him.",                                                                                                      director:"Wes Ball",          lang:"English" },
      { id:"m11", title:"Nosferatu",                    thumb:"https://image.tmdb.org/t/p/w500/5qGIxdEO841C0tdY8vOdLoRVrr0.jpg",                             genres:["Horror","Gothic"],       year:"2024", duration:"2h 12m", match:"91%", desc:"A gothic tale of obsession between a haunted young woman and a terrifying ancient vampire who stalks her soul.",                                                                         director:"Robert Eggers",     lang:"English" },
      { id:"m12", title:"Inception",                    thumb:"https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",                             genres:["Action","Sci-Fi"],       year:"2010", duration:"2h 28m", match:"95%", desc:"A thief who steals corporate secrets through dream-sharing technology is given the impossible task of planting an idea.",                                                                   director:"Christopher Nolan", lang:"English" },
      { id:"m13", title:"Interstellar",                 thumb:"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",                             genres:["Sci-Fi","Drama"],        year:"2014", duration:"2h 49m", match:"97%", desc:"A team of explorers travel through a wormhole to ensure humanity's survival beyond our galaxy.",                                                                                       director:"Christopher Nolan", lang:"English" },
      { id:"m14", title:"The Dark Knight",              thumb:"https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",                             genres:["Action","Crime"],        year:"2008", duration:"2h 32m", match:"99%", desc:"Batman faces the Joker, a criminal mastermind who plunges Gotham City into devastating anarchy and chaos.",                                                                           director:"Christopher Nolan", lang:"English" },
      { id:"m15", title:"Avengers: Endgame",            thumb:"https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",                             genres:["Action","Adventure"],    year:"2019", duration:"3h 2m",  match:"96%", desc:"After the devastating events of Infinity War, the Avengers assemble for one final stand against Thanos.",                                                                               director:"Russo Brothers",    lang:"English" },
      { id:"m16", title:"Joker",                        thumb:"https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",                             genres:["Drama","Crime"],         year:"2019", duration:"2h 2m",  match:"91%", desc:"In Gotham City, a mentally troubled comedian embarks on a downward spiral that leads to a social revolution.",                                                                       director:"Todd Phillips",     lang:"English" },
      { id:"m17", title:"The Wild Robot",               thumb:"https://image.tmdb.org/t/p/w500/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",                             genres:["Animation","Family"],    year:"2024", duration:"1h 41m", match:"97%", desc:"A robot stranded on a wild island must adapt to nature and care for an orphaned gosling to survive.",                                                                               director:"Chris Sanders",     lang:"English" },
      { id:"m18", title:"Moana 2",                      thumb:"https://image.tmdb.org/t/p/w500/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg",                             genres:["Animation","Adventure"], year:"2024", duration:"1h 40m", match:"89%", desc:"Moana sets sail on a daring expedition to the far seas of Oceania and encounters new lands and ancient perils.",                                                                     director:"David Derrick Jr.", lang:"English" },
      { id:"m19", title:"Kung Fu Panda 4",              thumb:"https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",                             genres:["Animation","Action"],    year:"2024", duration:"1h 34m", match:"88%", desc:"Po must train a new Dragon Warrior while facing a cunning shape-shifting villain threatening the Valley of Peace.",                                                                  director:"Mike Mitchell",     lang:"English" },
      { id:"m20", title:"A Quiet Place: Day One",       thumb:"https://image.tmdb.org/t/p/w500/yrpPYKijwdMHyTGIOd1iK1h0Xno.jpg",                             genres:["Horror","Thriller"],     year:"2024", duration:"1h 39m", match:"90%", desc:"Experience the first terrifying hours of the alien invasion — the day the world went quiet.",                                                                                    director:"Michael Sarnoski",  lang:"English" },
      { id:"m21", title:"Longlegs",                     thumb:"https://image.tmdb.org/t/p/w500/ljqXKkpJbVJQfFClkTxjFsV4EAD.jpg",                             genres:["Horror","Mystery"],      year:"2024", duration:"1h 41m", match:"87%", desc:"An FBI agent investigating a string of murders uncovers terrifying evidence of the occult tied to a serial killer.",                                                                 director:"Osgood Perkins",    lang:"English" },
      { id:"m22", title:"Captain America: Brave New World", thumb:"https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",                        genres:["Action","Superhero"],    year:"2025", duration:"1h 58m", match:"87%", desc:"Sam Wilson's Captain America faces a global incident and a conspiracy threatening world peace.",                                                                                   director:"Julius Onah",       lang:"English" },
      { id:"m23", title:"Thunderbolts*",                thumb:"https://image.tmdb.org/t/p/w500/m9EtP1SB2tNnMFQOL6pPBPLXOqL.jpg",                             genres:["Action","Superhero"],    year:"2025", duration:"2h 10m", match:"91%", desc:"A group of Marvel antiheroes are recruited for a dangerous mission with world-altering stakes.",                                                                                  director:"Jake Schreier",     lang:"English" },
      { id:"m25", title:"Wicked",                       thumb:"https://image.tmdb.org/t/p/w500/c5Tqxeo1UpBvnAc3csUm7j3hlQl.jpg",                             genres:["Musical","Fantasy"],     year:"2024", duration:"2h 40m", match:"93%", desc:"The untold story of the witches of Oz, long before Dorothy arrived — a powerful story of friendship and courage.",                                                                  director:"Jon M. Chu",        lang:"English" },
      { id:"m26", title:"Twisters",                     thumb:"https://image.tmdb.org/t/p/w500/pjnD08FlMAIKIGnGSzKSlfPEMaA.jpg",                             genres:["Action","Adventure"],    year:"2024", duration:"2h 2m",  match:"89%", desc:"Storm chasers converge on the Oklahoma plains during the most extreme tornado season on record.",                                                                                     director:"Lee Isaac Chung",   lang:"English" },
      { id:"m27", title:"Frozen", thumb:"Images/Frozen.webp", genres:["Animation","Family"], year:"2013", duration:"1h 42m", match:"85%", desc:"Anna searches for Elsa to save the kingdom.", director:"Chris Buck", lang:"English" },
      { id:"m28", title:"Titanic", thumb:"Images/Titanic.webp", genres:["Romance","Drama"], year:"1997", duration:"3h 14m", match:"89%", desc:"A tragic love story aboard the Titanic.", director:"James Cameron", lang:"English" },
      { id:"m29", title:"Interstellar", thumb:"Images/Interstellar.webp", genres:["Sci-Fi","Drama"], year:"2014", duration:"2h 49m", match:"97%", desc:"Explorers travel through space to save humanity.", director:"Christopher Nolan", lang:"English" },
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
