import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_wKRnPo5y7KEVSQtM7c8ZT70nmrZUI4WAwxGAv8701CgGhuJ2qXMb1OhoCRIlzFUB';
const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT = '/breeds';

function fetchBreeds() {
  return fetch(`${BASE_URL}${END_POINT}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
}

export { fetchBreeds, fetchCatByBreed };
