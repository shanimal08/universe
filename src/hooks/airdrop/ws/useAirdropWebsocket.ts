import { useSocketConnection, useSocketEvents } from './useSocket.ts';
import { useEmitMiningStatus } from './useHandleEmitMiningStatus.ts';

export default function useAirdropWebsocket() {
    useSocketConnection();
    useSocketEvents();
    useEmitMiningStatus();
}
