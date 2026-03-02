const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let rockets = [];
let stars = [];

for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    alpha: Math.random()
  });
}

function drawStars() {
  stars.forEach(s => {
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

function launchRocket() {
  rockets.push({
    x: Math.random() * canvas.width,
    y: canvas.height,
    speed: 6,
    exploded: false
  });
}

function explode(x, y, heart=false) {
  if (heart) {
    for (let t = 0; t < Math.PI * 2; t += 0.05) {
      let hx = 16 * Math.pow(Math.sin(t), 3);
      let hy = 13 * Math.cos(t) - 5 * Math.cos(2*t)
        - 2 * Math.cos(3*t) - Math.cos(4*t);
      particles.push({
        x: canvas.width/2 + hx * 15,
        y: canvas.height/3 - hy * 15,
        alpha: 1,
        size: 3,
        color: "255,105,180"
      });
    }
  } else {
    for (let i = 0; i < 80; i++) {
      particles.push({
        x,
        y,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 4,
        alpha: 1,
        size: 2,
        color: `${Math.random()*255},${Math.random()*255},255`
      });
    }
  }
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawStars();

  rockets.forEach((r,i)=>{
    r.y -= r.speed;
    ctx.fillStyle="white";
    ctx.fillRect(r.x,r.y,2,10);
    if(r.y<canvas.height/3 && !r.exploded){
      explode(r.x,r.y);
      r.exploded=true;
      rockets.splice(i,1);
    }
  });

  particles.forEach((p,i)=>{
    if(p.angle){
      p.x+=Math.cos(p.angle)*p.speed;
      p.y+=Math.sin(p.angle)*p.speed;
    }
    p.alpha-=0.01;
    ctx.fillStyle=`rgba(${p.color},${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();
    if(p.alpha<=0) particles.splice(i,1);
  });

  requestAnimationFrame(animate);
}

animate();

/* TYPEWRITER GREETINGS */
const greetings=[
"Happy Birthday",
"Feliz Cumpleaños",
"Joyeux Anniversaire",
"Alles Gute zum Geburtstag",
"お誕生日おめでとう",
"생일 축하합니다",
"生日快乐",
"عيد ميلاد سعيد",
"Buon Compleanno",
"Selamat Ulang Tahun"
];

const text=document.getElementById("text");
const startBtn=document.getElementById("startBtn");
const openCardBtn=document.getElementById("openCardBtn");
const card=document.getElementById("card");
const bgm=document.getElementById("bgm");
const bgm2=document.getElementById("bgm2")

let idx=0;

function typeText(str,callback){
  text.innerHTML="";
  text.style.opacity=1;
  let i=0;
  let typing=setInterval(()=>{
    text.innerHTML+=str[i];
    i++;
    if(i>=str.length){
      clearInterval(typing);
      setTimeout(()=>{
        text.style.opacity=0;
        callback();
      },600);
    }
  },40);
}

function nextGreeting(){
  if(idx<greetings.length){
    launchRocket();
    if(idx===greetings.length-1){
      text.classList.add("big");
    }
    typeText(greetings[idx],()=>{
      idx++;
      setTimeout(nextGreeting,300);
    });
  }else{
    setTimeout(()=>{
      explode(0,0,true);
      setTimeout(()=>openCardBtn.classList.add("show"),1200);
    },500);
  }
}

startBtn.classList.add("show");

startBtn.addEventListener("click", () => {
  console.log("Tombol diklik");
  startBtn.style.display = "none";
  bgm.play().then(() => {
    console.log("Audio berhasil diputar");
  }).catch(err => {
    console.log("Audio error:", err);
  });
  nextGreeting();
});

openCardBtn.addEventListener("click",()=>{
  card.style.transform="scale(1)";
  console.log("Tombol diklik");
  openCardBtn.style.display = "none";
  bgm2.play().then(() => {
    console.log("Audio berhasil diputar");
  }).catch(err => {
    console.log("Audio error:", err);
  });
  nextGreeting();
});