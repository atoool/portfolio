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

function showPortFolioModal(i, j) {
  let imgList = projects[i]?.list[j]?.img ?? [];
  if (imgList && imgList?.length > 0) {
    let imgListComp = '<div class="w3-content w3-display-container">';
    const imgListHtml = document.getElementById("imglist112");
    imgList?.map(
      (k) =>
        (imgListComp += `
      <img class="mySlides" src="${baseURL + k}" style="width:100%">
      `)
    );
    imgListComp += `
    <div class="button-area" style="display: flex;justify-content: space-around;width: 100%;margin-top: 20px;">
        <a class="rn-btn" onclick="plusDivs(-1)" href="javascript:void(0);"><span>&#10094;</span></a>
        <a class="rn-btn" onclick="plusDivs(1)" href="javascript:void(0);"><span>&#10095;</span></a>
    </div>
    </div>`;
    imgListHtml.innerHTML = imgListComp;
    plusDivs(1);
    $("#exampleModalCenter").modal("show");
  }
}
//portfolio listing
const portfolio = document.getElementById("portfolio112");
let portfolioComp = "";
projects.map((elem, i) => {
  elem?.list?.map(
    (itm, j) =>
      (portfolioComp += `
<div data-aos="fade-up" data-aos-delay="100" data-aos-once="true" class="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30">
                        <div class="rn-portfolio" data-toggle="modal" onclick="showPortFolioModal(${i},${j})"  >
                            <div class="inner">
                                <div class="thumbnail">
                                    <a href="javascript:void(0);">
                                        <img src=${
                                          baseURL +
                                          (itm?.img
                                            ? itm?.img[0]
                                            : "portfolio-03.jpg")
                                        } alt="Personal Portfolio Images">
                                    </a>
                                </div>
                                <div class="content">
                                    <div class="category-info">
                                        <div class="category-list">
                                            <a href="javascript:void(0);">${
                                              elem?.name
                                            }</a>
                                        </div>
                                    </div>
                                    <h4 class="title"><a href="javascript:void(0);">${
                                      itm?.name
                                    }<i class="feather-arrow-up-right"></i></a></h4>
                                </div>
                            </div>
                        </div>
                    </div>
`)
  );
});
portfolio.innerHTML = portfolioComp;
// <div class="meta">
//     <span><a href="javascript:void(0)"><i class="feather-heart"></i></a>
//         600</span>
// </div>
