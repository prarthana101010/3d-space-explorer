const planets = [
  {name:"Earth", type:"HOME WORLD", desc:"Our blue planet", colors:["#0d5c9f","#55ad71"]},
  {name:"Mars", type:"RED PLANET", desc:"The dusty neighbor", colors:["#8c321f","#d47a50"]},
  {name:"Jupiter", type:"GAS GIANT", desc:"The largest planet", colors:["#a87c58","#e2bd91"]},
  {name:"Neptune", type:"ICE GIANT", desc:"Deep blue and distant", colors:["#193baf","#658fff"]},
  {name:"Venus", type:"HOT WORLD", desc:"A cloud-covered world", colors:["#c58d42","#f2d08c"]},
  {name:"Saturn", type:"RINGED GIANT", desc:"Famous for its rings", colors:["#b99058","#e3cf9d"]},
  {name:"Mercury", type:"INNER WORLD", desc:"Closest to the Sun", colors:["#77736c","#b5afa6"]},
  {name:"Uranus", type:"ICE GIANT", desc:"A tilted blue world", colors:["#76cbd0","#c0ffff"]}
];

const grid = document.getElementById("planetGrid");
const planet = document.getElementById("planet");
const nameEl = document.getElementById("planetName");
const typeEl = document.getElementById("planetType");

planets.forEach((p,i)=>{
  const card=document.createElement("article");
  card.className="planet-card"+(i===0?" active":"");
  card.innerHTML=`<div class="mini-planet" style="background:radial-gradient(circle at 30% 28%,#fff3,transparent 12%),radial-gradient(circle at 40% 40%,${p.colors[1]} 0 30%,${p.colors[0]} 70%)"></div><h3>${p.name}</h3><p>${p.desc}</p>`;
  card.onclick=()=>selectPlanet(i);
  grid.appendChild(card);
});

function selectPlanet(i){
  const p=planets[i];
  nameEl.textContent=p.name.toUpperCase();
  typeEl.textContent=p.type;
  planet.style.setProperty("--c1",p.colors[0]);
  planet.style.setProperty("--c2",p.colors[1]);
  document.querySelector(".planet-surface").style.background=`radial-gradient(circle at 38% 38%,#fff5 0 5%,transparent 5.5%),radial-gradient(ellipse at 55% 35%,${p.colors[1]} 0 15%,transparent 16%),radial-gradient(ellipse at 38% 65%,${p.colors[1]} 0 13%,transparent 14%),radial-gradient(circle at 45% 55%,${p.colors[0]} 0 42%,${p.colors[0]} 72%,#020817 100%)`;
  document.querySelectorAll(".planet-card").forEach((c,j)=>c.classList.toggle("active",j===i));
  planet.animate([{transform:"scale(.85) rotateY(-20deg)"},{transform:"scale(1) rotateY(0)"}],{duration:500,easing:"ease-out"});
}

document.getElementById("randomBtn").onclick=()=>selectPlanet(Math.floor(Math.random()*planets.length));
document.getElementById("exploreBtn").onclick=()=>document.getElementById("facts").scrollIntoView({behavior:"smooth"});

let dragging=false,lastX=0,rotation=0;
planet.addEventListener("pointerdown",e=>{dragging=true;lastX=e.clientX;planet.setPointerCapture(e.pointerId)});
planet.addEventListener("pointermove",e=>{if(!dragging)return;rotation+=(e.clientX-lastX)*.55;lastX=e.clientX;planet.style.transform=`rotateY(${rotation}deg)`});
planet.addEventListener("pointerup",()=>dragging=false);
planet.addEventListener("pointercancel",()=>dragging=false);

// Animated star field
const canvas=document.getElementById("space"),ctx=canvas.getContext("2d");
let stars=[];
function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio);stars=Array.from({length:Math.min(260,Math.floor(innerWidth/5))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.3+.15,a:Math.random()*.7+.15,s:Math.random()*.18+.03}))}
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);stars.forEach(s=>{s.y+=s.s;if(s.y>innerHeight)s.y=0;ctx.globalAlpha=s.a;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle="#fff";ctx.fill()});requestAnimationFrame(draw)}
addEventListener("resize",resize);resize();draw();
