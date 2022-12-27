import axios from 'axios';

const API_KEY = "32288406-b66d59f2ed44691f7d029918e";
axios.defaults.baseURL = 'https://pixabay.com';


export class NewsApiService {
  constructor() {
    this.searchQuery = "";
      this.page = 1;
  }
    
    async getData(searchQuery) {
  try {
      const response = await axios.get(`/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&${this.page}`);
      if(response.data.total === 0)  throw new Error (response.statusText)
      return response
  } catch (error) {
   throw new Error (error)
  }
    }
    

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

}