import { app } from './app';
import { admin } from './admin';
import { common } from './common';
import { todo } from './todo';

export const zh = {
  translation: {
    ...app,
    admin,
    common,
    todo
  }
};
