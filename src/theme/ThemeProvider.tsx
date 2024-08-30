import { ReactNode } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes.ts';

const theme = {
    darkTheme,
    lightTheme,
};
export default function ThemeProvider({ children }: { children: ReactNode }) {
    return <SCThemeProvider theme={theme.lightTheme}>{children}</SCThemeProvider>;
}
