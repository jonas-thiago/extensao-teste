// O 'pathToRoot' será definido em cada página HTML
fetch(pathToRoot + '/footer.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar o footer. Verifique o caminho.');
    }
    return response.text();
  })
  .then(data => {
    // Certifique-se de que você tem um <div id="footer-placeholder"></div> no seu HTML
    document.querySelector('#footer-placeholder').innerHTML = data;
  })
  .catch(error => console.error('Erro no include_footer.js:', error));