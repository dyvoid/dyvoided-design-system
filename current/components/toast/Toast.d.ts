import React from 'react';

export interface ToastProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
}
export interface ToastStackProps {
  children?: React.ReactNode;
  placement?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}
