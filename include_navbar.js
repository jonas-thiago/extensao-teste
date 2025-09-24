// O 'pathToRoot' será definido em cada página HTML
fetch(pathToRoot + 'navbar.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar o navbar. Verifique o caminho.');
    }
    return response.text();
  })
  .then(data => {
    // Certifique-se de que você tem um <div id="navbar-placeholder"></div> no seu HTML
    document.querySelector('#navbar-placeholder').innerHTML = data;
  })
  .catch(error => console.error('Erro no include_navbar.js:', error));