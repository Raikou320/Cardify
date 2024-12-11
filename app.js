const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const saveButton = document.getElementById('save-button');
const cardHeight = document.getElementById('card-height');
const cardWidth = document.getElementById('card-width');
const cardName = document.getElementById('card-name');
const cardNameColor = document.getElementById('name-color');
const cardNameFont = document.getElementById('name-font');
const cardDescription = document.getElementById('card-description');
const cardDescriptionColor = document.getElementById('description-color');
const cardDescriptionFont = document.getElementById('description-font');
const params = document.getElementById('params');
const optionsButton = document.getElementById('options-button');
const printCard = sdocument.getElementById('print-card');

printCard.addEventListener('click', () => canvas.print())

ctx.fillStyle = 'lightblue';
ctx.fillRect(0, canvas.height / 4 - 30, canvas.width, 40);
ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 40);
ctx.fillStyle = 'black';
ctx.font = '25px Arial';

let cardNameText = ctx.fillText(
  'Nom',
  canvas.width / 2 - 30,
  canvas.height / 4
);

ctx.font = '20px sans-serif';

let cardDescriptionText = ctx.fillText(
  'Description',
  canvas.width / 2 - 55,
  canvas.height / 2
);

saveButton.addEventListener('click', () => {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'card.png';
  link.click();
});

function redrawCanvas() {
  canvas.width = cardWidth.value;
  canvas.height = cardHeight.value;

  // Crée les lignes pour le texte de description
  const lines = addBr(
    cardDescription.value ? cardDescription.value : '',
    canvas.width / 10
  ).split('\n');

  // Efface le canvas avant de redessiner
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dessine le rectangle du haut (fixe)
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(
    0, 
    canvas.height / 8, 
    canvas.width, 
    40
  );

  // Dessine le texte du nom dans le rectangle du haut
  ctx.fillStyle = cardNameColor.value;
  ctx.font = cardNameFont.value;
  ctx.fillText(
    cardName.value,
    canvas.width / 2 - cardName.value.length * 5,
    canvas.height / 8 + 25
  );

  // Calcule la hauteur dynamique du rectangle du bas
  const rectangleHeight = 40 + lines.length * 15; // Hauteur de base + augmentation par ligne

  // Dessine le rectangle du bas
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(
    0,
    canvas.height / 2,
    canvas.width,
    rectangleHeight
  );

  // Dessine chaque ligne de la description dans le rectangle du bas
  ctx.fillStyle = cardDescriptionColor.value;
  ctx.font = cardDescriptionFont.value;
  lines.forEach((line, index) => {
    ctx.fillText(
      line,
      canvas.width / 2 - line.length * 5,
      canvas.height / 2 + 25 + index * 20 // Ajuste la position verticale pour chaque ligne
    );
  });

  requestAnimationFrame(redrawCanvas);
}

const inputListener = document.addEventListener('input', () => {
  redrawCanvas();
});

document.removeEventListener('input', inputListener);

optionsButton.addEventListener('click', () => {
  params.classList.toggle('hidden');
  canvas.classList.toggle('hidden');
  params.classList.contains('hidden')
    ? (optionsButton.innerHTML = 'Options')
    : (optionsButton.innerHTML = 'Carte');
});

function addBr(string, interval) {
  return (
    string.match(new RegExp(`.{1,${interval}}`, 'g'))?.join('\n') || string
  );
}
