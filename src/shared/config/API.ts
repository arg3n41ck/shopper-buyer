import { normalizeApiUrl } from '../lib/helpers';

export const env = {
  apiUrl: normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL),
};
