function mascaraCPF(input) {
  // 1. Remove qualquer caractere que não seja dígito
  let value = input.value.replace(/\D/g, "");

  // 2. Aplica a máscara (999.999.999-99)
  // Se o valor for maior que 3 dígitos, adiciona o primeiro ponto
  if (value.length > 3) {
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
  }

  // Se o valor for maior que 6 dígitos, adiciona o segundo ponto
  if (value.length > 6) {
    value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  }

  // Se o valor for maior que 9 dígitos, adiciona o traço
  if (value.length > 9) {
    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  }

  // 3. Limita o valor final a 14 caracteres (para garantir a máscara)
  if (value.length > 14) {
    value = value.substring(0, 14);
  }

  // 4. Atualiza o valor do campo
  input.value = value;
}

/*
  Função corrigida para máscara de telefone (fixo e celular)
  Formato: "XX XXXX-XXXX" ou "XX XXXXX-XXXX"
*/
function mascaraTel(input) {
  // 1. Remove tudo que não é dígito
  let value = input.value.replace(/\D/g, "");

  // 2. Limita a 11 dígitos (máximo para celular com DDD)
  value = value.substring(0, 11);

  // 3. Aplica a máscara dinamicamente
  let formattedValue = "";

  if (value.length > 10) {
    // Celular (11 dígitos): XX XXXXX-XXXX
    formattedValue = value.replace(/^(\d{2})(\d{5})(\d{4})/, "$1 $2-$3");
  } else if (value.length > 6) {
    // Fixo (10 dígitos ou menos, parcial): XX XXXX-XXXX
    formattedValue = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "$1 $2-$3");
  } else if (value.length > 2) {
    // Parcial (DDD + início): XX XXX...
    formattedValue = value.replace(/^(\d{2})(\d*)/, "$1 $2");
  } else {
    // Parcial (só DDD): XX...
    formattedValue = value;
  }

  // 4. Atualiza o valor do campo
  input.value = formattedValue;
}
