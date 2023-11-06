import React from 'react';
import { StarRating } from '@/shared/ui/ratings';
import { TextArea } from '@/shared/ui/inputs/textArea';
import { Button } from '@/shared/ui/buttons';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { $apiProductsApi } from '@/shared/api';
import { ProductReview } from '@/shared/api/gen';

interface IProductReviewCreateProps {
  productId: number;
}
export const ProductReviewCreate = ({
  productId,
}: IProductReviewCreateProps) => {
  const [star, setStar] = React.useState(0);
  const [review, setReview] = React.useState('');

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
    mutate({ star, review, product: productId });
  };

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
        requeired
      />
      <Button variant="PrimaryCTAButton">Отправить</Button>
    </form>
  );
};
