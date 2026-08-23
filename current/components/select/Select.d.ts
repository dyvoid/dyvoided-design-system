import React from 'react';

export interface SelectOption { value: string; label: string; hint?: string; }
export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}
