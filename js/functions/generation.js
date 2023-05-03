export default function createKeyboard() {
  const ROWS = 5;
  const BUTTONS = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Back'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
    ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift'],
    ['Ctrl', 'Win', 'Alt', '__', 'Alt', 'Ctrl', '←', '↓', '→', 'eng'],
  ];
  const BUTTONS_CODE = [
    ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
    ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
    ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Change'],
  ];
  const main = document.createElement('main');
  main.classList.add('main__wrapper');
  const inputZone = document.createElement('textarea');
  inputZone.classList.add('input-block');
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  main.appendChild(inputZone);
  main.appendChild(keyboard);
  const warning = document.createElement('div');
  warning.classList.add('warning');
  warning.innerHTML = 'Клавиатура создана на системе Windows <br> Для переключения используйте Shift+Alt';
  main.appendChild(warning);
  for (let i = 0; i < ROWS; i += 1) {
    const { length } = BUTTONS[i];
    const row = document.createElement('div');
    row.classList.add('keyboard__row');
    keyboard.appendChild(row);
    for (let j = 0; j < length; j += 1) {
      const button = document.createElement('button');
      button.classList.add('keyboard__button');

      if (BUTTONS[i][j] === 'Caps' || BUTTONS[i][j] === 'Enter' || BUTTONS[i][j] === 'Shift') {
        button.classList.add('keyboard__big-button');
      }
      if (BUTTONS[i][j] === 'Shift') {
        button.classList.add('keyboard__shift');
      }
      if (BUTTONS[i][j] === 'Ctrl' || BUTTONS[i][j] === 'eng' || BUTTONS[i][j] === 'rus') {
        button.classList.add('keyboard__medium-button');
      }
      if (BUTTONS[i][j] === 'Back') {
        button.classList.add('keyboard__backspace');
      }
      if (BUTTONS[i][j] === 'Del') {
        button.classList.add('keyboard__delete');
      }
      if (BUTTONS[i][j] === '__') {
        button.classList.add('keyboard__space');
      }
      if (BUTTONS[i][j] === 'eng' || BUTTONS[i][j] === 'rus') {
        button.classList.add('keyboard__change');
      }
      if (j === 0 || j === length - 1) {
        button.classList.add('keyboard__button_colored');
      }
      if (i === 4 && BUTTONS[i][j] !== '_') {
        button.classList.add('keyboard__button_colored');
      }
      button.dataset.code = BUTTONS_CODE[i][j];
      button.textContent = BUTTONS[i][j];
      row.append(button);
    }
  }
  document.body.appendChild(main);
}
