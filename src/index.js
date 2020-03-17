
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
const {getMovies, deleteMovies, editMovies, postMovies} = require('./api.js');
// $(document).ready( () => {

let userTitle = '';
let userRating = '';

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
            <h5 class="editable" id="new-user-title">${title}</h5>
            <h5>Rating:<span class="editable" id="new-user-rating">${rating}</span></h5>
            <div class="d-flex mt-5 w-100 justify-content-around">
                <i class="fas fa-edit cLink" id="${id}-edit"></i>
                <i class="far fa-trash-alt cLink" id="${id}-delete"></i>
            </div>
         </div>
     </div>
  </div>
`;
    // Console log for debugging
    // console.log(html);
    return html;
  }

// Function for creating cards
let createCards = (movies) => {
  movies.forEach(({title, rating, img, id}) => {
    // Console log for debugging
    // console.log(`id#${id} - ${title} - rating: ${rating} - img: ${img}`);
    // Added cards to div / creates cards using movie info
    $("#movie-area").append(createCard(title, rating, img, id));

  });

  // Add click event for trash can
  $(".fa-trash-alt").on('click', (e) => {
    // Console log for debugging
    console.log(parseFloat(e.target.id));
    console.log("delete");
    // Takes value of id and turn it into a number
    let parsing = parseFloat(e.target.id);
    // Using Id deletes movie
    deleteMovies(parsing)
        .then(data => {
          // Clears data in div where movies goes
          $("#movie-area").empty();
          // Gets new database and generates cards for them
          getMovies()
              .then((movies) => {
                createCards(movies);
              })
              .catch((error) => {
                alert('Oh no! Something went wrong.\nCheck the console for details.');
                console.log(error);
              });
        });
  });

  // Click on the pencil to allow user to edit info
  $(".fa-edit").on('click', (e) => {
    let editID = parseInt(e.target.id);
    // console.log(editID);
    let editTitle;
    let editRating;
    // Turn title and rating into editable fields and turn background white for visual cue
    $('.editable').attr('contentEditable', 'true').css('background-color','white');

    // Create btn and text telling user to update fields
    $(e.target).parent().parent().append(`<button class="btn" id="user-update">Update</button>`).prepend(`<p>Edit info</p>`);

    // On Update click take user info
    $($("#user-update").click( (u)=>{
      editTitle = $(u.target).parent().children(":nth-child(2)").text();
      editRating = $(u.target).parent().children(":nth-child(3)").children()[0].innerHTML;
      // console.log(editTitle);
      // console.log(editRating);

      // Remove Update button and make content non-editable
      $(u.target).remove();
      $(".editable").removeAttr('contentEditable').css("background-color","none");

      // Place edit movie info into an object
      let editedMovie = {title:editTitle,rating:editRating};
      // console.log(editedMovie);

      // Run function to retrieve movie by id and modify content based on new info
      editMovies(editID,editedMovie);

      // Erases cards currently, gets new database and generates cards for them
      $("#movie-area").empty();
      getMovies()
          .then((movies) => {
            createCards(movies);
          })
          .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
          });
    }))
  });
};

// Runs movies and take the readable file
  getMovies().then((movies) => {
    createCards(movies);
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });

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
    postMovies(title, rating);
    $('#movie-area').empty();
    getMovies()
        // Create card and add to HTML
        .then((data) => createCards(data))
        .catch((error) => {
          alert('Oh no! Something went wrong.\nCheck the console for details.');
          console.log(error);
        });

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

  //function searchMovies(e) {
//     e.preventDefault();
//     var html = "";
//     for (var i = 0; i < movies.length; i += 1) {
//         if (movies[i].name.toLowerCase().includes(document.getElementById("movie-input").value.toLowerCase())){
//             console.log(movies.name);
//             html = html + createCard(movies[i]);
//         }
//         document.innerHTML = html;
//     }
// }


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

// });