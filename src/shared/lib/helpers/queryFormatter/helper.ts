export const queryFormatterStringify = (values: Record<string, string[]>) => {
  if (!values) return undefined;
  return Object?.entries(values)
    ?.map(([slug, values]) => `${slug}:${values?.join(',')}`)
    ?.join(';');
};

export const queryFormatterParse = (values: string) => {
  const obj: Record<string, string[]> = {};

  values?.split(';')?.map((value) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const [slug, values] = value?.split(':');
    obj[slug] = values?.split(',');
  });

  return obj;
};
