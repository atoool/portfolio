//code for about me tab card on clicks redirecting
function navigateTo(tab) {
  document.getElementById("v-pills-mob-apps-tab").className = "nav-link";
  document.getElementById("v-pills-tv-apps-tab").className = "nav-link";
  document.getElementById("v-pills-web-apps-tab").className = "nav-link";
  document.getElementById("v-pills-desktop-apps-tab").className = "nav-link";
  document.getElementById("v-pills-games-tab").className = "nav-link";
  document.getElementById("v-pills-backend-tab").className = "nav-link";
  document.getElementById("v-pills-mob-apps").className = "tab-pane fade";
  document.getElementById("v-pills-tv-apps").className = "tab-pane fade";
  document.getElementById("v-pills-web-apps").className = "tab-pane fade";
  document.getElementById("v-pills-desktop-apps").className = "tab-pane fade";
  document.getElementById("v-pills-games").className = "tab-pane fade";
  document.getElementById("v-pills-backend").className = "tab-pane fade";
  const cTab = document.getElementById(tab + "-tab");
  const selected = document.getElementById(tab);
  cTab.className = "nav-link active";
  selected.className = "tab-pane fade show active";
}

//code for portfolio slider
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}
function scrollWin() {
  const d = document.getElementById("portfolio112");
  d.scrollLeft += 500;
}

//code for number of experience in years
const dt = new Date().getFullYear() - 2019;
const expYear = dt + "+ Years of Experience";
document.getElementById("expYear").innerText = expYear;

//on project click view images
