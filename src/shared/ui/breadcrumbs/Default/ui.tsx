import React, { ComponentPropsWithRef } from 'react';
import Link from 'next/link';
import InlineSVG from 'react-inlinesvg';
import ArrowIcon from 'public/images/icons/arrows/chevron-right.svg';
import cn from 'classnames';

interface IDefaultBreadcrumbProps extends ComponentPropsWithRef<'div'> {
  items: { label: string; link?: string }[];
}

export const DefaultBreadcrumb = ({
  items,
  className,
  ...other
}: IDefaultBreadcrumbProps) => {
  return (
    <div className={cn('flex items-center font-mazzard', className)} {...other}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.link ? (
            <Link href={item.link}>
              <p className="text-[16px] transition-all hover:text-black font-normal leading-tight text-gray md:text-[10px]">
                {item.label}
              </p>
            </Link>
          ) : (
            <p className="cursor-no-drop text-black text-[16px] font-normal leading-tight md:text-[10px]">
              {item.label}
            </p>
          )}
          {index !== items.length - 1 && (
            <div className="mx-[2px] w-[16px] h-[16px] flex items-center">
              <InlineSVG className="object-contain" src={ArrowIcon.src} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
