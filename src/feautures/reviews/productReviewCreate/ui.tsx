import React from 'react';
import { StarRating } from '@/shared/ui/ratings';
import { TextArea } from '@/shared/ui/inputs/textArea';
import { Button } from '@/shared/ui/buttons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { $apiProductsApi } from '@/shared/api';
import { ProductReview } from '@/shared/api/gen';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface IProductReviewCreateProps {
  productId?: number;
  refetchReviews?: () => void;
}
export const ProductReviewCreate = ({
  productId,
  refetchReviews,
}: IProductReviewCreateProps) => {
  const token = Cookies.get('refresh_token');
  const { query } = useRouter();
  const [star, setStar] = React.useState(0);
  const [review, setReview] = React.useState('');

  const { data } = useQuery({
    queryKey: ['productsCustomerProductsRead', query],
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerProductsRead(
        query?.slug as string,
      );
      refetchReviews && refetchReviews();
      return data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (values: ProductReview) => {
      await toast.promise(
        $apiProductsApi.productsCustomerReviewsCreate(values),
        {
          pending: 'Отправка...',
          success: 'Отзыв успешно оставлен',
          error: 'Ошибка!',
        },
      );
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ star, review, product: productId || (data?.id as number) });
  };

  if (!token) {
    return <h2>Требуется авторизация, что бы оставить отзыв</h2>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-[12px] font-jost leading-tight"
    >
      <h4 className="text-[20px] font-[600] md:text-[18px]">Оставить отзыв</h4>
      <div className="mb-[12px]">
        <StarRating getRating={setStar} rating={0} />
      </div>
      <TextArea
        value={review}
        onChange={({ target }) => setReview(target.value)}
        placeholder="Ваш отзыв"
        rows={4}
        required
      />
      <Button variant="PrimaryCTAButton">Отправить</Button>
    </form>
  );
};
