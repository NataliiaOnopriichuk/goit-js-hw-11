import axios from 'axios';
import { createCard, addCards } from '../markup'
import {refs} from '../refs'

// const API_KEY = "32288406-b66d59f2ed44691f7d029918e";
// const BASE_URL = "https://pixabay.com";



// export async function getQuery(searchQuery = '', { per_page = 20, page = 1 } = {}) {
//         const searchParams = new URLSearchParams({ per_page, page });
//         console.log((searchParams).toString());
   
//   try {
//     const response = await axios.get(`${BASE_URL}/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&${searchParams}`);
   
//           const markup = createCard(response.data.hits)
//       addCards(refs.divGallery, markup)
//   } catch (error) {
//     console.error(error);
//   }
// }


const API_KEY = "32288406-b66d59f2ed44691f7d029918e";
const BASE_URL = "https://pixabay.com";


export class NewsApiService {
  constructor() {
    this.searchQuery = "";
      this.page = 1;
  }
    
    async getQuery(searchQuery) {
  try {
    const response = await axios.get(`${BASE_URL}/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&${this.page}`);
   
    const markup = createCard(response.data.hits)
      addCards(refs.divGallery, markup)
       this.incrementPage();
  } catch (error) {
    console.error(error);
  }
    }
    
    addBtn(){
  refs.loadMore.classList.remove("is-hidden");
};

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}