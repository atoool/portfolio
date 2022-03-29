const baseURL = "./assets/images/portfolio/";
const projects = [
  {
    id: "v-pills-mob-apps",
    name: "Mobile App",
    list: [
      {
        name: "Intermittent Fasting App",
        img: [
          "fasting-rstream1.webp",
          "fasting-rstream2.webp",
          "fasting-rstream3.webp",
          "fasting-rstream4.webp",
          "fasting-rstream5.webp",
          "fasting-rstream6.webp",
        ],
      },
      {
        name: "Learn Piano: Beginner Tutorial",
        img: [
          "piano1.webp",
          "piano2.webp",
          "piano3.webp",
          "piano4.webp",
          "piano5.webp",
        ],
      },
      {
        name: "Relax Meditation: Sleep Coach",
        img: [
          "med1.webp",
          "med2.webp",
          "med3.webp",
          "med4.webp",
          "med5.webp",
          "med6.webp",
          "med7.webp",
          "med8.webp",
          "med9.webp",
        ],
      },
      {
        name: "Fasting Tracker",
        img: [
          "fasting-riafy1.webp",
          "fasting-riafy2.webp",
          "fasting-riafy3.webp",
          "fasting-riafy4.webp",
          "fasting-riafy5.webp",
          "fasting-riafy6.webp",
        ],
      },
      {
        name: "30 Day fitness workout iOS",
        img: [
          "30day1.webp",
          "30day2.webp",
          "30day3.webp",
          "30day4.webp",
          "30day5.webp",
          "30day6.webp",
        ],
      },
      {
        name: "Mindfulness Coach: Relax, Calm",
        img: [
          "Mindful1.webp",
          "Mindful2.webp",
          "Mindful3.webp",
          "Mindful4.webp",
          "Mindful5.webp",
        ],
      },
      {
        name: "Quit smoking",
        img: [
          "smoking1.webp",
          "smoking2.webp",
          "smoking3.webp",
          "smoking4.webp",
        ],
      },
      {
        name: "DIY Art and Craft Course",
        img: ["craft1.webp", "craft2.webp", "craft3.webp", "craft4.webp"],
      },
      {
        name: "Nursery rhymes",
        img: [
          "nursery1.webp",
          "nursery2.webp",
          "nursery3.webp",
          "nursery4.webp",
        ],
      },
      {
        name: "Workout for weight-loss ",
        img: [
          "workout1.webp",
          "workout2.webp",
          "workout3.webp",
          "workout4.webp",
          "workout5.webp",
          "workout6.webp",
        ],
      },
      {
        name: "Meditation for Sleep",
        img: [
          "meditate1.webp",
          "meditate2.webp",
          "meditate3.webp",
          "meditate4.webp",
        ],
      },
      { name: "Pick and pack app", img: "" },
      { name: "Butcher app", img: "" },
      { name: "VCare app car wash", img: "" },
      { name: "AR indoor navigation", img: "" },
      {
        name: "Bio Link app",
        img: [
          "biolink1.webp",
          "biolink2.webp",
          "biolink3.webp",
          "biolink4.jpg",
        ],
      },
    ],
  },
  {
    id: "v-pills-web-apps",
    name: "Web App",
    list: [
      {
        name: "UniqueAutoCorp: User web app",
        img: [
          "uniqueuser1.png",
          "uniqueuser2.png",
          "uniqueuser3.png",
          "uniqueuser4.png",
          "uniqueuser5.png",
        ],
      },
      {
        name: "UniqueAutoCorp: admin console",
        img: [
          "uniqueadmin1.png",
          "uniqueadmin2.png",
          "uniqueadmin3.png",
          "uniqueadmin4.png",
          "uniqueadmin5.png",
        ],
      },
      { name: "App listing console", img: ["store1.png", "store2.png"] },
      {
        name: "Pharma app",
        img: ["pharma1.png", "pharma2.png", "pharma3.png", "pharma4.png"],
      },
      {
        name: "Link tree like web app",
        img: [
          "linktr1.jpeg",
          "linktr2.jpeg",
          "linktr3.jpeg",
          "linktr4.jpeg",
          "linktr5.jpeg",
        ],
      },
      { name: "Indoor map dashboard", img: null },
      { name: "Restaurant table booking app", img: null },
      { name: "Student management system", img: null },
    ],
  },
  {
    id: "v-pills-backend",
    name: "Backend",
    list: [
      {
        name: "Web scrapping with node Js/python",
        img: ["store1.png", "store2.png"],
      },
      { name: "Translator nodeJs", img: "" },
    ],
  },
  {
    id: "v-pills-tv-apps",
    name: "Tv App",
    list: [
      { name: "Learn piano", img: "" },
      { name: "Learn craft", img: "" },
      { name: "Learn nursery rhymes", img: "" },
      { name: "Learn mindfulness", img: "" },
      { name: "Craft", img: "" },
      { name: "Piano", img: "" },
      { name: "Yoga", img: "" },
      { name: "Kids craft", img: "" },
      { name: "Paper craft", img: "" },
      { name: "Health recipes", img: "" },
      { name: "Drawing", img: "" },
      { name: "Keto", img: "" },
    ],
  },
  {
    id: "v-pills-desktop-apps",
    name: "Desktop App",
    list: [
      { name: "Invoice app using electronJs", img: "" },
      { name: "Trading app like forex basic desktop app", img: "" },
    ],
  },
  {
    id: "v-pills-games",
    name: "Game",
    list: [
      { name: "Laser defender", img: "" },
      { name: "3D runner game", img: "" },
      { name: "Basic tutorial apps in unity", img: "" },
    ],
  },
  {
    id: "v-pills-hosting",
    name: "Hosting",
    list: [
      { name: "AWS - s3, ec2, amplify", img: "" },
      { name: "Firebase", img: "" },
      { name: "Heroku", img: "" },
      { name: "Github", img: "" },
      { name: "Netifly", img: "" },
      { name: "Tried free hosting sites", img: "" },
      { name: "Wordpress", img: "" },
      { name: "AppCenter by Microsoft ", img: "" },
      { name: "Godaddy - Domain purchases and redirecting", img: "" },
    ],
  },
  {
    id: "v-pills-more",
    name: "Miscellaneous",
    list: [
      {
        name: "Scripts - automation for phone connecting to react native",
        img: null,
      },
      { name: "Script - automation for build apps from moulds", img: null },
      { name: "Streamy app - watch party", img: null },
      { name: "Food delivery app", img: null },
      { name: "Traveling app", img: null },
      { name: "Random reels like app content from YouTube", img: null },
      { name: "Iframe custom player", img: null },
      { name: "React native ftp connection library ", img: null },
      {
        name: "React native media list for gallery fetching from devices",
        img: null,
      },
      { name: "React native net connectivity plugin", img: null },
      { name: "React native vlc player modified plugin", img: null },
      { name: "WebRTC integrations", img: null },
      { name: "Socket.IO integrations", img: null },
    ],
  },
];

for (let elem of projects) {
  const apps = document.getElementById(elem?.id);
  let htmlComp = '<div class="client-card">';
  elem?.list?.map(
    (app) =>
      (htmlComp += `<div class="main-content">
    <div class="inner text-center">
      <div class="thumbnail">
        <a href="#">
          <img src="assets/images/client/png/brand-01.png" alt="Client-image" />
        </a>
      </div>
      <div class="seperator"></div>
      <div class="client-name">
        <span>
          <a href="#">${app?.name}</a>
        </span>
      </div>
    </div>
  </div>`)
  );
  htmlComp += "</div>";
  apps.innerHTML = htmlComp;
}
