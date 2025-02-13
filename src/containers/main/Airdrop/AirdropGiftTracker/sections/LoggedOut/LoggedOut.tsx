import { GIFT_GEMS, useAirdropStore } from '@app/store/useAirdropStore';
import { ClaimButton, GemPill, Image, Title, Wrapper } from './styles';
import { useCallback, useEffect } from 'react';
import { open } from '@tauri-apps/plugin-shell';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import gemImage from '../../images/gem.png';
import { setAirdropTokens, setAuthUuid, setFlareAnimationType } from '@app/store';

export default function LoggedOut() {
    const { t } = useTranslation(['airdrop'], { useSuspense: false });
    const { referralQuestPoints, authUuid, backendInMemoryConfig } = useAirdropStore((s) => ({
        referralQuestPoints: s.referralQuestPoints,
        authUuid: s.authUuid,
        backendInMemoryConfig: s.backendInMemoryConfig,
    }));

    const handleAuth = useCallback(
        (code?: string) => {
            const token = uuidv4();
            if (backendInMemoryConfig?.airdropUrl) {
                console.debug(`setAuthUuid(token);= `, token);
                setAuthUuid(token);
                open(
                    `${backendInMemoryConfig?.airdropUrl}/auth?tauri=${token}${code ? `&universeReferral=${code}` : ''}`
                );
            }
        },

        [backendInMemoryConfig?.airdropUrl]
    );

    useEffect(() => {
        console.debug(`authUuid= `, authUuid);
        if (authUuid && backendInMemoryConfig?.airdropApiUrl) {
            const interval = setInterval(() => {
                if (authUuid) {
                    fetch(`${backendInMemoryConfig?.airdropApiUrl}/auth/get-token/${authUuid}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.debug(data);
                            if (!data.error) {
                                clearInterval(interval);
                                setAirdropTokens(data);
                                if (data.installReward) {
                                    setFlareAnimationType('FriendAccepted');
                                }
                            }
                        });
                }
            }, 1000);
            const timeout = setTimeout(
                () => {
                    clearInterval(interval);
                    setAuthUuid('');
                },
                1000 * 60 * 5
            );

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [authUuid, backendInMemoryConfig?.airdropApiUrl]);

    const gemsValue = (referralQuestPoints?.pointsForClaimingReferral || GIFT_GEMS).toLocaleString();

    return (
        <Wrapper>
            <ClaimButton onClick={() => handleAuth()}>
                <Title>{t('joinAirdrop')}</Title>

                <GemPill>
                    {gemsValue}
                    <Image src={gemImage} alt="" />
                </GemPill>
            </ClaimButton>
        </Wrapper>
    );
}
