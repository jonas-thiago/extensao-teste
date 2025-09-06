// Função para carregar o conteúdo do arquivo navbar.html
async function loadNavbar() {
  try {
    const response = await fetch('/navbar.html');
    if (!response.ok) {
      throw new Error(`Erro ao carregar a barra de navegação: ${response.statusText}`);
    }
    const htmlContent = await response.text();
    document.getElementById('navbar-placeholder').innerHTML = htmlContent;
  } catch (error) {
    console.error(error);
  }
}

// Chama a função quando a página é carregada
document.addEventListener('DOMContentLoaded', loadNavbar);