import { useShellOfSecretsStore } from '@app/store/useShellOfSecretsStore';
import { WebsocketEventNames, WebsocketUserEvent } from '@app/types/ws';
import { setFlareAnimationType, setUserGems } from '@app/store';

const setTotalBonusTimeMs = useShellOfSecretsStore.getState().setTotalBonusTimeMs;
const referrals = useShellOfSecretsStore.getState().referrals;
const setReferrals = useShellOfSecretsStore.getState().setReferrals;

export const handleWsUserIdEvent = (event: string) => {
    console.debug(`handshake event= `, event);
    const eventParsed = JSON.parse(event) as WebsocketUserEvent;
    console.debug(`eventParsed= `, eventParsed);
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
            console.debug('Unknown event', eventParsed);
    }
};
