import React from 'react';

export interface SidebarNavItem { id: string; label: string; icon?: React.ReactNode; meta?: string | number; }
export interface SidebarNavSection { label?: string; items: SidebarNavItem[]; }
export interface SidebarNavProps {
  sections: SidebarNavSection[];
  activeId?: string;
  onChange?: (id: string) => void;
  width?: number;
  collapsed?: boolean;
}
