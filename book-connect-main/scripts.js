import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

let matches = books;
let page = 1;
const range = [0, 10];

const starting = document.createDocumentFragment()

// Iterates over the details of the books listed in the scripts.js file

for (const { author, id, image, tittle } of matches.slice(0, BOOKS_PER_PAGE)) {
  const element = document.createElement('book-preview');
  element.setAttribute('image', image);
  element.setAttribute('title', tittle);
  element.setAttribute('author', author);

  starting.appendChild(element);
}

// we need to create the class that extends HTMLElement:
class BookPreview extends HTMLElement {}

// Now, we'll add the constructor and setAttribute() methods:
BookPreview.prototype.constructor = function() {
  this.id = 'book-preview';
}
BookPreview.prototype.setAttribute = function(name, value) {
  this.setAttributeNode(name, value);
}
// Next, we'll create the customElements.define() call:
customElements.define('book-preview', BookPreview);

// now we need to add the document.registerElement() call:
document.registerElement('book-preview');
// we'll add the render() method, which will add the HTML for the element:
BookPreview.prototype.render = function() {
  var el = this.createElement('div');
  el.innerHTML = '<span class="title">' + this.title + '</span><span class="author">' + this.author + '</span><img src="' + this.image + '" />';
  this.appendChild(element)
}
  // now we need to use our BookPreview class in our for loop, so we can create an instance of the class for each book:
  for (const { author, id, image, tittle } of matches.slice(0, BOOKS_PER_PAGE)) {
    const bookPreview = new BookPreview();
    bookPreview.setAttribute('id', id);
    bookPreview.setAttribute('image', image);
    bookPreview.setAttribute('title', tittle);
    bookPreview.setAttribute('author', author);
    document.body.appendChild(bookPreview)
  }


class Errors {
  constructor() {
    //if this class is accessed directly throw an error because it's an abstract class
    if(this.constructor(!books || !Array.isArray(books))) {
      throw new TypeError('Source required');
    }
    //if this class is extended and this abstract method is not an array with two numbers throw an error
    if (this.info(!range || range.length < 2)) {
      throw new TypeErrorError('Range must be an array with two numbers');
    }
  }
}

const day = {
  dark: '10, 10, 20',
  light: '255, 255, 255',
};

const night = {
  dark: '255, 255, 255',
  light: '10, 10, 20',
};

const fragment = document.createDocumentFragment();
const extracted = books.slice(0, 36);

function createPreview(bookData) {
  const { author, image, title } = bookData;

  const preview = document.createElement('div');
  preview.classList.add('preview');

  const previewImage = document.createElement('img');
  previewImage.src = image;
  previewImage.alt = title;
  preview.appendChild(previewImage);

  const previewTitle = document.createElement('h2');
  previewTitle.textContent = title;
  preview.appendChild(previewTitle);

const previewAuthor = document.createElement('p');
previewAuthor.textContent = authors[author];
preview.appendChild(previewAuthor);

return preview;
}

function createPreviewFragment(data, start, end) {
const fragment = document.createDocumentFragment();

for (let i = start; i < end && i < data.length; i++) {
  const { author, image, title, id } = data[i];

  const preview = createPreview({
    author,
    id,
    image,
    title
  });

  fragment.appendChild(preview);
}

return fragment;
}

for (let i = 0; i < extracted.length; i++) {
const { author, image, title, id } = extracted[i];

const preview = createPreview({
  author,
  id,
  image,
  title
});

fragment.appendChild(preview);
}

function createAll(allCategories, dataCategories, fragments) {
  document.querySelector(dataCategories).appendChild(fragments);

  const genresFragment = document.createDocumentFragment();
  let element = document.createElement('option');
  element.value = 'any';
  element.innerText = allCategories;
  genresFragment.appendChild(element);

  for (const [id, name] of Object.entries(genres)) {
    element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    genresFragment.appendChild(element);
  }
}
createAll('All genres', '[data-list-items]', fragment);
createAll('All authors', '[data-search-genres]', genresFragment, authorsFragment);


const v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

const css = {
day: {
  dark: '10, 10, 20',
  light: '255, 255, 255',
},
night: {
  dark: '255, 255, 255',
  light: '10, 10, 20',
},
};

// Define an object to hold references to elements in the DOM
const elements = {
  listItems: document.querySelector('[data-list-items]'),
  searchGenres: document.querySelector('[data-search-genres]'),
  searchAuthors: document.querySelector('[data-search-authors]'),
  settingsTheme: document.querySelector('[data-settings-theme]'),
  listButton: document.querySelector('[data-list-button]'),
  searchOverlay: document.querySelector('[data-search-overlay]'),
  searchTitle: document.querySelector('[data-search-title]'),
  settingsOverlay: document.querySelector('[data-settings-overlay]'),
  listActive: document.querySelector('[data-list-active]')
};


document.documentElement.style.setProperty('--color-dark', css.dark);
document.documentElement.style.setProperty('--color-light', css.light);
document.querySelector('[data-list-button]').textContent = `Show more (${Math.max(0, matches.length - page * BOOKS_PER_PAGE)})`;

document.querySelector('[data-list-button]').disabled === !(matches.length - page * BOOKS_PER_PAGE > 0);

