import { io } from 'socket.io-client';
import { useAirdropStore } from '@app/store/useAirdropStore.ts';
import { useMiningStore } from '@app/store';

const AIRDROP_WS_URL = useAirdropStore.getState().backendInMemoryConfig?.airdropApiUrl;
const airdropToken = useAirdropStore.getState().airdropTokens?.token;
const miningNetwork = useMiningStore.getState().network;
const wsOptions = {
    autoConnect: false,
    auth: {
        token: airdropToken,
        network: miningNetwork,
    },
    transports: ['websocket', 'polling'],
    secure: true,
    withCredentials: true,
};

export const socket = io(AIRDROP_WS_URL, wsOptions);
