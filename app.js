const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const saveButton = document.getElementById('save-button');
const cardHeight = document.getElementById('card-height');
const cardWidth = document.getElementById('card-width');
const cardName = document.getElementById('card-name');
const cardDescription = document.getElementById('card-description');

ctx.fillStyle = 'lightblue';
ctx.fillRect(0, canvas.height / 4 - 30, canvas.width, 40);
ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 40);
ctx.fillStyle = 'black';
ctx.font = '20px Arial';

let cardNameText = ctx.fillText(
  'Nom',
  canvas.width / 2 - 30,
  canvas.height / 4
);

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

// Modifications de la taille du canvas
cardHeight.addEventListener('input', () => {
  canvas.height = cardHeight.value;
});

cardWidth.addEventListener('input', () => {
  canvas.width = cardWidth.value;
});

// Mise à jour du nom sur le canvas
cardName.addEventListener('input', () => {
  ctx.clearRect(0, canvas.height / 4 - 20, canvas.width, 40);
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0, canvas.height / 4 - 30, canvas.width, 40);
  ctx.fillStyle = 'black';
  cardNameText = ctx.fillText(
    cardName.value,
    canvas.width / 2 - cardName.value.length * 5,
    canvas.height / 4
  );
});

cardDescription.addEventListener('input', () => {
  const lines = addBr(cardDescription.value, 30);
  ctx.clearRect(0, canvas.height / 2 - 20, canvas.width, 150);
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 150);
  ctx.fillStyle = 'black';
  lines.split('\n').forEach((line, index) => {
    ctx.fillText(
      line,
      canvas.width / 2 - line.length * 5,
      canvas.height / 2 + index * 30
    );
  });
});

function addBr(string, interval) {
  return string.match(new RegExp(`.{1,${interval}}`, 'g')).join('\n');
}
