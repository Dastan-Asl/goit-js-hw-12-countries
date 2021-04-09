import descriptionTemplate from '../../template/description_template.hbs';
import listTemplate from '../../template/list_template.hbs';
import { defaultModules, error } from '@pnotify/core/dist/PNotify';
import PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile';

defaultModules.set(PNotifyMobile, {});

const refs = {
  containerRef: document.querySelector('.container'),
  p: document.querySelector('.title'),
  notify: null,
};

const clearNotify = () => {
  if (refs.notify) {
    refs.notify.close(true);
    refs.notify = null;
  }
};

const fetchCountries = event => {
  const searchQuery = event.target.value;

  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 1) {
        clearNotify();

        refs.containerRef.innerHTML = '';
        const markup = descriptionTemplate(data);
        refs.containerRef.insertAdjacentHTML('beforeend', markup);
      } else if (data.length >= 2 && data.length <= 10) {
        clearNotify();

        refs.containerRef.innerHTML = '';
        const markup = listTemplate(data);
        refs.containerRef.insertAdjacentHTML('beforeend', markup);
      } else {
        refs.containerRef.innerHTML = '';

        refs.notify = error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      }
    });
};

export default fetchCountries;
