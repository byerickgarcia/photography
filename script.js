// Ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// MENU MOBILE
const hamb = document.getElementById('hamb');
const menu = document.getElementById('menu');
if (hamb && menu){
  hamb.addEventListener('click', ()=>{
    const open = menu.classList.toggle('open');
    hamb.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// TABELA DE PREÇOS
const BASE = {
  eventos: {
    brilho:    { nome: "Pacote Brilho",           preco: 990 },
    encanto:   { nome: "Pacote Encanto",          preco: 1690 },
    eternidade:{ nome: "Pacote Eternidade",       preco: 2290 },
    gala:      { nome: "Pacote Celebração Total", preco: 3290 }
  },
  retratos: {
    essencia:  { nome: "Pacote Essência",  preco: 390 },
    horizonte: { nome: "Pacote Horizonte", preco: 690 },
    majestade: { nome: "Pacote Majestade", preco: 1190 }
  },
  extras: {
    fotoExtra: 15,    // R$ por foto adicional tratada
    km: 2.60,         // R$ por km
    album: 520,       // álbum 20×20 (20 páginas)
    assistenteHora: 220,
    expressPerc: 0.30, // +30%
    makingExtra: 240
  }
};

// Atualiza valores visuais
document.querySelectorAll('[data-key]').forEach(el=>{
  const key = el.getAttribute('data-key');
  const maps = { brilho:BASE.eventos.brilho, encanto:BASE.eventos.encanto, eternidade:BASE.eventos.eternidade, gala:BASE.eventos.gala,
                 essencia:BASE.retratos.essencia, horizonte:BASE.retratos.horizonte, majestade:BASE.retratos.majestade };
  if (maps[key]) el.textContent = maps[key].preco;
});

// Preenche select de pacotes
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
  const km = Number(data.get('km')||0);
  const album = data.get('album')==='on';
  const assistente = data.get('assistente')==='on';
  const express = data.get('express')==='on';
  const making = data.get('making')==='on';

  let total = BASE[tipo][pac].preco;
  total += extrasFoto * BASE.extras.fotoExtra;
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
  const msg = `Olá, Erick! Quero uma simulação: ${nomePacote}. Total estimado: R$ ${total.toFixed(2).replace('.', ',')}. Pagamento: 50% no contrato + 50% na entrega das fotos.`;
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
  const msg = `Olá, Erick! Sou ${nome}. Tipo: ${tipoEvento}. Local: ${local}. Data: ${dataDesejada}. Detalhes: ${detalhes}. Pagamento: 50% no contrato + 50% na entrega das fotos.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank');
});
