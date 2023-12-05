const AUTH_ROOT = '/active-modal';

function path(root = '', ...segments: string[]): string {
  segments = segments || [];
  return `${root}${segments.join('')}`.replace(/\/+/g, '/');
}

export const PATH = {
  // AUTH PATHS
  authRoot: AUTH_ROOT,
  logIn: path(AUTH_ROOT, '/log-in'),
  signUp: path(AUTH_ROOT, '/sign-up'),
  resetPassword: path(AUTH_ROOT, '/reset-password'),
  newPassword: path(AUTH_ROOT, '/new-password'),
  signUpBuyer: path(AUTH_ROOT, '/sign-up/buyer'),
  signUpSeller: path(AUTH_ROOT, '/sign-up/seller'),
  authSuccess: path(AUTH_ROOT, '/success'),

  // PROFILE PATHS
  profile: '/profile/account',
  orders: '/profile/orders',
};
