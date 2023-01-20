var addLanguageButton = document.getElementById("addLanguage")
var addTool = document.getElementById("addTool")
var selectTag = document.getElementById("id_language")
addLanguageButton.addEventListener("click", addLanguage)
var tabName = document.getElementById("languageInput")
console.log(tabName.value)
function addLanguage() {
  
  var option = document.createElement("option")
  option.innerHTML = tabName.value
  option.value =  tabName.value
  option.classList.add(tabName.value)
  selectTag.append(option)
  option.selected = "selected"
}