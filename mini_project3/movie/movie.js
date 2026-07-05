const apiKey = "364e37bc";

const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const movieResult = document.getElementById("movieResult");

searchBtn.addEventListener("click", getMovie);

movieInput.addEventListener("keypress", function(event){

if(event.key==="Enter"){

getMovie();

}

});

async function getMovie(){

const movie = movieInput.value.trim();

if(movie===""){

alert("Please enter a movie name.");

return;

}

const url=`https://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;

try{

movieResult.innerHTML="<h2>Loading...</h2>";

const response=await fetch(url);

const data=await response.json();

if(data.Response==="False"){

throw new Error(data.Error);

}

displayMovie(data);

}

catch(error){

movieResult.innerHTML=`<h2>${error.message}</h2>`;

}

}

function displayMovie(data){

movieResult.innerHTML=`

<div class="movie">

<img src="${data.Poster}" alt="${data.Title}">

<h2>${data.Title}</h2>

<p><strong>Year:</strong> ${data.Year}</p>

<p><strong>Genre:</strong> ${data.Genre}</p>

<p><strong>IMDb Rating:</strong> ⭐ ${data.imdbRating}</p>

<p><strong>Runtime:</strong> ${data.Runtime}</p>

<p><strong>Plot:</strong><br>${data.Plot}</p>

</div>

`;

}