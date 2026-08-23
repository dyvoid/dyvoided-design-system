import React from 'react';

export interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Force one of the four identity tints (0-3). Omit to derive it from `name`. */
  tint?: number;
  status?: 'online' | 'busy' | 'away' | 'offline';
  square?: boolean;
}
export interface AvatarGroupProps {
  children?: React.ReactNode;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  overflow?: number;
}
