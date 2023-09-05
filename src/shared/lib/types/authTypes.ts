type TypeCheckUserByEmail = {
  email: string;
};

type TypeLogIn = { email: string; password: string };

type TypeResetPassword = {
  token: string;
  new_password: string;
};

type TypeChangeEmail = {
  email: string;
  password: string;
};

type TypeChangePassword = {
  old_password: string;
  new_password: string;
};

type TypeLogOut = {
  user_id: string | undefined;
};

type TypeUser = {
  id: string;
  email: string;
  seller: {
    shop_name: string;
  } | null;
  buyer: {
    fist_name: string;
    last_name: string;
  } | null;
  user_type: string;
};

export type {
  TypeCheckUserByEmail,
  TypeLogIn,
  TypeResetPassword,
  TypeLogOut,
  TypeUser,
  TypeChangePassword,
  TypeChangeEmail,
};
