import { useShellOfSecretsStore } from '@app/store/useShellOfSecretsStore';
import { WebsocketEventNames, WebsocketUserEvent } from '@app/types/ws';
import { setFlareAnimationType, setUserGems } from '@app/store';
import { useCallback } from 'react';

const setTotalBonusTimeMs = useShellOfSecretsStore.getState().setTotalBonusTimeMs;
const referrals = useShellOfSecretsStore.getState().referrals;
const setReferrals = useShellOfSecretsStore.getState().setReferrals;

export function useHandleWsUserIdEvent() {
    return useCallback((event: string) => {
        const eventParsed = JSON.parse(event) as WebsocketUserEvent;
        switch (eventParsed.name) {
            case WebsocketEventNames.REFERRAL_INSTALL_REWARD:
                setFlareAnimationType('FriendAccepted');
                break;
            case WebsocketEventNames.COMPLETED_QUEST:
                if (eventParsed.data.userPoints?.gems) {
                    setUserGems(eventParsed.data.userPoints?.gems);
                }
                break;
            case WebsocketEventNames.MINING_STATUS_CREW_UPDATE: {
                setTotalBonusTimeMs(eventParsed.data.totalTimeBonusMs);
                break;
            }

            case WebsocketEventNames.MINING_STATUS_CREW_DISCONNECTED:
                if (referrals?.activeReferrals) {
                    const totalActiveReferrals = (referrals?.totalActiveReferrals || 1) - 1;
                    const referralsUpdated = referrals?.activeReferrals.map((x) => {
                        if (x.id === eventParsed.data.crewMemberId) {
                            return { ...x, active: false };
                        }
                        return x;
                    });

                    setReferrals({
                        ...referrals,
                        totalActiveReferrals,
                        activeReferrals: referralsUpdated,
                    });
                }
                break;
            case WebsocketEventNames.MINING_STATUS_USER_UPDATE:
                setTotalBonusTimeMs(eventParsed.data.totalTimeBonusMs);
                break;
            default:
                console.warn('Unknown event', eventParsed);
        }
    }, []);
}
