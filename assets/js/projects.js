const projects = [
  {
    id: "v-pills-mob-apps",
    name: "Mob Apps",
    list: [
      "Learn piano",
      "Learn craft",
      "Learn mindfulness",
      "Learn meditation",
      "Learn drawing",
      "Fasting Riafy",
      "Fasting Rstream",
      "Quit smoking",
      "Nursery rhymes",
      "Wellness coach",
      "30 Day fitness workout iOS",
      "Workout for weight-loss ",
      "Pick and pack app",
      "Butcher app",
      "VCare app car wash",
      "AR indoor navigation",
      "Bio Link app",
    ],
  },
  {
    id: "v-pills-web-apps",
    name: "Web apps",
    list: [
      "Unique auto corp landing page and console",
      "App listing console",
      "Pharma app",
      "Link tree like web app",
      "Indoor map dashboard",
      "Restaurant table booking app",
      "Student management system",
    ],
  },
  {
    id: "v-pills-backend",
    name: "Backend",
    list: ["Web scrapping with node Js and python", "Translator nodeJs"],
  },
  {
    id: "v-pills-tv-apps",
    name: "Tv apps",
    list: [
      "Learn piano",
      "Learn craft",
      "Learn nursery rhymes",
      "Learn mindfulness",
      "Craft",
      "Piano",
      "Yoga",
      "Kids craft",
      "Paper craft",
      "Health recipes",
      "Drawing",
      "Keto",
    ],
  },
  {
    id: "v-pills-desktop-apps",
    name: "Desktop apps",
    list: [
      "Invoice app using electronJs",
      "Trading app like forex basic desktop app",
    ],
  },
  {
    id: "v-pills-games",
    name: "Games",
    list: ["Laser defender", "3D runner game", "Basic tutorial apps in unity"],
  },
  {
    id: "v-pills-hosting",
    name: "Hosting",
    list: [
      "AWS - s3, ec2, amplify",
      "Firebase",
      "Heroku",
      "Github",
      "Netifly",
      "Tried free hosting sites",
      "Wordpress",
      "AppCenter by Microsoft ",
      "Godaddy - Domain purchases and redirecting",
    ],
  },
  {
    id: "v-pills-more",
    name: "Miscellaneous",
    list: [
      "Scripts - automation for phone connecting to react native",
      "Script - automation for build apps from moulds",
      "Streamy app - watch party",
      "Food delivery app",
      "Traveling app",
      "Random reels like app content from YouTube",
      "Iframe custom player",
      "React native ftp connection library ",
      "React native media list for gallery fetching from devices",
      "React net connectivity app",
      "React native vlc player modified",
    ],
  },
];

for (let elem of projects) {
  const apps = document.getElementById(elem?.id);
  let htmlComp = '<div class="client-card">';
  elem?.list?.map(
    (appName) =>
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
          <a href="#">${appName}</a>
        </span>
      </div>
    </div>
  </div>`)
  );
  htmlComp += "</div>";
  apps.innerHTML = htmlComp;
}
