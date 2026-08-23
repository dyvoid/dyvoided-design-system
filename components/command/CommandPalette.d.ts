import React from 'react';

export interface CommandItem { id: string; label: string; shortcut?: string; hint?: string; icon?: React.ReactNode; }
export interface CommandGroup { label?: string; items: CommandItem[]; }
export interface CommandPaletteProps {
  open: boolean;
  query?: string;
  onQueryChange?: (q: string) => void;
  groups: CommandGroup[];
  activeId?: string;
  onSelect?: (id: string) => void;
  onClose?: () => void;
  placeholder?: string;
  footer?: React.ReactNode;
}
