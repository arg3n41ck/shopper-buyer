import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { $apiCustomersApi } from '@/shared/api';

interface IAddressesInputProps {}
export const AddressesInput = () => {
  const [address, setAddress] = React.useState('');

  const { data } = useQuery({
    queryKey: ['customersAddressesList'],
    queryFn: async () => {
      const { data } = await $apiCustomersApi.customersAddressesList();
      return data;
    },
  });

  return (
    <div>
      <p>Адрес доставки</p>
      <div></div>
    </div>
  );
};
