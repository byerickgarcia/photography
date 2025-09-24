// Rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile
const hamb = document.getElementById('hamb');
const menu = document.getElementById('menu');
if (hamb && menu){
  hamb.addEventListener('click', ()=>{
    const open = menu.classList.toggle('open');
    hamb.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Preços e extras
const BASE = {
  eventos: {
    brilho:    { nome: "Brilho",           preco: 990 },
    encanto:   { nome: "Encanto",          preco: 1690 },
    eternidade:{ nome: "Eternidade",       preco: 2290 },
    gala:      { nome: "Celebração Total", preco: 3290 }
  },
  retratos: {
    essencia:  { nome: "Essência",  preco: 390 },
    horizonte: { nome: "Horizonte", preco: 690 },
    majestade: { nome: "Majestade", preco: 1190 }
  },
  extras: {
    fotoExtra: 15,
    clipUnit: 150,      // clipe 15–30s
    makingExtra: 300,   // making of 1–2 min
    km: 2.60,
    album: 520,
    assistenteHora: 220,
    expressPerc: 0.30
  }
};

// Atualiza <span data-key>
document.querySelectorAll('[data-key]').forEach(el=>{
  const key = el.getAttribute('data-key');
  const map = { ...BASE.eventos, ...BASE.retratos };
  if (map[key]) el.textContent = map[key].preco;
});

// Popula pacotes da calculadora
const tipoSel = document.getElementById('tipo');
const pacoteSel = document.getElementById('pacote');
function fillPacotes(){
  const group = BASE[tipoSel.value];
  pacoteSel.innerHTML = "";
  Object.entries(group).forEach(([k,v])=>{
    const o = document.createElement('option');
    o.value = k; o.textContent = v.nome; pacoteSel.appendChild(o);
  });
}
tipoSel.addEventListener('change', fillPacotes);
fillPacotes();

// Calculadora
const formCalc = document.getElementById('calcForm');
const totalEl = document.getElementById('total');

function calcTotal(){
  const data = new FormData(formCalc);
  const tipo = data.get('tipo');
  const pac = data.get('pacote');
  const extrasFoto = Number(data.get('extrasFoto')||0);
  const clips = Number(data.get('clips')||0);
  const km = Number(data.get('km')||0);
  const album = data.get('album')==='on';
  const assistente = data.get('assistente')==='on';
  const express = data.get('express')==='on';
  const making = data.get('making')==='on';

  let total = BASE[tipo][pac].preco;
  total += extrasFoto * BASE.extras.fotoExtra;
  total += clips * BASE.extras.clipUnit;
  total += km * BASE.extras.km;
  if (album) total += BASE.extras.album;
  if (assistente) total += BASE.extras.assistenteHora;
  if (making) total += BASE.extras.makingExtra;
  if (express) total *= (1 + BASE.extras.expressPerc);

  totalEl.textContent = total.toFixed(2).replace('.', ',');
  return total;
}
formCalc.addEventListener('input', calcTotal);
formCalc.addEventListener('change', calcTotal);
calcTotal();

// WhatsApp
const WHATSAPP_NUMBER = (typeof WHATSAPP_NUMBER!=="undefined") ? WHATSAPP_NUMBER : "5543988632851";

formCalc.addEventListener('submit', (e)=>{
  e.preventDefault();
  const total = calcTotal();
  const d = new FormData(formCalc);
  const tipo = d.get('tipo');
  const pac = d.get('pacote');
  const nomePacote = BASE[tipo][pac].nome;
  const extrasFoto = d.get('extrasFoto');
  const clips = d.get('clips');
  const km = d.get('km');
  const express = d.get('express')==='on' ? 'Sim' : 'Não';
  const album = d.get('album')==='on' ? 'Sim' : 'Não';
  const assist = d.get('assistente')==='on' ? 'Sim' : 'Não';
  const making = d.get('making')==='on' ? 'Sim' : 'Não';

  const msg = `Olá, Erick! Simulação: ${nomePacote}.
Todas as fotos boas tratadas — sem limite.
Fotos extras: ${extrasFoto}; Clipes: ${clips}; Km: ${km};
Álbum: ${album}; Assistente: ${assist}; Making of: ${making}; Entrega expressa: ${express}.
Total estimado: R$ ${total.toFixed(2).replace('.', ',')}.
Pagamento: 50% no contrato + 50% na entrega das fotos.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank');
});

const form = document.getElementById('formOrcamento');
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const d = new FormData(form);
  const nome = d.get('nome');
  const tipoEvento = d.get('tipoEvento');
  const local = d.get('local')||'';
  const dataDesejada = d.get('data')||'';
  const detalhes = d.get('detalhes')||'';
  const msg = `Olá, Erick! Sou ${nome}. Tipo: ${tipoEvento}. Local: ${local}. Data: ${dataDesejada}. Detalhes: ${detalhes}.
Todas as fotos boas tratadas — sem limite. Pagamento: 50% no contrato + 50% na entrega das fotos.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank');
});
