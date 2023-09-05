import { TypedPathAuth, TypedPathMainImage } from '../lib/types/pathsTypes';

const AUTH_ROOT = '/auth';
const MAIN_PAGE_ROOT = '/';

function path(root = '', ...segments: string[]): string {
  segments = segments || [];
  return `${root}${segments.join('')}`.replace(/\/+/g, '/');
}

export const PATH_AUTH: TypedPathAuth = {
  root: AUTH_ROOT,
  logIn: path(AUTH_ROOT, '/log-in'),
  signUp: path(AUTH_ROOT, '/sign-up'),
  resetPassword: path(AUTH_ROOT, '/reset-password'),
  newPassword: path(AUTH_ROOT, '/new-password'),
  authSuccess: path(AUTH_ROOT, '/success'),
};

export const PATH_MAIN_PAGE: TypedPathMainImage = {
  root: MAIN_PAGE_ROOT,
};
