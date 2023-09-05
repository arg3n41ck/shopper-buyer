import { normalizeApiUrl } from '@/shared/utils/normalizeApiUrl';

const env = {
  apiUrl: normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL),
};

export default env;
