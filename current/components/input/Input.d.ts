import React from 'react';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  iconLeft?: React.ReactNode;
  disabled?: boolean;
  type?: string;
}
