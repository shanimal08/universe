import { io } from 'socket.io-client';

import { useMiningStore } from '@app/store';

let socket: ReturnType<typeof io> | null = null;

const initialiseSocket = (airdropApiUrl: string, airdropToken: string) => {
    console.debug('hi !initialiseSocket');
    const miningNetwork = useMiningStore.getState().network;
    const wsOptions = {
        auth: {
            token: airdropToken,
            network: miningNetwork,
        },
        transports: ['websocket', 'polling'],
        secure: true,
    };

    socket = io(airdropApiUrl, wsOptions);
};

function removeSocket() {
    if (!socket) return;
    socket.disconnect();
    socket = null;
}
export { socket, initialiseSocket, removeSocket };
