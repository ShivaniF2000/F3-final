// Get the current date in the format 'YYYY-MM-DD'
const currentDate = new Date().toISOString().split("T")[0];

// Retrieve the API key from the NASA API website
const apiKey = 'YOUR_API_KEY';

// Function to fetch and display the current image of the day
function getCurrentImageOfTheDay() {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.media_type === 'image') {
        const imageContainer = document.getElementById('current-image-container');
        const image = document.createElement('img');
        image.src = data.url;
        image.alt = data.title;
        imageContainer.innerHTML = '';
        imageContainer.appendChild(image);
      } else {
        throw new Error('No image available for the current date.');
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
      const imageContainer = document.getElementById('current-image-container');
      imageContainer.innerHTML = `<p>${error.message}</p>`;
    });
}

// Function to fetch and display the image of the day for a selected date
function getImageOfTheDay(date) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.media_type === 'image') {
        const imageContainer = document.getElementById('current-image-container');
        const image = document.createElement('img');
        image.src = data.url;
        image.alt = data.title;
        imageContainer.innerHTML = '';
        imageContainer.appendChild(image);
        saveSearch(date);
        addSearchToHistory();
      } else {
        throw new Error('No image available for the selected date.');
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
      const imageContainer = document.getElementById('current-image-container');
      imageContainer.innerHTML = `<p>${error.message}</p>`;
    });
}

// Function to save the selected date to local storage
function saveSearch(date) {
  const searches = JSON.parse(localStorage.getItem('searches')) || [];
  searches.push(date);
  localStorage.setItem('searches', JSON.stringify(searches));
}

// Function to add the search history to the UI
function addSearchToHistory() {
  const searchHistory = document.getElementById('search-history');
  searchHistory.innerHTML = '';
  const searches = JSON.parse(localStorage.getItem('searches')) || [];
  searches.forEach(date => {
    const listItem = document.createElement('li');
    listItem.textContent = date;
    listItem.addEventListener('click', () => getImageOfTheDay(date));
    searchHistory.appendChild(listItem);
  });
}

// Event listener for the search form submission
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchInput = document.getElementById('search-input');
  const searchDate = searchInput.value;
  getImageOfTheDay(searchDate);
  searchInput.value = '';
});

// Load the current image of the day when the page loads
document.addEventListener('DOMContentLoaded', () => {
  getCurrentImageOfTheDay();
  addSearchToHistory();
});
