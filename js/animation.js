
function random(min, max) {
  return Math.random() * (max - min) + min;
}

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.style.animationDelay = `${random(0, 10) / 10}s`;
});