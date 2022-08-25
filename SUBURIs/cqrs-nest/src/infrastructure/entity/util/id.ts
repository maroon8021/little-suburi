import { customAlphabet } from 'nanoid';

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

//https://zelark.github.io/nano-id-cc/
export const createNanoId = customAlphabet(alphabet, 15);
