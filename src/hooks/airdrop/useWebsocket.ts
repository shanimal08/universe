import { io } from 'socket.io-client';
import { useAirdropStore } from '@app/store/useAirdropStore.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMiningStore } from '@app/store/useMiningStore';
import { useAppConfigStore } from '@app/store/useAppConfigStore';

import { invoke } from '@tauri-apps/api/core';
import { useBlockchainVisualisationStore } from '@app/store/useBlockchainVisualisationStore';
import { useAppStateStore } from '@app/store/appStateStore';
import { MINING_EVENT_INTERVAL_MS } from '@app/store/useShellOfSecretsStore';
import { useMiningMetricsStore } from '@app/store/useMiningMetricsStore.ts';

const MINING_EVENT_NAME = 'mining-status';

interface SignData {
    signature: string;
    pubKey: string;
}

export const useWebsocket = () => {
    const userId = useAirdropStore((state) => state.userDetails?.user?.id);
    const baseUrl = useAirdropStore((state) => state.backendInMemoryConfig?.airdropApiUrl);
    const cpuMiningStatus = useMiningMetricsStore((state) => state.cpu_mining_status);
    const gpuMiningStatus = useMiningMetricsStore((state) => state.gpu_mining_status);
    const network = useMiningStore((state) => state.network);
    const appId = useAppConfigStore((state) => state.anon_id);
    const isConnectedToNetwork = useMiningMetricsStore((state) => state.isNodeConnected);

    const [connectedSocket] = useState(false);
    const height = useBlockchainVisualisationStore((s) => s.displayBlockHeight);
    const applicationsVersions = useAppStateStore((state) => state.applications_versions);

    const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

    const isMining = useMemo(() => {
        return (cpuMiningStatus?.is_mining || gpuMiningStatus?.is_mining) && isConnectedToNetwork;
    }, [isConnectedToNetwork, cpuMiningStatus?.is_mining, gpuMiningStatus?.is_mining]);

    const handleEmitMiningStatus = useCallback(async (isMining: boolean) => {
        if (!socket || !connectedSocket) return;
        const payload = {
            isMining,
            appId,
            blockHeight: height,
            version: applicationsVersions?.tari_universe,
            network,
            userId,
        };
        try {
            const transformedPayload = `${payload.version},${payload.network},${payload.appId},${payload.userId},${payload.isMining},${payload.blockHeight}`;
            const signatureData = (await invoke('sign_ws_data', {
                data: transformedPayload,
            })) as SignData;

            const statusResponse: { error?: string; success: boolean } = await socket
                .timeout(5000)
                .emitWithAck(MINING_EVENT_NAME, {
                    data: payload,
                    signature: signatureData.signature,
                    pubKey: signatureData.pubKey,
                });
            if (statusResponse) {
                // registerWsConnectionEvent({
                //     state: statusResponse.success ? 'up' : 'error',
                //     error: `shell of secrets mining error - reason: ${statusResponse.error}`,
                // });
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        if (isMining) {
            const intervalId = setInterval(() => {
                handleEmitMiningStatus(isMining);
            }, MINING_EVENT_INTERVAL_MS);
            return () => clearInterval(intervalId);
        } else {
            handleEmitMiningStatus(isMining);
        }
    }, [baseUrl, handleEmitMiningStatus, network, isMining]);
};
