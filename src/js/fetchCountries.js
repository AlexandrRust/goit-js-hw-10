import { makeCountryElement, fetchError } from '../index';


export function fetchCountries(name) {
    console.log(name);
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`).then((res) => {
        if (res.ok) {
            return res.json()
        }
    
    }).then((countries) => {
        makeCountryElement(countries);
    }).catch(fetchError).finally(() =>{});
    
}