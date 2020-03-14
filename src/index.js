/**
 * es6 modules and imports
 */
import sayHello from './hello';
import 'bootstrap'
import $ from 'jquery'

sayHello('World');


/**
 * require style imports
 */
const {getMovies, deleteMovie, editMovies, postMovies} = require('./api.js');


// Function to create HTML
function createCard(title, rating) {
  // Variable for empty string
  var html = "";
  // Push all elements of the card to the string
  html += `
  <div class=" col-4 card p-0">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p> Rating: ${rating}</p>
    </div>
    <div class="card-footer d-flex justify-content-around">
      <a href="#" class=" badge-pill badge-primary">DELETE</a>
      <a href="#" class=" badge-pill badge-primary">EDIT</a>
    </div>
  </div>`;
  // Console log for debugging
  // console.log(html);
  return html;
}

// Runs movies and take the readable file
getMovies().then((movies) => {
  // Console log for debugging
  console.log('Here are all the movies:');
  // Cycles thru each movie in the database
  movies.forEach(({title, rating, id}) => {
    // Console log for debugging
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    // Added cards to div / creates cards using movie info
    $("#movie-area").append( createCard(title,rating) )
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});




//start of js animation testing
const headerimage = document.querySelector(".headerimage");
const slider = document.querySelector(".slider");
const logo = document.querySelector("#logo");
const logo2 = document.querySelector("#logo2");
const headline = document.querySelector(".headline");

const tl = new TimelineMax();

tl.fromTo(headerimage, 3, { height: "0%" }, { height: "90%", ease: Power1.easeInOut })
    .fromTo(
        headerimage,
        1.2,
        { width: "100%" },
        { width: "80%", ease: Power1.easeInOut }
    )

    .fromTo(
        slider,
        1.2,
        { x: "-100%" },
        { x: "0%", ease: Power1.easeInOut },
        "-=1.2"
    )

    .fromTo(logo, 0.9, { opacity: 0, x: 30 }, { opacity: 5, x: 0 }, "-=0.15")
    .fromTo(logo2, 0.8, { opacity: 0, x: 30 }, { opacity: 5, x: 0 }, "-=0.15")
    .fromTo(headline, 0.7, { opacity: 0, x: 30 }, { opacity: 5, x: 0 }, "-=0.15");
//end of js animation header testing




