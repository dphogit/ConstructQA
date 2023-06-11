import React from 'react';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';

import '@fontsource-variable/open-sans';

const theme: MantineThemeOverride = {
  fontFamily: 'Open Sans, sans-serif',
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      {children}
    </MantineProvider>
  );
}