document.querySelector('[data-list-button]').innerHTML = `
<span>Show more</span>
<span class="list__remaining">(${Math.max(0, matches.length - page * BOOKS_PER_PAGE)})</span>
`;

document.querySelector('[data-search-cancel]').addEventListener('click', () => {
if (!document.querySelector('[data-search-overlay]').showModal()) {
  // Handle the click event
}
});

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
if (!document.querySelector('[data-settings-overlay]').showModal().open()) {
  // Handle the click event
}
});

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
event.preventDefault();
// Handle the form submission
});

document.querySelector('[data-list-close]').addEventListener('click', () => {
if (!document.querySelector('[data-list-active]').showModal().open()) {
  // Handle the click event
}
});

document.querySelector('[data-list-button]').addEventListener('click', () => {
const start = page * BOOKS_PER_PAGE;
const end = (page + 1) * BOOKS_PER_PAGE;
const fragment = createPreviewFragment(matches, start, end);
document.querySelector('[data-list-items]').appendChild(fragment);
document.querySelector('[data-list-button]').textContent = `Show more (${Math.max(0, matches.length - (page + 1) * BOOKS_PER_PAGE)})`;
document.querySelector('[data-list-button]').disabled = !(matches.length - (page + 1) * BOOKS_PER_PAGE > 0);
page++;
});

document.querySelector('[data-header-search]').addEventListener('click', () => {
if (document.querySelector('[data-search-overlay]').showModal()) {
  document.querySelector('[data-search-title]').focus();
}
});

document.querySelector('[data-search-cancel]').addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').close();
 });


document.querySelector('[data-header-settings]').addEventListener('click', () => {
  if (document.querySelector('[data-settings-overlay]').showModal()) {
    document.querySelector('[data-settings-theme]').focus();
  }
});


  constructor() 
    super();
  
  // add the "is" attribute:

  is = () => {
    const { data_theme } = this.attributes;
    if (data-theme === 'light') {
      return 'light';
    } else if (data-theme === 'dark') {
      return 'dark';
    } else {
      return 'default';
    }
  }
  // add the methods from the script tag to the custom element:
  
  scrollTo = () => {
    const { scrollTop } = this

    search = (event) => {
      const text = event.target.value;
      this.attributes.searchTitle.textContent = text;
      this.attributes.searchGenres.forEach((genre) => {
        if (genre.indexOf('Contemporary') != -1) {
          this.attributes.searchGenres.textContent = genre.replace(' Contemporary', 'Contemporary');
        }
      });
    };

    settings = (event) => {
      const theme = event.target.value;
      this.attributes.settingsTheme.classList.toggle('light');
      this.attributes.settingsTheme.classList.toggle('dark');
    };
    
    close = () => {
      this.attributes.searchGenres.classList.remove('visible');
      this.attributes.settingsTheme.classList.remove('visible');
    };
  }

    
document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
  document.querySelector('[data-settings-overlay]').close();
 });





document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
event.preventDefault();
const formData = new FormData(event.target);
const filters = Object.fromEntries(formData);
const result = [];

for (const book of books) {
  const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
  const authorMatch = filters.author === 'any' || book.author === filters.author;
  let genreMatch = false;

  if (filters.genre === 'any') {
    genreMatch = true;
  } else {
    for (const genre of book.genres) {
      if (genre === filters.genre) {
        genreMatch = true;
        break;
      }
    }
  }

  if (titleMatch && authorMatch && genreMatch) {
    result.push(book);
  }
}

if (result.length < 1) {
  document.querySelector('[data-list-message]').classList.add('list__message');
} else {
  document.querySelector('[data-list-message]').classList.remove('list__message');
}

document.querySelector('[data-list-items]').innerHTML = '';
const fragment = createPreviewFragment(result, range[0], range[1]);
document.querySelector('[data-list-items]').appendChild(fragment);
const initial = Math.max(0, result.length - page * BOOKS_PER_PAGE);
const remaining = result.length > page * BOOKS_PER_PAGE ? initial : 0;

document.querySelector('[data-list-button]').disabled = initial > 0;

document.querySelector('[data-list-button]').innerHTML = `
  <span>Show more</span>
  <span class="list__remaining">(${remaining})</span>
`;

window.scrollTo(0, 0);
document.querySelector('[data-search-overlay]').open() = false;
});

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
event.preventDefault();
const formData = new FormData(event.target);
const result = Object.fromEntries(formData);
document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
document.documentElement.style.setProperty('--color-light', css[result.theme].light);
document.querySelector('[data-settings-overlay]').open() === false;
});

document.querySelector('[data-list-items]').addEventListener('click', (event) => {
const pathArray = Array.from(event.path || event.composedPath());
let active = null;

for (const node of pathArray) {
  const previewId = node?.dataset?.preview;

  for (const singleBook of books) {
    if (singleBook.id === previewId) {
      active = singleBook;
      break;
    }
  }

  if (active) {
    break;
  }
}

if (!active) {
  return;
}

document.querySelector('[data-list-active]').showModal();
document.querySelector('[data-list-blur]').src = active.image;
document.querySelector('[data-list-title]').textContent = active.title;
document.querySelector('[data-list-subtitle]').textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
document.querySelector('[data-list-description]').textContent = active.description;

});