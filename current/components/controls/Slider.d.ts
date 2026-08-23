import React from 'react';

export interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  valueLabel?: string | number;
  accent?: 'primary' | 'secondary';
}
