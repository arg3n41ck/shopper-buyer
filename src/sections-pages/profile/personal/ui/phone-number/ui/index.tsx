import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { Button } from '@/shared/ui/buttons';
import { useState } from 'react';
import { ProfilePhoneNumberModal } from './phone-number-modal';
import { useProfileQuery } from '@/sections-pages/profile';

export const ProfilePhoneNumber = () => {
  const [openForm, setOpenForm] = useState(false);

  const { data: profile } = useProfileQuery();

  return (
    <div className="w-full">
      <div
        className={`self-stretch p-5 border-b border-zinc-300 flex-col justify-start items-start gap-3 flex`}
      >
        <div className="self-stretch justify-start items-center gap-3 inline-flex">
          <div className="grow shrink basis-0 text-neutral-900 text-lg font-medium">
            Номер телефона
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
          {profile?.phone_number || 'Не указан'}
        </div>
      </div>

      <ProfilePhoneNumberModal
        open={openForm}
        onClose={() => setOpenForm(false)}
      />
    </div>
  );
};
