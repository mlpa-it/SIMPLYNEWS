// MLPA - part attribution to Marcus from Vaadin for concept/code 
const apiKey = '8b84f82ba0fa4090815f67193925a919';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'abc-news-au';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    });
}); 

async function updateSources() {
//    const resp = await fetch(`https://newsapi.org/v2/sources?country=au&apiKey=${apiKey}`);
    const resp = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
    const json = await resp.json(); 

    sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n ');
}

async function updateNews(source = defaultSource) {
    const resp = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
    const json = await resp.json();
    
    main.innerHTML = json.articles.map(createArticle).join('\n ');
}

function createArticle(article){
    return `
    <center>
    <div class="article">
     <a href="${article.url}">
      <h2>${article.title}</h2>
      <img src="${article.urlToImage}">
     </a>
     </div>
     </center>
    `;
}

