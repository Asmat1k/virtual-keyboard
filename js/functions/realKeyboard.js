/* eslint-disable no-multi-assign */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
import changeButtons from './changeButtons.js';
import getLetters from './getLetters.js';
import changeCase from './changeCase.js';
import changeLang from './changeLang.js';

let caps = false;
let shiftStatus = false;
let lang;

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    if (localStorage.getItem('lang') === 'eng') {
      lang = 'eng';
    } else {
      lang = 'rus';
    }
  }
}
window.addEventListener('load', getLocalStorage);

// в лока сторэдж
function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
window.addEventListener('beforeunload', setLocalStorage);

export default function realPush() {
  const buttons = document.querySelectorAll('.keyboard__button');
  const display = document.querySelector('.input-block');
  const shift = document.querySelector('.keyboard__shift');
  const letters = getLetters(buttons);
  const notButtonToEnter = ['Caps', 'Shift', 'Ctrl', 'Win', 'Alt', 'Back', 'Del', 'Enter', 'Tab', '__', 'Del', 'Back', 'eng', 'rus'];
  const arrows = ['↑', '←', '↓', '→'];
  const arrowsCode = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
  document.body.addEventListener('keydown', (event) => {
    const start = display.selectionStart;
    const end = display.selectionEnd;
    const oldStr = display.value;
    let keyValue;
    for (let i = 0; i < buttons.length; i += 1) {
      display.selectionStart = display.value.length;
      if (buttons[i].dataset.code === event.code) {
        keyValue = buttons[i].textContent;
      }
    }
    event.preventDefault();
    switch (event.key.toLowerCase()) {
      case 'tab': {
        display.value = `${oldStr.slice(0, start)}  ${oldStr.slice(end)}`;
        display.selectionStart = start + 2;
        display.selectionEnd = start + 2;
        break;
      }
      case 'capslock': {
        caps = !caps;
        changeCase(letters, caps);
        display.selectionStart = display.selectionEnd = start;
        break;
      }
      case 'shift': {
        shiftStatus = !shiftStatus;
        changeButtons(letters, true);
        if(!caps) {
          for (let i = 0; i < letters.length; i += 1) {
            letters[i].textContent = letters[i].textContent.toUpperCase();
          }
        } else if (caps && shift) {
          for (let i = 0; i < letters.length; i += 1) {
            letters[i].textContent = letters[i].textContent.toLocaleLowerCase();
          }
        }
        document.body.addEventListener('keydown', (eventNew) => {
          if (eventNew.key.toLowerCase() === 'alt') {
            lang = lang === 'eng' ? 'rus' : 'eng';
            changeLang(letters, lang, shift, caps);
          }
        });
        display.selectionStart = display.selectionEnd = start;
        break;
      }
      case 'delete': {
        display.value = oldStr.slice(0, start) + oldStr.slice(end + 1);
        display.selectionStart = display.selectionEnd = start;
        break;
      }
      case 'enter': {
        display.value = `${display.value.slice(0, start)}\n${display.value.slice(end)}`;
        display.selectionStart = display.selectionEnd = start + 1;
        break;
      }
      case 'backspace': {
        if (start >= 1) {
          display.value = oldStr.slice(0, start - 1) + oldStr.slice(end);
          display.selectionStart = display.selectionEnd = start - 1;
        }
        else {
          display.selectionStart = display.selectionEnd = start
        }
        break;
      }
      case ' ': {
        display.value = `${oldStr.slice(0, start)} ${oldStr.slice(end)}`;
        display.selectionStart = display.selectionEnd = start + 1;
        break;
      }
      case 'control': {
        display.selectionStart = display.selectionEnd = start;
        break;
      }
      case 'alt': {
        display.selectionStart = display.selectionEnd = start;
        break;
      }
      default: {
        if (!notButtonToEnter.includes(keyValue) && keyValue !== undefined) {
          display.value = `${oldStr.slice(0, start)}${keyValue}${oldStr.slice(end)}`;
          display.selectionStart = display.selectionEnd = start + 1;
        }
        if (arrowsCode.includes(event.code)) {
          for (let i = 0; i < 4; i += 1) {
            if (event.code === arrowsCode[i]) {
              display.value = `${oldStr.slice(0, start)}${arrows[i]}${oldStr.slice(end)}`;
            }
          }
        }
      }
    }
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].dataset.code === event.code) {
        buttons[i].classList.add('active');
      }
    }
  });
  document.body.addEventListener('keyup', (event) => {
    if (event.key.toLowerCase() === shift.textContent.toLowerCase()) {
      changeButtons(letters, false);
    }
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].dataset.code === event.code) {
        buttons[i].classList.remove('active');
      }
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        if(caps) {
          for (let i = 0; i < letters.length; i += 1) {
            letters[i].textContent = letters[i].textContent.toUpperCase();
          }
        } else {
          for (let i = 0; i < letters.length; i += 1) {
            letters[i].textContent = letters[i].textContent.toLocaleLowerCase();
          }
        }
      }
    }
  });
}
