// Ano no rodapé
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

/* ===== Portfólio: Lightbox ===== */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const lbClose = document.querySelector('.lightbox__close');

function lbOpen(src){
  lbImg.src = src;
  lb.style.display = 'flex';
  lb.setAttribute('aria-hidden','false');
}
function lbCloseFn(){
  lb.style.display = 'none';
  lb.setAttribute('aria-hidden','true');
  lbImg.removeAttribute('src');
}
document.querySelectorAll('.shot img').forEach(img=>{
  img.addEventListener('click', ()=> lbOpen(img.dataset.full || img.src));
});
lbClose.addEventListener('click', lbCloseFn);
lb.addEventListener('click', (e)=>{ if(e.target===lb){ lbCloseFn(); }});
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){ lbCloseFn(); }});

/* ===== WhatsApp: número fixo do Erick ===== */
const WA_NUMBER = (window.WHATSAPP_NUMBER || "5543988632851").replace(/\D/g,''); // garante só dígitos

function openWhatsAppMessage(text){
  const url = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

/* Botão zap direto */
const zapDireto = document.getElementById('btnZapDireto');
if (zapDireto){
  zapDireto.href = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent("Oi Erick! Quero falar sobre fotos.")}`;
}

/* Form — Plano Personalizado */
const formPlano = document.getElementById('formPlano');
formPlano.addEventListener('submit', (e)=>{
  e.preventDefault();
  const d = new FormData(formPlano);

  const msg =
`Olá, Erick! Montei meu plano personalizado:
• Tipo: ${d.get('tipo')}
• Data: ${d.get('data')}
• Duração: ${d.get('duracao')}
• Mínimo de fotos que espero: ${d.get('minFotos') || 'a combinar'}
• Clipes curtos: ${d.get('clips') || 0}
• Making of compacto: ${d.get('making') ? 'Sim' : 'Não'}
• Álbum 20×20: ${d.get('album') ? 'Sim' : 'Não'}
• Segundo fotógrafo/assistente: ${d.get('assistente') ? 'Sim' : 'Não'}
• Entrega expressa: ${d.get('express') ? 'Sim' : 'Não'}
• Local/Bairro: ${d.get('local') || '—'}
• Km fora de Ibiporã: ${d.get('km') || 0}
• Nome: ${d.get('nome')}
• WhatsApp: ${d.get('zap') || '—'}
• Detalhes: ${d.get('detalhes') || '—'}

Importante: você entrega TODAS as fotos boas tratadas, sem limite. Aguardo o valor.`;

  openWhatsAppMessage(msg);
});
