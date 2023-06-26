import React from 'react';
import { AppShell } from '@mantine/core';
import { AppSidebar } from './AppSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: LayoutProps) {
  return (
    <AppShell padding={0} navbar={<AppSidebar />}>
      {children}
    </AppShell>
  );
}
