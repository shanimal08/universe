import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyMotion, domAnimation, AnimatePresence } from 'motion/react';

import { useIsAppReady } from '../hooks/app/isAppReady.ts';
import { useShuttingDown } from '../hooks';

import { useAppStateStore } from '../store/appStateStore';
import { setError, setIsWebglNotSupported } from '../store/actions';
import { GlobalReset, GlobalStyle } from '../theme/GlobalStyle.ts';
import ThemeProvider from '../theme/ThemeProvider.tsx';
import Splashscreen from '../containers/phase/Splashscreen/Splashscreen.tsx';
import ShuttingDownScreen from '../containers/phase/ShuttingDownScreen/ShuttingDownScreen.tsx';
import FloatingElements from '../containers/floating/FloatingElements.tsx';
import MainView from '../containers/main/MainView.tsx';
import Setup from '../containers/phase/Setup/Setup';

import { AppContentContainer } from './App.styles.ts';

const CurrentAppSection = memo(function CurrentAppSection() {
    const isAppReady = useIsAppReady();
    const isShuttingDown = useShuttingDown();
    const isSettingUp = useAppStateStore((s) => !s.setupComplete);

    const currentSection = useMemo(() => {
        const showSetup = isSettingUp && !isShuttingDown && isAppReady;
        const showMainView = !isSettingUp && !isShuttingDown && isAppReady;
        if (!isAppReady) {
            return (
                <AppContentContainer key="splashscreen" initial="hidden">
                    <Splashscreen />
                </AppContentContainer>
            );
        }

        if (showSetup) {
            return (
                <AppContentContainer key="setup" initial="hidden">
                    <Setup />
                </AppContentContainer>
            );
        }

        if (showMainView) {
            return (
                <AppContentContainer key="main" initial="dashboardInitial">
                    <MainView />
                </AppContentContainer>
            );
        }

        if (isShuttingDown) {
            return (
                <AppContentContainer key="shutdown" initial="hidden">
                    <ShuttingDownScreen />
                </AppContentContainer>
            );
        }
    }, [isAppReady, isSettingUp, isShuttingDown]);

    return <AnimatePresence mode="popLayout">{currentSection}</AnimatePresence>;
});

export default function App() {
    const { t } = useTranslation('common', { useSuspense: false });

    if (!window.WebGL2RenderingContext && !window.WebGLRenderingContext) {
        console.error(`WebGL not supported by the browser - userAgent: ${navigator.userAgent}`);
        setIsWebglNotSupported(true);
        setError(t('webgl-not-supported'));
    }
    return (
        <ThemeProvider>
            <GlobalReset />
            <GlobalStyle />
            <LazyMotion features={domAnimation} strict>
                <FloatingElements />
                <CurrentAppSection />
            </LazyMotion>
        </ThemeProvider>
    );
}
