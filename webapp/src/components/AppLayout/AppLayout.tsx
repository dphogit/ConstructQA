import React from 'react';
import { AppShell } from '@mantine/core';
import { AppHeader } from './AppHeader';

interface LayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: LayoutProps) {
  return (
    <AppShell padding={0} header={<AppHeader />}>
      {children}
    </AppShell>
  );
}
