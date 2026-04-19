const CODIGO = "NEXUS2026";
const ADM_USER = "subgui";
const ADM_PASS = "nexus123";

let membros = JSON.parse(localStorage.getItem('membros')) || [];
let recrutamentos = JSON.parse(localStorage.getItem('recrutamentos')) || [];

/* TROCAR ABA */
function show(id){
document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
document.getElementById(id).classList.add('active');
}

/* REGISTRAR */
function registrar(e){
e.preventDefault();

if(membros.some(m => m.nick.toLowerCase() === nick.value.toLowerCase())){
alert("Nick já existe");
return;
}

if(codigo.value !== CODIGO){
alert("Código inválido");
return;
}

membros.push({
nick:nick.value,
aniversario:"--",
disponivel:"Sempre",
pvp:true,
builder:true,
farm:true
});

localStorage.setItem('membros', JSON.stringify(membros));
render();
alert("Conta criada!");
}

/* RECRUTAMENTO */
function enviarRecruit(e){
e.preventDefault();

recrutamentos.push({
nick:rNick.value,
motivo:rMotivo.value,
habilidade:rHabilidade.value,
tempo:rTempo.value
});

localStorage.setItem('recrutamentos', JSON.stringify(recrutamentos));
alert("Enviado!");
}

/* RENDER */
function render(){
let lista = document.getElementById('lista');
lista.innerHTML='';

membros.forEach(m=>{
lista.innerHTML += `
<div class="member-card">
<div class="member-header">
<div class="member-name">${m.nick}</div>
<img class="member-img" src="https://mc-heads.net/avatar/${m.nick}">
</div>

<div class="member-info">
<div><b>Disponível:</b> ${m.disponivel}</div>
</div>

<div class="member-tags">
${m.pvp?'<div class="tag pvp">PVP</div>':''}
${m.builder?'<div class="tag builder">BUILDER</div>':''}
${m.farm?'<div class="tag farm">FARM</div>':''}
</div>
</div>
`;
});
}

/* ADM */
function loginADM(){
let u = prompt("User:");
let p = prompt("Senha:");

if(u===ADM_USER && p===ADM_PASS){
show('adm');
renderADM();
}else alert("Negado");
}

function renderADM(){
let div = document.getElementById('listaADM');
div.innerHTML='<h2>Recrutamentos</h2>';

recrutamentos.forEach((r,i)=>{
div.innerHTML+=`
<div class="admin-item">
<b>${r.nick}</b><br>
${r.motivo}<br>
${r.habilidade}<br>

<button onclick="aceitar(${i})">Aceitar</button>
<button onclick="recusar(${i})">Recusar</button>
</div>`;
});
}

function aceitar(i){
let r = recrutamentos[i];

membros.push({
nick:r.nick,
disponivel:r.tempo,
pvp:true,
builder:true,
farm:true
});

recrutamentos.splice(i,1);

localStorage.setItem('membros', JSON.stringify(membros));
localStorage.setItem('recrutamentos', JSON.stringify(recrutamentos));

render();
renderADM();
}

function recusar(i){
recrutamentos.splice(i,1);
localStorage.setItem('recrutamentos', JSON.stringify(recrutamentos));
renderADM();
}

render();
