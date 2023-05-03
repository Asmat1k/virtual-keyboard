/* eslint-disable no-multi-assign */
/* eslint-disable import/extensions */
import changeButtons from './changeButtons.js';
import getLetters from './getletters.js';
import changeCase from './changeCase.js';
import changeLang from './changeLang.js';

let caps = false;
let shift = false;
let lang;

function getLocalStorage() {
  const buttons = document.querySelectorAll('.keyboard__button');
  const letters = getLetters(buttons);
  if (localStorage.getItem('lang')) {
    if (localStorage.getItem('lang') === 'eng') {
      lang = 'eng';
    } else {
      lang = 'rus';
      changeLang(letters, lang, shift, caps);
    }
  }
}
window.addEventListener('load', getLocalStorage);

export default function virtualPush() {
  const buttons = document.querySelectorAll('.keyboard__button');
  const display = document.querySelector('.input-block');
  const letters = getLetters(buttons);
  const notButtonToEnter = ['Caps', 'Shift', 'Ctrl', 'Win', 'Alt', 'Back', 'Del', 'Enter', 'Tab', '__', 'Del', 'Back', 'eng', 'rus'];
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      display.focus();
      const start = display.selectionStart;
      const end = display.selectionEnd;
      const oldStr = display.value;
      // Ввод текста
      switch (button.textContent.toLocaleLowerCase()) {
        case 'caps': {
          caps = !caps;
          changeCase(letters, caps);
          break;
        }
        case 'shift': {
          shift = !shift;
          changeButtons(letters, shift);
          if (caps && !shift) {
            for (let i = 0; i < letters.length; i += 1) {
              letters[i].textContent = letters[i].textContent.toUpperCase();
            }
          } else if (caps && shift) {
            for (let i = 0; i < letters.length; i += 1) {
              letters[i].textContent = letters[i].textContent.toLocaleLowerCase();
            }
          }
          break;
        }
        case '__': {
          display.value = `${oldStr.slice(0, start)} ${oldStr.slice(end)}`;
          display.selectionStart = display.selectionEnd = start + 1;
          break;
        }
        case 'tab': {
          display.value = `${display.value.slice(0, start)}  ${display.value.slice(end)}`;
          display.selectionStart = display.selectionEnd = start + 2;
          break;
        }
        case 'enter': {
          display.value = `${display.value.slice(0, start)}\n${display.value.slice(end)}`;
          display.selectionStart = display.selectionEnd = start + 1;
          break;
        }
        case 'back': {
          if (!display.focus()) {
            display.focus();
          }
          display.value = oldStr.slice(0, start - 1) + oldStr.slice(end);
          display.selectionStart = display.selectionEnd = start - 1;
          break;
        }
        case 'del': {
          if (!display.focus()) {
            display.focus();
          }
          display.value = oldStr.slice(0, start) + oldStr.slice(end + 1);
          // eslint-disable-next-line no-multi-assign
          display.selectionStart = display.selectionEnd = start;
          break;
        }
        default: {
          if (!notButtonToEnter.includes(button.textContent)) {
            display.focus();
            display.value = `${display.value.slice(0, start)}${button.textContent}${display.value.slice(end)}`;
            display.selectionStart = display.selectionEnd = start + 1;
          }
          break;
        }
      }
      // Смена языка
      if (button.classList.contains('keyboard__change')) {
        lang = lang === 'eng' ? 'rus' : 'eng';
        changeLang(letters, lang, shift, caps);
      }
    });
  });
}
