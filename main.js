// MLPA - part attribution to Marcus from Vaadin for concept/code 
const apiKey = '8b84f82ba0fa4090815f67193925a919';
const main = document.querySelector('main');

window.addEventListener('load', e => {
    updateNews();
}); 

async function updateNews() {
    const resp = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    const json = await resp.json();
    
    main.innerHTML = json.articles.map(createArticle).join('\n ');
}

function createArticle(article){
    return `
    <div class="article">
     <a href="${article.url}">
      <h2>${article.title}</h2>
      <img src="${article.urlToImage}">
      <p>${article.description}</p>
     </a>
     </div>
    `;
}