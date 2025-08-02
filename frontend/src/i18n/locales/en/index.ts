import { app } from './app';
import { admin } from './admin';
import { common } from './common';
import { todo } from './todo';

export const en = {
  translation: {
    ...app,
    admin,
    common,
    todo
  }
};
