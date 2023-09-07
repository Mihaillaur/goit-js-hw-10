import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { refs } from './refs';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
axios.defaults.headers.common['x-api-key'] =
  'live_wKRnPo5y7KEVSQtM7c8ZT70nmrZUI4WAwxGAv8701CgGhuJ2qXMb1OhoCRIlzFUB';

document.addEventListener('DOMContentLoaded', renderPage);

function renderPage() {
  fetchBreeds()
    .then(breeds => {
      refs.select.insertAdjacentHTML('beforeend', createSelect(breeds));
      new SlimSelect({
        select: '#selectElement',
      });
      refs.loader.classList.add('unvisible');
      refs.select.classList.remove('unvisible');
    })
    .catch(err => {
      refs.loader.classList.add('unvisible');
      console.log(err);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}
function createSelect(breeds) {
  return breeds
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}
refs.select.addEventListener('change', handlerChange);

function handlerChange(evt) {
  console.log(evt);
  console.log(evt.target.value);
  refs.loader.classList.remove('unvisible');
  const breedId = evt.target.value;
  refs.picture.innerHTML = ' ';
  refs.desc.innerHTML = ' ';
  fetchCatByBreed(breedId)
    .then(breed => createCatPage(breed))
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      refs.loader.classList.add('unvisible');
    });
}

function createCatPage(arr) {
  console.log(arr);
  const picture = `<img class="cat-picure" 
  src="${arr[0].url}" 
  alt="${arr[0].breeds[0].id}" 
  width ="600" height="400">`;
  const description = `<h1 class="title">${arr[0].breeds[0].name}</h1>
  <p class="breed-descr">${arr[0].breeds[0].description}</p>
  <h2 class="temp"></h2>
  <p class="temp-descr"><b>Temperament: </b>${arr[0].breeds[0].temperament}</p>`;
  refs.picture.insertAdjacentHTML('beforeend', picture);
  refs.desc.insertAdjacentHTML('beforeend', description);
}
