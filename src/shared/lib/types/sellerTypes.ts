type TypeCheckUserByEmail = {
  email: string;
};

type TypeAddressData = {
  id: string;
  address: string;
  phone_number: string;
};

type OptionType = {
  id?: string;
  name: string;
  value: string;
};

export type { TypeCheckUserByEmail, TypeAddressData, OptionType };
