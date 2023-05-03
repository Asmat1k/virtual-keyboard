// Отлов нужных кнопок
export default function getLetters(buttons) {
const result = [];
  buttons.forEach((button) => {
    if (button.textContent.length === 1) {
      result.push(button);
    }
  });
  return result;
}
