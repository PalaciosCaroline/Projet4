// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBtnClose = document.querySelector(".close");
const form = document.getElementById('entry')
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const radios = document.querySelectorAll('input[name="location"]');
const checkBorder = document.querySelectorAll('.locations > .checkbox-label > span[class="checkbox-icon"]');
const location1 = document.getElementById("location1");
const checkbox1 = document.getElementById('checkbox1');
const cguBorder = document.getElementById('span-cgu')
const pageMain =  document.getElementById('pageMain');
const pageFooter = document.getElementById('pageFooter');
const textControl = document.querySelectorAll('.text-control');

hamburger.onclick = () => {
  hamburger.classList.toggle("open");
  nav_ul.classList.toggle("slide");
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal open form
function launchModal() {
  modalbg.style.display = "block";
  pageMain.style.display = "none";
  pageFooter.style.display = "none";
  //rajout de réutilisation du formulaire après confirmation et fermeture
  messageEnvoi.style.display = 'none';
  form.classList.remove('invisibleForm');
  //close menu nav when form open
    if (hamburger.classList.contains("open")){
      hamburger.classList.remove("open");
      nav_ul.classList.remove("slide");
    }
};

// close mmodal
const closeModal = () => {
  modalbg.style.display = "none"; 
  pageMain.style.display = 'block';
  pageFooter.style.display = "block";
};

// Close modal event
modalBtnClose.onclick = closeModal;
document.getElementById('close2').onclick = closeModal;

//retain data when the form is incorrectly completed
form.addEventListener("submit", (event) => event.preventDefault());

//Preparation of Error messsage (opacity = 0)
const placeMessage = (input,message) => input.parentNode.setAttribute('data-error',message);
placeMessage(firstName,'Entrer 2 lettres minimum pour le champ du prénom.')
placeMessage(lastName,'Entrer 2 lettres minimum pour le champ du nom.')
placeMessage(email,'Une adresse email valide est requise')
placeMessage(birthdate,'Entrer votre date de naissance, 12ans minimum sont requis')
placeMessage(quantity,'Une valeur numérique doit être saisie')
placeMessage(location1,'Veuillez choisir une option.')
placeMessage(checkbox1,'Veuillez vérifier que vous acceptez bien les termes et conditions.')

//writing white help message (color=white and opacity=1)
const errorWhite = (element) => {element.parentNode.classList = ("formData white");}

//Writing red error message (color=red and opacity=1)
const errorRed = (element) => {element.parentNode.classList = ("formData red")};
function redBorder(input) {
  if(input == 'location1') {return checkBorder.forEach((i) => i.classList.add('colorred'))}
  else if (input == 'checkbox1') {return cguBorder.classList.add('colorred')}
}  
//Deletion of messages
const noError = (element) => element.parentNode.classList = ("formData");
function noBorder(input) {
  if (input == 'location1') {return checkBorder.forEach((i) => i.classList.remove('colorred'))}
  else if (input == 'checkbox1') {return cguBorder.classList.remove('colorred')}
}

//regex and test 
const nameRegex = /^[a-zA-Z-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]{2,}$/;
function giveTest(id) {
if (id == 'firstName'){return nameRegex.test(firstName.value.trim())}
else if (id == 'lastName'){return nameRegex.test(lastName.value.trim())}
else if (id == 'email') { return (email.value.trim()).match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)}
else if (id == 'quantity') { return quantity.value.match(/^[0-9]+$/)}
else if (id == 'birthdate') {const date = new Date(birthdate.value);
  const now = Date.now();
  const oneYear = 365.25 * 24 * 60 * 60 * 1000; //one year of secondes
  const age = (now - date) / oneYear;
  if (!(date instanceof Date) || isNaN(date) || age < 12 || age > 130){ return false;
  } else {return true;}}
else if (id == 'location1') {const Locationchecked = document.querySelector("input[name='location']:checked");return Locationchecked !== null} 
else if (id == 'checkbox1') {return checkbox1.checked}
}

//help and control on write
textControl.forEach((input) => input.addEventListener("keyup", function() {errorWhite(input); (giveTest(this.id))? noError(input) : ''}));
radios.forEach((input) => input.addEventListener("change", () => verif(location1)));//if change
checkbox1.addEventListener("change", () => verif(checkbox1));//warning if uncheck cgu

//control focusout
textControl.forEach((input) => input.addEventListener("focusout", function() {(giveTest(this.id))? noError(input) : errorRed(input)}));

//Control firstName, lastName, email, quantity, birthdate, location of tournement and cgu
function verif(input) {
  if (!giveTest(input.id)) { errorRed(input);
    if (input == location1 || input == checkbox1) {redBorder(input.id);}
    return false;
  }  else { noError(input);
    if (input == location1 || input == checkbox1) {noBorder(input.id);}
  return true;
}};

//form validation function
function validate() {
  //control of every inputs
  let i=0
  for(let input of textControl) { verif(input); if(verif(input) == false){i++}}
  verif(location1); //validate if one input location is checked
  verif(checkbox1); 
  if (i > 0  || !verif(location1) || !verif(checkbox1)) {
    return false;
  } else{ 
    messageEnvoi.style.display = 'flex';
    form.classList.add('invisibleForm');
    bruitachievement();
    return true;
  }
}

//function bruitage
function bruitachievement(){
  const bruitachievement = new Audio();
  bruitachievement.src = "./bruit/achievement.wav";
  bruitachievement.play();
}