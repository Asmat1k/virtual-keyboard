function findCaps() {
  const buttons = document.querySelectorAll('.keyboard__button');
  let i = 0;
  let capsButton;
  while (buttons[i].textContent.toLowerCase() !== 'caps') {
    i += 1;
    capsButton = buttons[i];
  }
  return capsButton;
}

export default function changeCase(buttons, caps) {
  const letters = buttons;
  const { length } = letters;
  const capsButton = findCaps();
  if (caps) {
    capsButton.classList.add('keyboard-button_on');
    for (let i = 0; i < length; i += 1) {
      letters[i].textContent = letters[i].textContent.toUpperCase();
    }
  } else {
    capsButton.classList.remove('keyboard-button_on');
    for (let i = 0; i < length; i += 1) {
      letters[i].textContent = letters[i].textContent.toLowerCase();
    }
  }
}
