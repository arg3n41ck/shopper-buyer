import React from 'react';
import { useMediaQuery } from '@/shared/lib/hooks';

interface PaginationProps {
  currentPage: number;
  count: number;
  pageLimit?: number;
  onChange: (page: number) => void;
}

export const DefaultPagination = ({
  currentPage,
  count,
  onChange,
  pageLimit = 10,
}: PaginationProps) => {
  const isMobile = useMediaQuery('md');
  const showPages = isMobile ? 3 : 7;

  const totalPages = React.useMemo(
    () => Math.ceil(count / pageLimit),
    [count, pageLimit],
  );
  const firstPage = React.useMemo(
    () => Math.max(currentPage - Math.floor(showPages / 2), 1),
    [currentPage, showPages],
  );
  const lastPage = React.useMemo(
    () => Math.min(firstPage + showPages - 1, totalPages),
    [firstPage, showPages, totalPages],
  );
  const pages = React.useMemo(
    () =>
      Array.from({ length: lastPage - firstPage + 1 }, (_, i) => firstPage + i),
    [firstPage, lastPage],
  );

  const handlePageChange = (pageNumber: number) => {
    onChange(pageNumber);
  };

  return (
    <nav>
      <ul className="flex w-full items-center justify-center gap-x-[40px] py-[32px] md:py-[10px]">
        {firstPage > 1 && (
          <>
            <li
              onClick={() => handlePageChange(1)}
              className="cursor-pointer rounded-lg text-[16px] text-gray transition-colors hover:text-black md:text-[12px]"
            >
              1
            </li>
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          </>
        )}
        {pages.map((pageNumber) => (
          <li
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`cursor-pointer rounded-lg text-[16px] text-gray transition-colors hover:text-black md:text-[12px] ${
              pageNumber === currentPage ? 'font-bold !text-black' : ''
            }`}
          >
            {pageNumber}
          </li>
        ))}
        {lastPage < totalPages && (
          <>
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
            <li
              onClick={() => handlePageChange(totalPages)}
              className="cursor-pointer rounded-lg text-[16px] text-gray transition-colors hover:text-black md:text-[12px]"
            >
              {totalPages}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
