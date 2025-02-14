import { useEffect, useState } from 'react';
import { setError, useAirdropStore } from '@app/store';
import { useHandleWsUserIdEvent } from '@app/hooks/airdrop/ws/useHandleWsUserIdEvent.ts';
import { OnDisconnectEventMessage, socket } from '@app/utils/socket.ts';

function useSocketConnection() {
    const [isConnected, setIsConnected] = useState(socket?.connected || false);

    const [connectError, setConnectError] = useState<Error | undefined>();
    const [disconnectMessage, setDisonnectMessage] = useState<OnDisconnectEventMessage | undefined>();

    useEffect(() => {
        // no-op if the socket is already connected
        socket?.connect();
        return () => {
            socket?.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;
        function onConnect() {
            console.info('Connected to airdrop websocket');
            setIsConnected(true);
        }
        function onConnectError(error: Error) {
            setConnectError(error);
        }
        function onDisconnect(reason: string, details?: OnDisconnectEventMessage['details']) {
            setIsConnected(false);
            setDisonnectMessage({ reason, details });
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('connect_error', onConnectError);
        return () => {
            socket?.off('connect', onConnect);
            socket?.off('disconnect', onDisconnect);
            socket?.off('connect_error', onConnectError);
        };
    }, []);

    useEffect(() => {
        if (connectError) {
            setError(`Error connecting to websocket: ${connectError.name}`);
            console.error('Error connecting to websocket:', connectError);
            return () => setConnectError(undefined);
        }
    }, [connectError]);
    useEffect(() => {
        if (disconnectMessage) {
            setError(`Disconnected from websocket: ${disconnectMessage.reason}`);
            console.error('Disconnected from websocket:', disconnectMessage);
            return () => setDisonnectMessage(undefined);
        }
    }, [disconnectMessage]);

    return isConnected;
}

function useSocketEvents() {
    const userId = useAirdropStore((state) => state.userDetails?.user?.id);
    const handleWsUserIdEvent = useHandleWsUserIdEvent();
    useEffect(() => {
        if (!userId || !socket) return;
        function onHandshakeUserId(event: string) {
            console.info(`WS Event: ${event}`);
            handleWsUserIdEvent(event);
        }
        socket.on(userId, onHandshakeUserId);
        return () => {
            socket?.off(userId, onHandshakeUserId);
        };
    }, [handleWsUserIdEvent, userId]);
}

export { useSocketEvents, useSocketConnection };
