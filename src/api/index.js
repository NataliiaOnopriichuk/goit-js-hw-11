import axios from 'axios';

const API_KEY = "32288406-b66d59f2ed44691f7d029918e";
axios.defaults.baseURL = 'https://pixabay.com';


export class NewsApiService {
  constructor() {
      this.searchQuery = "";
      this.gallery = ''
      this.page = 1;
      this.per_page = 40
      this.lastPage = false
  }
    
    async getData() {
  try {
      const { data } = await axios.get(`/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&${this.page}`);
      if (data.total === 0) throw new Error(error.message)
      this.checkLastPage(data.totalHits)
      return data
  } catch (error) {
   throw new Error (error.message)
  }
    }
    
    checkLastPage(totalHits) {
    this.lastPage = totalHits <= (this.page + 1) * this.per_page
}

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

}