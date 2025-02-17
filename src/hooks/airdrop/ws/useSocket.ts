import { useEffect } from 'react';
import { useAirdropStore } from '@app/store';
import { useHandleWsUserIdEvent } from '@app/hooks/airdrop/ws/useHandleWsUserIdEvent.ts';
import { OnDisconnectEventMessage, socket, SUBSCRIBE_EVENT } from '@app/utils/socket.ts';

const AUTH_EVENT = 'auth';
const userId = useAirdropStore.getState().userDetails?.user?.id;

export default function useSocketEvents() {
    const airdropToken = useAirdropStore((s) => s.airdropTokens?.token);
    const handleWsUserIdEvent = useHandleWsUserIdEvent();

    useEffect(() => {
        if (!socket) return;
        socket?.connect();
        console.debug('wen socket?.connect();');
        return () => {
            console.debug('wen socket?.DISconnect();');
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
        if (!socket) return;

        const onConnect = () => {
            console.debug('did we connect?');
            socket?.emit(AUTH_EVENT, airdropToken);
            socket?.on(userId as string, handleWsUserIdEvent);
        };

        socket?.emit(SUBSCRIBE_EVENT);
        socket?.on('connect', onConnect);
        console.debug(socket);

        return () => {
            socket?.off('connect', onConnect);
        };
    }, [airdropToken, handleWsUserIdEvent]);
}
