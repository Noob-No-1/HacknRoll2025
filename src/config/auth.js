import { auth } from '../firebase-config.js';

export const doSignOut = async () => {
  return auth.signOut();
}

