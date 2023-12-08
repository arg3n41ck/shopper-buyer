import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { Button } from '@/shared/ui/buttons';
import { useState } from 'react';
import { ProfileFullNameModal } from './fullname-modal';
import { useUserQuery } from '@/entities/user';

export const ProfileFullName = () => {
  const [openForm, setOpenForm] = useState(false);

  const { data: profile } = useUserQuery();

  return (
    <div className="w-full">
      <div
        className={`self-stretch p-5 border-b border-zinc-300 flex-col justify-start items-start gap-3 flex`}
      >
        <div className="self-stretch justify-start items-center gap-3 inline-flex">
          <div className="grow shrink basis-0 text-neutral-900 text-lg font-medium">
            Имя
          </div>

          {!openForm && (
            <Button
              onClick={() => setOpenForm(true)}
              variant={BUTTON_STYLES.onlyText}
              className="max-w-max !p-0"
            >
              Изменить
            </Button>
          )}
        </div>
        <div className="text-stone-500 text-base font-normal">
          {profile?.first_name && profile?.last_name
            ? `${profile?.first_name} ${profile?.last_name}`
            : 'Не указаны'}
        </div>
      </div>
      <ProfileFullNameModal
        open={openForm}
        onClose={() => setOpenForm(false)}
      />
    </div>
  );
};
