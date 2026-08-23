import React from 'react';

export interface WindowChromeProps {
  title: string;
  children: React.ReactNode;
  active?: boolean;
  platform?: 'mac' | 'win';
}
