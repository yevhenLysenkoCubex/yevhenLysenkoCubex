import { makeVar } from '@apollo/client';

export const left = makeVar('09:00');

let countdown: NodeJS.Timeout;
export const setCountdownOn = () => {
  countdown = setInterval(() => {
    const [minutes, seconds] = left().split(':');
    const m = Number(minutes);
    const s = Number(seconds);
    let remains = '';

    if (s === 0 && m === 0) {
      return clearInterval(countdown);
    }

    if (s === 0) {
      remains = (m - 1).toString().padStart(2, '0') + ':59';
      return left(remains);
    }
    // Make util string.toString().padStart(2, '0')
    // Change ``;

    remains =
      m.toString().padStart(2, '0') + ':' + (s - 1).toString().padStart(2, '0');
    return left(remains);
  }, 1000);
};

export const setCountdownOff = () => clearInterval(countdown);
