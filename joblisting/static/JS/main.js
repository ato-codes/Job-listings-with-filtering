var tooltabs = document.getElementById("toolTabs")
var languagetabs = document.getElementById("languagetabs")
var tab = document.getElementsByClassName("tab")
var addLanguage = document.getElementById("addLanguage")
var addTool = document.getElementById("addTool")
var selectList1 = document.getElementById("id_tools")
var selectList2 = document.getElementById("id_language")
addTool.addEventListener("click", addTools);
function addTools() {
    var tabName = document.getElementById("toolsInput")
    var tabDiv = document.createElement("div");
    tabDiv.classList.add("tab")
    var tabP = document.createElement("p")
    tabP.classList.add("tabP")
    var tabI = document.createElement('i')
    tabI.classList.add("bx")
    tabI.classList.add("bx-x")
    tabP.innerHTML = tabName.value
    tabDiv.appendChild(tabP)
    tabDiv.appendChild(tabI) 
    tooltabs.append(tabDiv)
    stoolsInput = document.getElementById("StoolsInput")
    stoolsInput.value += tabName.value + ","
    tabName.value = ""
  }

  addLanguage.addEventListener("click", addLanguages)
  function addLanguages() {
    var tabName = document.getElementById("languageInput")
    var tabDiv = document.createElement("div");
    tabDiv.classList.add("tab")
    var tabP = document.createElement("p")
    tabP.classList.add("tabP")
    var tabI = document.createElement('i')
    
    tabI.classList.add("bx")
    tabI.classList.add("bx-x")
    tabP.innerHTML = tabName.value

    tabDiv.appendChild(tabP)
    tabDiv.appendChild(tabI) 
    languagetabs.append(tabDiv)
    SlanguageInput = document.getElementById("SlanguageInput")
    SlanguageInput.value += tabName.value + ","
    tabName.value = ""
  }
