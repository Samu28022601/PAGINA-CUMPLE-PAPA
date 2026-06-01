// ── Fondo animado con puntos flotantes ──
const confettiContainer = document.getElementById('confetti');
const colores = ['#f5c842', '#f76c8a', '#c9a7eb', '#a8e6cf', '#ffffff'];
const tamaños = [6, 10, 14, 18, 24];

for (let i = 0; i < 40; i++) {
  const dot = document.createElement('div');
  dot.className = 'dot';
  const size = tamaños[Math.floor(Math.random() * tamaños.length)];
  dot.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    background: ${colores[Math.floor(Math.random() * colores.length)]};
    animation-duration: ${8 + Math.random() * 14}s;
    animation-delay: ${Math.random() * -20}s;
  `;
  confettiContainer.appendChild(dot);
}

// ── Edición de nombre ──
function editarNombre() {
  const display = document.getElementById('nombre-display');
  const input = document.getElementById('nombre-input');
  const valorActual = display.textContent.replace(/✨\s?/g, '').trim();
  input.value = valorActual === 'Tu nombre' ? '' : valorActual;
  display.style.display = 'none';
  input.style.display = 'inline-block';
  input.focus();
}

function guardarNombre() {
  const display = document.getElementById('nombre-display');
  const input = document.getElementById('nombre-input');
  const nombre = input.value.trim();
  display.textContent = nombre ? `✨ ${nombre} ✨` : '✨ Tu nombre ✨';
  input.style.display = 'none';
  display.style.display = 'inline-block';
}

// ── Drag & Drop ──
function onDragOver(e) {
  e.preventDefault();
  document.getElementById('drop-zone').classList.add('drag-over');
}

function onDragLeave() {
  document.getElementById('drop-zone').classList.remove('drag-over');
}

function onDrop(e) {
  e.preventDefault();
  document.getElementById('drop-zone').classList.remove('drag-over');
  const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
  agregarFotos(files);
}

function onFileSelect(e) {
  const files = Array.from(e.target.files);
  agregarFotos(files);
  e.target.value = '';
}

// ── Galería de fotos ──
function agregarFotos(files) {
  if (!files.length) return;
  const gallery = document.getElementById('gallery');
  const title = document.getElementById('gallery-title');
  title.style.display = 'block';

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target.result;
      const card = document.createElement('div');
      card.className = 'photo-card';

      const img = document.createElement('img');
      img.src = src;
      img.alt = file.name;
      img.onclick = () => abrirLightbox(src);

      const del = document.createElement('button');
      del.className = 'delete-btn';
      del.textContent = '✕';
      del.title = 'Eliminar foto';
      del.onclick = (ev) => { ev.stopPropagation(); card.remove(); checkGallery(); };

      card.appendChild(img);
      card.appendChild(del);
      gallery.appendChild(card);
    };
    reader.readAsDataURL(file);
  });
}

function checkGallery() {
  const gallery = document.getElementById('gallery');
  const title = document.getElementById('gallery-title');
  if (gallery.children.length === 0) title.style.display = 'none';
}

// ── Lightbox ──
function abrirLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('active');
}

function cerrarLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarLightbox();
});
