import './css/styles.css';
import { debounce } from 'throttle-debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const card = document.querySelector('.country-info');



const debounceFunc = debounce(
    DEBOUNCE_DELAY, 
    (num) => {
        const inputText = `${input.value}`;
        const name = inputText.trim();
        if (name.length === 0) {
            countryList.innerHTML = "";
            card.innerHTML = "";
            return;
        }
        return fetchCountries(name);
        
    },
    
);

input.addEventListener('input', debounceFunc);



export function makeCountryElement(countries) {
      var countryElement = '';
        
        if (countries.length >= 10) {
           Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (countries.length >= 2 & countries.length < 10) {
            card.innerHTML = "";
             countryElement = countries.map((country) => `
       <li class ="country-element">
            <div class="country-img">
                <img class="country-flag" src="${country.flags.svg}" alt="${country.name}" width="50" height="30">
            </div>
             <p class="country-name">${country.name}</p>
        </li>
    `).join("");
        countryList.insertAdjacentHTML('afterbegin', countryElement);
        } else {
            countryList.innerHTML = "";
            countryElement = countries.map((country) => 
            `
       <h3 class="country-title">
        <img src="${country.flags.svg}" alt="${country.name}" width="50" height="30">
            <span class="title-text">${country.name}</span>
        </h3>
        <p class="country-description">capital: <span class="country-description-text">${country.capital}</span></p>
        <p class="country-description">population: <span class="country-description-text">${country.population}</span></p>
        <p class="country-description">languages: <span class="country-description-text">${country.languages.map(language => language.name)}</span></p>
    ` ).join("");
            card.insertAdjacentHTML('afterbegin', countryElement);
        }
    
}

export function fetchError(error) {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}

