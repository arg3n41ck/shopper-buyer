type Paths<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => string
    ? (...args: A) => string
    : Paths<T[K]>;
};

interface PathAuthStructure {
  root: string;
  logIn: string;
  signUp: string;
  resetPassword: string;
  newPassword: string;
  authSuccess: string;
}

export type TypedPathAuth = Paths<PathAuthStructure>;

interface PathMainPage {
  root: string;
}

export type TypedPathMainImage = Paths<PathMainPage>;
