import React from 'react';

export interface PanelProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
}
