import { io } from 'socket.io-client';

import { useAppConfigStore, useMiningStore } from '@app/store';

type DisconnectDescription =
    | Error
    | {
          description: string;
          context?: unknown;
      };

interface OnDisconnectEventMessage {
    reason: string;
    details?: DisconnectDescription;
}

let socket: ReturnType<typeof io> | null = null;
const SUBSCRIBE_EVENT = 'subscribe-to-gem-updates';
const version = import.meta.env.VITE_TARI_UNIVERSE_VERSION;

const initialiseSocket = (airdropApiUrl: string, airdropToken: string) => {
    const appId = useAppConfigStore.getState().anon_id;
    const miningNetwork = useMiningStore.getState().network;
    const wsOptions = {
        auth: {
            token: airdropToken,
            appId,
            version,
            network: miningNetwork,
        },
        transports: ['websocket', 'polling'],
        secure: true,
    };

    socket = io(airdropApiUrl, wsOptions);
    socket.emit(SUBSCRIBE_EVENT);
};

function removeSocket() {
    if (!socket) return;
    socket.disconnect();
    socket = null;
}
export { socket, initialiseSocket, removeSocket, type OnDisconnectEventMessage };
