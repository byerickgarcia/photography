// JS — Configuração de preços, calculadora e WhatsApp
document.getElementById('year').textContent = new Date().getFullYear();

// Tabelas base (edite aqui)
const BASE = {
  eventos: {
    brilho:   { nome: "Pacote Brilho",   preco: 650 },
    encanto:  { nome: "Pacote Encanto",  preco: 1050 },
    eternidade:{ nome: "Pacote Eternidade", preco: 1450 },
    gala:     { nome: "Pacote Celebração Total", preco: 1950 }
  },
  retratos: {
    essencia: { nome: "Pacote Essência", preco: 350 },
    horizonte:{ nome: "Pacote Horizonte", preco: 550 },
    majestade:{ nome: "Pacote Majestade", preco: 850 }
  },
  extras: {
    fotoExtra: 12,
    km: 1.8,
    album: 250,
    assistenteHora: 200,
    expressPerc: 0.20,
    makingExtra: 180
  }
};

// Atualiza preços visuais dos cards
document.querySelectorAll('.price').forEach(el => {
  const key = el.getAttribute('data-key');
  const groups = [BASE.eventos, BASE.retratos];
  for (const g of groups){
    if (g[key]) { el.querySelector('span').textContent = g[key].preco; break; }
  }
});

// Preenche select de pacotes conforme tipo
const tipoSel = document.getElementById('tipo');
const pacoteSel = document.getElementById('pacote');
function fillPacotes(){
  const tipo = tipoSel.value;
  const group = BASE[tipo];
  pacoteSel.innerHTML = "";
  Object.keys(group).forEach(k => {
    const o = document.createElement('option');
    o.value = k;
    o.textContent = group[k].nome;
    pacoteSel.appendChild(o);
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
  const pacote = data.get('pacote');
  const extrasFoto = Number(data.get('extrasFoto') || 0);
  const km = Number(data.get('km') || 0);
  const album = data.get('album') === 'on';
  const assistente = data.get('assistente') === 'on';
  const express = data.get('express') === 'on';
  const making = data.get('making') === 'on';

  let total = BASE[tipo][pacote].preco;
  total += extrasFoto * BASE.extras.fotoExtra;
  total += km * BASE.extras.km;
  if (album) total += BASE.extras.album;
  if (assistente) total += BASE.extras.assistenteHora; // 1h base
  if (making) total += BASE.extras.makingExtra;
  if (express) total *= (1 + BASE.extras.expressPerc);

  totalEl.textContent = total.toFixed(2).replace('.', ',');
  return total;
}
formCalc.addEventListener('input', calcTotal);
formCalc.addEventListener('change', calcTotal);
calcTotal();

// Envio da simulação por WhatsApp
const WHATSAPP_NUMBER = "5543988632851";
formCalc.addEventListener('submit', (e) => {
  e.preventDefault();
  const total = calcTotal();
  const d = new FormData(formCalc);
  const tipo = d.get('tipo');
  const pacote = d.get('pacote');
  const nomePacote = BASE[tipo][pacote].nome;
  const msg = `Olá, Erick! Quero uma simulação: ${nomePacote}. Total estimado: R$ ${total.toFixed(2).replace('.', ',')}. Pagamento: 50% na reserva (contrato) + 50% na entrega das fotos.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
});

// Form de contato -> WhatsApp
const form = document.getElementById('formOrcamento');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const nome = data.get('nome');
  const tipoEvento = data.get('tipoEvento');
  const local = data.get('local') || '';
  const dataDesejada = data.get('data') || '';
  const detalhes = data.get('detalhes') || '';

  const msg = `Olá, Erick! Sou ${nome}. Tipo: ${tipoEvento}. Local: ${local}. Data: ${dataDesejada}. Detalhes: ${detalhes}. Pagamento: 50% na reserva (contrato) + 50% na entrega das fotos.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
});
