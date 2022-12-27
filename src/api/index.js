import axios from 'axios';

const API_KEY = "32288406-b66d59f2ed44691f7d029918e";
axios.defaults.baseURL = 'https://pixabay.com';


export class NewsApiService {
  constructor() {
      this.searchQuery = "";
      this.gallery = ''
      this.page = 1;
  }
    
    async getData(searchQuery) {
  try {
      const { data } = await axios.get(`/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&${this.page}`);
      if (data.total === 0) throw new Error(error.message)
      return data
  } catch (error) {
   throw new Error (error.message)
  }
    }
    

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

}