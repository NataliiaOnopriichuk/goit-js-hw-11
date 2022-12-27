import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "simplelightbox/dist/simple-lightbox.min.css";
import {refs} from './refs'
import { NewsApiService } from './api'
import { createCard, addCards } from './markup'


Notify.init({
    width: '350px',
    position: 'center-center',
    fontSize: '20px',
});

const newsApiService = new NewsApiService()

refs.form.addEventListener('submit', onSearch)
refs.loadMore.addEventListener('click', onLoadBtn)

async function onSearch(e) {
    e.preventDefault()

    addBtn();
    clearContainer()
    newsApiService.resetPage()
    try {
        if (e.target.searchQuery.value === '') return
newsApiService.searchQuery = e.target.searchQuery.value.trim()
         const response = await newsApiService.getData(this.searchQuery)  
         const markup = createCard(response.data.hits)
      addCards(refs.divGallery, markup)
            
    } catch (error) {
       Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
}

// let gallery = new SimpleLightbox('.gallery a');


async function onLoadBtn(e){
    try {
    newsApiService.incrementPage();
         const response = await newsApiService.getData(this.searchQuery)  
         const markup = createCard(response.data.hits)
      addCards(refs.divGallery, markup)
} catch (error) {
    console.log(error);
}
};

function clearContainer() {
  refs.divGallery.innerHTML = "";
}

   function addBtn(){
  refs.loadMore.classList.remove("is-hidden");
};




