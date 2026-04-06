import { useState } from 'react';
import clsx from 'clsx';

interface Props {
  value: number | null;
  onChange: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function CurrencyInput({ value, onChange, placeholder = '0', disabled, className }: Props) {
  const [focused, setFocused] = useState(false);
  const [inputVal, setInputVal] = useState('');

  function handleFocus() {
    setFocused(true);
    setInputVal(value !== null && value !== 0 ? String(value) : '');
  }

  function handleBlur() {
    setFocused(false);
    const parsed = parseFloat(inputVal.replace(/,/g, ''));
    onChange(isNaN(parsed) ? 0 : parsed);
  }

  const displayValue = focused
    ? inputVal
    : value !== null && value !== 0
    ? value.toLocaleString('en-PH')
    : '';

  return (
    <div className={clsx('relative flex items-center', className)}>
      <span className="absolute left-3 text-gray-500 text-sm select-none">₱</span>
      <input
        type="text"
        inputMode="decimal"
        value={displayValue}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => setInputVal(e.target.value)}
        className={clsx(
          'w-full pl-7 pr-3 py-2 border rounded-lg text-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          disabled
            ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
            : 'border-gray-300 hover:border-gray-400'
        )}
      />
    </div>
  );
}
