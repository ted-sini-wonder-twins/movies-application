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
const {getMovies} = require('./api.js');

// Function to create HTML
function createCard(title, rating) {
  var html = "";
  html += "<div class=\" col-4 card p-0\">";
    html += "<div class=\"card-body\">";
      html += "<h5 class=\"card-title\">" + title + "</h5>";
      html += "<p> Rating: " + rating + "</p>";
    html += "</div>";
    html += "<div class=\"card-footer d-flex justify-content-around\">";
      html += "<a href=\"#\" class=\" badge-pill badge-primary\">DELETE</a>";
      html += "<a href=\"#\" class=\" badge-pill badge-primary\">EDIT</a>";
    html += "</div>";
  html += "</div>";
  // console.log(html);
  return html;
}

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    $("#movie-area").append( createCard(title,rating) )
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
