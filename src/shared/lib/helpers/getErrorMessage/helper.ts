import { toast } from 'react-toastify';

export const getErrorMessage = (e: any) => {
  if (!e) return 'ошибка!';
  const errorData = e?.response?.data;

  if (errorData) {
    for (const key in errorData) {
      if (Array.isArray(errorData[key])) return errorData[key][0];
      if (typeof errorData[key] == 'string') return errorData[key];
    }
  } else return 'ошибка!';
};

export const fetchWithErrorMessage = async (
  fetch: Promise<unknown>,
  messages: { pending?: string; success?: string } = {},
) => {
  try {
    await toast.promise(fetch, messages);
  } catch (e) {
    toast.error(getErrorMessage(e));
  }
};
