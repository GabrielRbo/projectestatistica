
const btnUpload = document.getElementById("botaoUpload");
const customBtn = document.getElementById("custom-button");
const customTxt = document.getElementById("custom-text");

customBtn.addEventListener("click", function() {
  btnUpload.click();
});

btnUpload.addEventListener("change", function() {
  if (btnUpload.value) {
    customTxt.innerHTML = btnUpload.value.match(
      /[\/\\]([\w\d\s\.\-\(\)]+)$/
    )[1];
  } else {
    customTxt.innerHTML = "Nenhum arquivo selecionado";
  }
});

