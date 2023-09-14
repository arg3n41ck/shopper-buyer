import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  FC,
  ChangeEvent,
} from 'react';
import {
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteWrapper,
  ChevronDownIconCont,
  InputLabel,
  ErrorText,
} from './styles';
import { ChevronDown } from 'react-feather';

type AutocompleteProps = {
  options: any[];
  inputLabel?: string;
  width?: string;
  onChange: (value: string) => void;
  error?: boolean | undefined;
  placeholder?: string;
  errorMessage?: string;
  value?: string;
  fieldTitle: string;
  fieldValue: string;
};

const Autocomplete: FC<AutocompleteProps> = ({
  options,
  placeholder,
  inputLabel,
  width,
  onChange,
  error,
  errorMessage,
  value,
  fieldTitle,
  fieldValue,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerIdRef = useRef<number | null>(null);
  const [focused, setFocus] = useState(false);
  const isActive = focused || value || inputValue;

  const filteredOptions = useMemo<any[]>(() => {
    return options.filter(
      (option) =>
        option[fieldTitle]?.toLowerCase().includes(inputValue?.toLowerCase()),
    );
  }, [options, inputValue]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInputValue(value);
      setShowOptions(true);
    },
    [],
  );

  const handleItemClick = (option: any) => {
    setInputValue(option[fieldTitle]);
    setShowOptions(false);
    onChange(option[fieldValue]);
  };

  const handleBlur = useCallback(() => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }

    timerIdRef.current = window.setTimeout(() => {
      setShowOptions(false);
    }, 200);
  }, []);

  useEffect(() => {
    if (showOptions && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showOptions]);

  return (
    <div>
      {inputLabel && <InputLabel>{inputLabel}</InputLabel>}
      <AutocompleteWrapper
        width={width}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`${inputLabel ? 'mt-2' : ''}`}
      >
        <AutocompleteInput
          type="text"
          placeholder={placeholder}
          value={
            options.find((option) => option[fieldValue] === value)?.[
              fieldTitle
            ] || inputValue
          }
          ref={inputRef}
          onChange={handleInputChange}
          onFocus={() => setShowOptions(true)}
          onBlur={handleBlur}
          className={`${isActive ? 'active' : ''} ${error ? 'error' : ''}`}
        />
        <ChevronDownIconCont
          onClick={() => setShowOptions((prev) => !prev)}
          open={showOptions}
          className={`${isActive ? 'active' : ''} ${error ? 'error' : ''}`}
        >
          <ChevronDown />
        </ChevronDownIconCont>
        {showOptions && !!filteredOptions?.length && (
          <AutocompleteList>
            {filteredOptions.map((option) => (
              <AutocompleteItem
                key={option.id}
                onClick={() => handleItemClick(option)}
              >
                {option[fieldTitle]}
              </AutocompleteItem>
            ))}
          </AutocompleteList>
        )}
      </AutocompleteWrapper>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </div>
  );
};

export default Autocomplete;
