
/**
 * es6 modules and imports
 */
import sayHello from './hello';
import $ from 'jquery'
import 'bootstrap'

sayHello('World');


/**
 * require style imports
 */
const {getMovies, deleteMovie, editMovies, postMovies} = require('./api.js');
$(document).ready( () => {

// Function to create HTML
  function createCard(title, rating, img, id) {
    // Variable for empty string
    var html = "";
    // Push all elements of the card to the string
    html += `
  <div class="card col-lg-3 p-0 bg-transparent border-dark">
     <div class="flip position-relative w-100 h-100 text-center">
         <div class="front position-absolute w-100 h-100">
            <img src="../${img}" class="h-100 w-100" alt="movie poster">
         </div>
         <div class="back position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <h5>${title}</h5>
            <h5>Rating: ${rating}</h5>
            <div class="d-flex mt-5 w-100 justify-content-around">
                <i class="fas fa-edit cLink"></i>
                <i class="far fa-trash-alt cLink" id="${id}"></i>
            </div>
         </div>
     </div>
  </div>
`;
    // Console log for debugging
    // console.log(html);
    return html;
  }

// When Delete button is clicked
// $("#movie-area").on("click",$("li.fa-trash-alt"), () => {
//   // Console log for debugging
//   console.log("click");
//   // Set id to variable
//   let movieId = $(this).parentsUntil(".card").attr("id");
//   console.log(movieId);
// });

  $(document).on("click","#main-nav", () => {
    console.log($(this));
    console.log("clicked");
  });
// Runs movies and take the readable file
  getMovies().then((movies) => {
    // Console log for debugging
    console.log('Here are all the movies:');
    // Cycles thru each movie in the database
    movies.forEach(({title, rating, img, id}) => {
      // Console log for debugging
      console.log(`id#${id} - ${title} - rating: ${rating} - img: ${img}`);
      // Added cards to div / creates cards using movie info
      $("#movie-area").append(createCard(title, rating, img, id));
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });


// $("#main-nav").on("click", ()=> {
//   console.log($(this).html());
//
// });

// When user submits their movie
  $("#customEntry").click(() => {
    // Take text in title field
    let title = $("#customTitle").val();
    // Take text in rating field
    let rating = $("#customRating").val();
    // Console logs for debugging
    // console.log(title);
    // console.log(rating);

    // Add movie based on info
    postMovies(title, rating)
        // Create card and add to HTML
        .then(() => $("#movie-area").append(createCard(title, rating, "img/coming-soon.png")));

    // Clears text fields
    $("#customTitle").val("");
    $("#customRating").val("");
  });

// When user closes "add movie" modal
  $("#closeBtn").click(() => {
    // Clears text fields
    $("#customTitle").val("");
    $("#customRating").val("");
  });


//start of js animation testing
  const headerimage = document.querySelector(".headerimage");
  const slider = document.querySelector(".slider");
  const logo = document.querySelector("#logo");
// const logo2 = document.querySelector("#logo2");
  const headline = document.querySelector(".headline");

  const tl = new TimelineMax();

  tl.fromTo(headerimage, 3, {height: "0%"}, {height: "90%", ease: Power1.easeInOut})
      .fromTo(
          headerimage,
          1.2,
          {width: "100%"},
          {width: "80%", ease: Power1.easeInOut}
      )

      .fromTo(
          slider,
          1.2,
          {x: "-100%"},
          {x: "0%", ease: Power1.easeInOut},
          "-=1.2"
      )

      .fromTo(logo, 0.9, {opacity: 0, x: 30}, {opacity: 5, x: 0}, "-=0.15")
      // .fromTo(logo2, 0.8, { opacity: 0, x: 30 }, { opacity: 5, x: 0 }, "-=0.15")
      .fromTo(headline, 0.7, {opacity: 0, x: 30}, {opacity: 5, x: 0}, "-=0.15");
//end of js animation header testing

// Grab the nav element
  const nav = document.querySelector('#main-nav');
// Set nav distance from top of screen to a variable
  let topOfNav = nav.offsetTop;

// Function that will change settings once nav reaches top of scree
  function fixNav() {
    if (window.scrollY >= topOfNav) {
      document.body.style.paddingTop = (nav.offsetHeight + 40) + 'px';
      document.body.classList.add('fixed-nav');
    } else {
      document.body.classList.remove('fixed-nav');
      document.body.style.paddingTop = 0;
    }
  }

// monitors when screen is scrolled
  window.addEventListener('scroll', fixNav);

});