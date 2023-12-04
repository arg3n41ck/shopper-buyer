import React, { useState } from 'react';
import Checkbox from '../../inputs/checkbox';
import Image from 'next/image';
import cn from 'classnames';

interface Preference {
  id: number;
  value: string;
  title: string;
  img: string;
}

interface PreferenceSelectorProps {
  clothes: Preference[];
  onChange: (values: string[]) => void;
  className?: string;
}

export const PreferenceSelector: React.FC<PreferenceSelectorProps> = ({
  clothes,
  onChange,
  className,
}) => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const handleSelectAllCheckbox = () => {
    if (selectedPreferences.length === clothes.length) {
      setSelectedPreferences([]);
      onChange([]);
    } else {
      const allPreferences = clothes.map((c) => c.value);
      setSelectedPreferences(allPreferences);
      onChange(allPreferences);
    }
  };

  const handleCheckboxChange = (value: string) => {
    const updatedPreferences = selectedPreferences.includes(value)
      ? selectedPreferences.filter((pref) => pref !== value)
      : [...selectedPreferences, value];

    setSelectedPreferences(updatedPreferences);
    onChange(updatedPreferences);
  };

  return (
    <div className={cn('w-full flex flex-col gap-1', className)}>
      <Checkbox
        label={'Выбрать все'}
        checked={selectedPreferences.length === clothes.length}
        onChange={handleSelectAllCheckbox}
      />

      <div className="flex flex-wrap justify-between gap-4">
        {clothes.map((preference) => (
          <div
            key={preference.id}
            className={`max-w-[134px] w-full h-full relative border-[2px] ${
              selectedPreferences.includes(preference.value)
                ? 'border-[#171717]'
                : 'border-transparent'
            }`}
          >
            <div className="absolute top-[10px] left-[10px]">
              <Checkbox
                checked={selectedPreferences.includes(preference.value)}
                onChange={() => handleCheckboxChange(preference.value)}
              />
            </div>

            <Image
              src={preference.img}
              width={134}
              height={137}
              alt={preference.title}
              className="h-[137px]"
            />

            <p className="text-[#fff] text-[14px] font-semibold absolute left-[10px] bottom-[10px]">
              {preference.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
