document.addEventListener('DOMContentLoaded', function() {
    // Para os arquivos em src/html/, o "../" faz a função de "voltar" para a pasta src/
    // O fetch() vai procurar o arquivo em src/footer.html
    fetch('/footer.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.text();
      })
      .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
      })
      .catch(error => console.error('Erro ao carregar o rodapé:', error));
  });