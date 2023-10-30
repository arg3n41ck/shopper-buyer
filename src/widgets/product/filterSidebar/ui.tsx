import React from 'react';
import { DefaultBreadcrumb } from '@/shared/ui/breadcrumbs';
import TextField from '@/shared/ui/inputs/textField';
import { Search } from 'react-feather';
import { Accordion } from '@/shared/ui/accordions';
import Checkbox from '@/shared/ui/inputs/checkbox';

interface IFilterSidebarProps {
  children: React.ReactNode;
}
export const FilterSidebar = ({ children }: IFilterSidebarProps) => {
  const [search, setSearch] = React.useState('');
  const [checkbox, setCheckbox] = React.useState(false);

  return (
    <div className="grid grid-cols-[300px_1fr] gap-[40px] lg:grid-cols-1">
      <div className="min-h-[100vh] w-full h-full pt-[24px] lg:hidden">
        <div>
          <DefaultBreadcrumb
            className="mb-[48px]"
            items={[
              { label: 'Главная', link: '/' },
              { label: 'Женское', link: '/products' },
              { label: 'Топы' },
            ]}
          />

          <Accordion
            classNames={{
              accordionClassName: 'border-b border-[#DBDBDB]',
              labelClassName: 'py-[11px]',
            }}
            title="БРЕНДЫ"
            defaultOpen
          >
            <div className="grid gap-[8px]">
              <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                startAdornment={<Search color="#676767" size={24} />}
                placeholder="Поиск"
              />
              <Checkbox
                className="py-[11px]"
                checked={checkbox}
                onChange={({ target }) => setCheckbox(target.checked)}
                label="Acne Studios"
                rightLabel="23"
              />
              <Checkbox
                className="py-[11px]"
                checked={checkbox}
                onChange={({ target }) => setCheckbox(target.checked)}
                label="Acne Studios"
                rightLabel="23"
              />
              <Checkbox
                className="py-[11px]"
                checked={checkbox}
                onChange={({ target }) => setCheckbox(target.checked)}
                label="Acne Studios"
                rightLabel="23"
              />
              <Checkbox
                className="py-[11px]"
                checked={checkbox}
                onChange={({ target }) => setCheckbox(target.checked)}
                label="Acne Studios"
                rightLabel="23"
              />
              <Checkbox
                className="py-[11px]"
                checked={checkbox}
                onChange={({ target }) => setCheckbox(target.checked)}
                label="Acne Studios"
              />
            </div>
          </Accordion>

          <Accordion
            classNames={{
              accordionClassName: 'border-b border-[#DBDBDB]',
              labelClassName: 'py-[11px]',
            }}
            title="КАТЕГОРИЯ"
            defaultOpen
          >
            <div className="grid gap-[8px]">
              <Checkbox
                className="py-[11px]"
                checked={checkbox}
                onChange={({ target }) => setCheckbox(target.checked)}
                label="Acne Studios"
                rightLabel="23"
              />
              <Checkbox
                className="py-[11px]"
                checked={checkbox}
                onChange={({ target }) => setCheckbox(target.checked)}
                label="Acne Studios"
                rightLabel="23"
              />
              <Checkbox
                className="py-[11px]"
                checked={checkbox}
                onChange={({ target }) => setCheckbox(target.checked)}
                label="Acne Studios"
                rightLabel="23"
              />
            </div>
          </Accordion>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
