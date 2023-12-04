export function identifyContactType(input: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]+$/;

  if (emailRegex.test(input)) {
    return 'email';
  } else if (phoneRegex.test(input)) {
    return 'phone';
  } else {
    return 'unknown';
  }
}
