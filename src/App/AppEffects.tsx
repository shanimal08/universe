import { useEffect } from 'react';
import setupLogger from '../utils/shared-logger.ts';
import { useDetectMode, useDisableRefresh, useLangaugeResolver, useListenForExternalDependencies } from '../hooks';
import useTauriEventsListener from '../hooks/app/useTauriEventsListener.ts';
import useListenForCriticalProblem from '../hooks/useListenForCriticalProblem.tsx';
import { useListenForAppUpdated } from '../hooks/app/useListenForAppUpdated.ts';
import { setMiningNetwork } from '../store/actions/miningStoreActions.ts';
import { fetchAppConfig } from '../store/actions/appConfigStoreActions.ts';
import { useListenForGpuEngines } from '@app/hooks/app/useListenForGpuEngines.ts';
import { airdropSetup } from '@app/store';

// This component is used to initialise the app and listen for any events that need to be listened to
// Created as separate component to avoid cluttering the main App component and unwanted re-renders

setupLogger();
export default function AppEffects() {
    useEffect(() => {
        async function initialize() {
            await fetchAppConfig();
            await setMiningNetwork();
            await airdropSetup();
        }
        void initialize();
    }, []);

    useDetectMode();
    useDisableRefresh();
    useLangaugeResolver();
    useListenForExternalDependencies();
    useListenForCriticalProblem();
    useTauriEventsListener();
    useListenForAppUpdated({ triggerEffect: true });
    useListenForGpuEngines();

    return null;
}
