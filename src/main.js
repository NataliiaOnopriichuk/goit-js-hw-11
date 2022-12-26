import {refs} from './refs'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import {NewsApiService} from './api'

const newsApiService = new NewsApiService()

refs.form.addEventListener('submit', onSearch)
refs.loadMore.addEventListener('click', onLoadBtn)

function onSearch(e) {
    e.preventDefault()

    newsApiService.addBtn();
    clearContainer()
    newsApiService.resetPage()
     
Array.from(e.target.elements).forEach(({value}) => {
    if (value) {
        newsApiService.query = value
        newsApiService.getQuery(this.query)  
    }
});
}

function clearContainer() {
  refs.divGallery.innerHTML = "";
}

// let gallery = new SimpleLightbox('.gallery a');


function onLoadBtn(e){
    newsApiService.getQuery()
};







