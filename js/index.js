/* eslint-disable import/extensions */
import createKeyboard from './functions/generation.js';
import virtualPush from './functions/virtualKeyboard.js';
import realPush from './functions/realKeyboard.js';

createKeyboard();
virtualPush();
realPush();
