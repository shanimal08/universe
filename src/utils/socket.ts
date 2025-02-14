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
const AUTH_EVENT = 'auth';
const version = import.meta.env.VITE_TARI_UNIVERSE_VERSION;

const initialiseSocket = (airdropApiUrl: string, airdropToken: string) => {
    const appId = useAppConfigStore.getState().anon_id;
    const miningNetwork = useMiningStore.getState().network;
    const wsOptions = {
        auth: {
            token: airdropToken,
            appId,
            network: miningNetwork,
            version,
        },
        transports: ['websocket', 'polling'],
        secure: true,
    };

    socket = io(airdropApiUrl, wsOptions);
    console.info('Socket initialised');
    socket.emit(SUBSCRIBE_EVENT);
    socket.emit(AUTH_EVENT, airdropToken);
};

function removeSocket() {
    socket?.disconnect();
    socket = null;
    console.info('Socket removed');
}
export { socket, initialiseSocket, removeSocket, type OnDisconnectEventMessage };
