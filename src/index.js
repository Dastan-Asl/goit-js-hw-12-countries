import fetchCountries from './js/fetchCountries';
import debounce from 'lodash/debounce';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  input: document.querySelector('#searchCountry'),
};

refs.input.addEventListener('input', debounce(fetchCountries, 500));
