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

let lastCard = ''
let totalPage = 0

const newsApiService = new NewsApiService()

refs.form.addEventListener('submit', onSearch)


async function onSearch(e) {
    e.preventDefault()

    clearContainer()
    newsApiService.resetPage()
    newsApiService.lastPage = false
    try {
        if (e.target.searchQuery.value === '') return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        newsApiService.searchQuery = e.target.searchQuery.value.trim()
        const data = await newsApiService.getData()  
        const markup = createCard(data.hits)
        Notify.info(`Hooray! We found ${data.totalHits} images.`);
        addCards(refs.divGallery, markup)
        lastCard = refs.divGallery.lastChild;
        observer.observe(lastCard);
        refs.form.reset()
        newsApiService.gallery = new SimpleLightbox('.photo-card a');
   
            
    } catch (error) {
       Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
}

let callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
        newsApiService.incrementPage();
        if (!newsApiService.lastPage) onLoad()
       else Notify.info("We're sorry, but you've reached the end of search results.");
      observer.unobserve(entry.target);
    }
  });
};

const options = {
  threshold: 1.0,
};

let observer = new IntersectionObserver(callback, options);

async function onLoad() {
    try {
        const data = await newsApiService.getData(this.searchQuery)  
        const markup = createCard(data.hits)
        addCards(refs.divGallery, markup)
        lastCard = refs.divGallery.lastChild;
        observer.observe(lastCard);
        newsApiService.gallery.refresh()
} catch (error) {
    console.log(error);
}
};

function clearContainer() {
  refs.divGallery.innerHTML = "";
}







