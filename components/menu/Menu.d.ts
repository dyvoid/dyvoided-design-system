import React from 'react';

export interface MenuItem {
  id?: string;
  label?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  header?: boolean;
  separator?: boolean;
}
export interface MenuProps {
  items: MenuItem[];
  onSelect?: (id: string) => void;
  width?: number;
}
