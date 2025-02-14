import { useEffect } from 'react';
import { useAirdropStore } from '@app/store';
import { handleWsUserIdEvent } from '@app/hooks/airdrop/ws/useHandleWsUserIdEvent.ts';
import { OnDisconnectEventMessage, socket, SUBSCRIBE_EVENT } from '@app/utils/socket.ts';

const AUTH_EVENT = 'auth';
const userId = useAirdropStore.getState().userDetails?.user?.id;
const airdropToken = useAirdropStore.getState().airdropTokens?.token;

export default function useSocketEvents() {
    useEffect(() => {
        socket?.connect();
        return () => {
            socket?.disconnect();
        };
    }, []);
    useEffect(() => {
        if (!socket) return;
        function onConnectError(error: Error) {
            console.error('Error connecting to websocket:', error);
        }
        function onDisconnect(reason: string, details?: OnDisconnectEventMessage['details']) {
            console.error('Disconnected from websocket:', reason, details);
        }

        socket.on('disconnect', onDisconnect);
        socket.on('connect_error', onConnectError);
        return () => {
            socket?.off('disconnect', onDisconnect);
            socket?.off('connect_error', onConnectError);
        };
    }, []);

    useEffect(() => {
        console.debug('socket', socket);
        if (!socket) return;

        socket?.emit(SUBSCRIBE_EVENT);
        socket?.on('connect', () => {
            console.debug('Connected', userId, !!airdropToken, socket);
            socket?.emit(AUTH_EVENT, airdropToken);
            socket?.on(userId as string, handleWsUserIdEvent);
        });
        // return () => {
        //     socket?.off('connect', onConnect);
        // };
    }, []);
}
