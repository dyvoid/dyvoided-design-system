import React from 'react';

export interface TabItem { id: string; label: string; }
export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange?: (id: string) => void;
}
