let lang;
const BUTTONS = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Back'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift'],
  ['Ctrl', 'Win', 'Alt', '_', 'Alt', 'Ctrl', '←', '↓', '→', 'eng'],
];

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

function changeOnNew(sym, flag) {
  const symbols = sym;
  const { length } = symbols;
  let change = [];
  if (lang === 'eng') {
    change = flag ? ['{', '}', '/', ':', '"', '<', '>', '|'] : ['[', ']', '\\', ';', "'", ',', '.', '/'];
    for (let i = 0; i < length; i += 1) {
      symbols[i].textContent = change[i];
    }
  } else {
    change = flag ? ['/', ','] : ['|', '.'];
    const find = ['/', ',', '|', '.'];
    for (let i = 0; i < length; i += 1) {
      if (find.includes(symbols[i].textContent)) {
        symbols[i].textContent = change[i];
      }
    }
  }
}

function changeSym(letters, flag) {
  const { length } = letters;
  const onChange = [];
  let find = [];
  getLocalStorage();
  if (lang === 'eng') {
    find = flag ? ['[', ']', '\\', ';', "'", ',', '.', '/'] : ['{', '}', '/', ':', '"', '<', '>', '|'];
  } else {
    find = ['|', '.', '/', ','];
  }
  for (let i = 0; i < length; i += 1) {
    if (find.includes(letters[i].textContent)) {
      onChange.push(letters[i]);
    }
  }
  changeOnNew(onChange, flag);
}

export default function changeButtons(buttons, flag) {
  const { length } = buttons;
  const letters = buttons;
  let symFirstRow;
  /*
  if(caps) {
    caps = false
    changeCase(letters, false);
  }
  */
  changeSym(buttons, flag);
  if (lang === 'eng') {
    symFirstRow = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'];
  } else {
    symFirstRow = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+'];
  }
  if (flag) {
    for (let i = 0; i < length; i += 1) {
      // замена первой строки
      if (i < 13) {
        letters[i].textContent = symFirstRow[i];
      } else {
        letters[i].textContent = letters[i].textContent.toUpperCase();
      }
    }
  } else {
    for (let i = 0; i < length; i += 1) {
      // замена первой строки
      if (i === 0 && lang === 'rus') {
        letters[i].textContent = 'ё';
      }
      if (i > 0 && i < 13) {
        letters[i].textContent = BUTTONS[0][i];
      } else {
        letters[i].textContent = letters[i].textContent.toLowerCase();
      }
    }
  }
}

// в лока сторэдж
function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
window.addEventListener('beforeunload', setLocalStorage);
