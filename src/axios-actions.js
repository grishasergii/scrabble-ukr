import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://scrabble-b09ce.firebaseio.com/'
});

export default instance;