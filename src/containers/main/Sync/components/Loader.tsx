import { ReactNode } from 'react';
import { GlitchWrapper } from './loader.styles.ts';

export const GlitchLoader = ({ children }: { children: ReactNode }) => {
    return <GlitchWrapper data-text={children}>{children}</GlitchWrapper>;
};
