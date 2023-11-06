import React from 'react';
import { ProductReview } from '@/shared/api/gen';
import { StarRating } from '@/shared/ui/ratings';

interface IProductReviewCardProps {
  review: ProductReview;
}
export const ProductReviewCard = ({ review }: IProductReviewCardProps) => {
  return (
    <div className="shadow-[0_-1px_0_var(--secondWhite),0_1px_0_var(--secondWhite)] py-[12px] grid gap-[8px] font-jost">
      <div className="flex gap-[5px] items-center">
        <p className="w-full text-[18px] font-[500]">
          {review?.customer?.user}
        </p>
        <StarRating rating={review.star} disabled />
      </div>
      <p className="text-[16px] text-black">{review.review}</p>
    </div>
  );
};
