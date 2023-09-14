import {
  TypeCheckUserByEmail,
  TypeLogIn,
  TypeResetPassword,
  TypeLogOut,
  TypeUser,
  TypeChangePassword,
  TypeChangeEmail,
} from '@/shared/lib/types/authTypes';
import ApiClient from '../api/apiClient';
import {
  getLocalStorageValues,
  removeFieldsFromLocalStorage,
} from '@/shared/lib/hooks/useLocalStorage';

export class AuthClient {
  async checkUserByEmail({ email }: TypeCheckUserByEmail): Promise<any> {
    try {
      const { data } = await ApiClient.post<any>(`/auth/user-exists/`, {
        email,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async checkUserByEmailForResetPassword({
    email,
  }: TypeCheckUserByEmail): Promise<any> {
    try {
      const { data } = await ApiClient.post<any>(
        `/auth/password-reset-request/`,
        { email },
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async login(body: TypeLogIn): Promise<any> {
    try {
      const { data } = await ApiClient.post<any>('/auth/login/', body);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(body: TypeResetPassword): Promise<any> {
    try {
      const { data } = await ApiClient.post<any>('/auth/password-reset/', body);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(body: TypeChangePassword): Promise<any> {
    try {
      const { data } = await ApiClient.patch<any>(
        '/users/settings/change-password/',
        body,
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async changeEmail(body: TypeChangeEmail): Promise<any> {
    try {
      const { data } = await ApiClient.patch<any>(
        '/users/settings/change-email/',
        body,
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async logOut({ user_id }: TypeLogOut): Promise<void> {
    const tokens = getLocalStorageValues(['access_token', 'refresh_token']);

    const body = {
      user_id,
      ...tokens,
    };

    try {
      await ApiClient.post<any>('/auth/logout/', body);
      removeFieldsFromLocalStorage(['access_token', 'refresh_token']);
    } catch (error) {
      throw error;
    }
  }

  async getMe(): Promise<TypeUser> {
    try {
      const { data } = await ApiClient.get<TypeUser>('/users/me/');
      return data;
    } catch (error) {
      throw error;
    }
  }
}
