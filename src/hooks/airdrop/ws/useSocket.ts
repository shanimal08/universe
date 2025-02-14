import { useEffect, useState } from 'react';
import { socket } from '@app/utils/socket.ts';
import { setError, useAirdropStore } from '@app/store';
import { useHandleWsUserIdEvent } from '@app/hooks/airdrop/ws/useHandleWsUserIdEvent.ts';

const AUTH_EVENT = 'auth';

type DisconnectDescription =
    | Error
    | {
          description: string;
          context?: unknown;
      };

function useSocketConnection() {
    const airdropToken = useAirdropStore((state) => state.airdropTokens?.token);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [authEvent, setAuthEvent] = useState<string | undefined>();
    const [connectError, setConnectError] = useState<Error | undefined>();
    const [disconnectMessage, setDisonnectMessage] = useState<
        { reason: string; details?: DisconnectDescription } | undefined
    >();

    useEffect(() => {
        // no-op if the socket is already connected
        socket.connect();
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            setAuthEvent(AUTH_EVENT);
        }
        function onConnectError(error: Error) {
            setConnectError(error);
        }
        function onDisconnect(reason: string, details?: DisconnectDescription) {
            setIsConnected(false);
            setDisonnectMessage({ reason, details });
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('connect_error', onConnectError);
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    useEffect(() => {
        if (authEvent?.length && airdropToken) {
            socket.emit(authEvent, airdropToken, () => {
                setAuthEvent(undefined);
            });
        }
    }, [airdropToken, authEvent]);

    useEffect(() => {
        if (connectError) {
            setError(`Error connecting to websocket: ${connectError.name}`);
            console.error('Error connecting to websocket:', connectError);
            return () => setError(undefined);
        }
    }, [connectError]);
    useEffect(() => {
        if (disconnectMessage) {
            setError(`Disconnected from websocket: ${disconnectMessage.reason}`);
            console.error('Disconnected from websocket:', disconnectMessage);
            return () => setError(undefined);
        }
    }, [disconnectMessage]);

    return isConnected;
}

function useSocketEvents() {
    const userId = useAirdropStore((state) => state.userDetails?.user?.id);
    const handleWsUserIdEvent = useHandleWsUserIdEvent();
    useEffect(() => {
        if (!userId) return;
        function onHandshakeUserId(event: string) {
            handleWsUserIdEvent(event);
        }
        socket.on(userId, onHandshakeUserId);
        return () => {
            socket.off(userId, onHandshakeUserId);
        };
    }, [handleWsUserIdEvent, userId]);
}

export { useSocketEvents, useSocketConnection };
