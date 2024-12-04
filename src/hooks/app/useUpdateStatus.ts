import { useCallback, useState } from 'react';
import { check, Update } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

import { useAppStateStore } from '@app/store/appStateStore';
import { useAppConfigStore } from '@app/store/useAppConfigStore';
import { useUIStore } from '@app/store/useUIStore';

export const useHandleUpdate = () => {
    const setIsAfterAutoUpdate = useAppStateStore((s) => s.setIsAfterAutoUpdate);
    const auto_update = useAppConfigStore((s) => s.auto_update);
    const [updateData, setUpdateData] = useState<Update>();
    const [isLoading, setIsLoading] = useState(false);
    const [contentLength, setContentLength] = useState(0);
    const [downloaded, setDownloaded] = useState(0);
    const setDialogToShow = useUIStore((s) => s.setDialogToShow);

    const handleClose = useCallback(() => {
        setDialogToShow(null);
        setIsAfterAutoUpdate(true);
    }, [setIsAfterAutoUpdate, setDialogToShow]);

    const handleUpdate = useCallback(async () => {
        if (!updateData) return;
        setIsLoading(true);
        console.info('Installing latest version of Tari Universe');

        await updateData.downloadAndInstall((event) => {
            switch (event.event) {
                case 'Started':
                    setContentLength(event.data.contentLength || 0);
                    break;
                case 'Progress':
                    setDownloaded((c) => c + event.data.chunkLength);
                    break;
                case 'Finished':
                    console.info('download finished');
                    break;
            }
        });
        handleClose();
        await relaunch();
    }, [handleClose, updateData]);

    const fetchUpdate = useCallback(async () => {
        const update = await check();

        if (update) {
            setUpdateData(update);

            if (auto_update) {
                await handleUpdate();
            }
        }
    }, [auto_update, handleUpdate]);

    return {
        fetchUpdate,
        handleUpdate,
        updateData,
        isLoading,
        contentLength,
        handleClose,
        downloaded,
    };
};

export const useCheckUpdate = () => {
    const setIsAfterAutoUpdate = useAppStateStore((s) => s.setIsAfterAutoUpdate);
    const setDialogToShow = useUIStore((s) => s.setDialogToShow);

    return useCallback(async () => {
        try {
            const updateRes = await check();
            if (updateRes && updateRes.available) {
                setDialogToShow('autoUpdate');
            } else {
                setIsAfterAutoUpdate(true);
            }
        } catch (error) {
            console.error('AutoUpdate error:', error);
            setIsAfterAutoUpdate(true);
        }
    }, [setDialogToShow, setIsAfterAutoUpdate]);
};
