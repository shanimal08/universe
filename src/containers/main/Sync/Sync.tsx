import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@app/store';

import Progress from './components/Progress.tsx';
import AirdropInvite from './actions/AirdropInvite.tsx';
import AirdropLogin from './actions/AirdropLogin.tsx';
import ModeSelection from './actions/ModeSelection.tsx';
import {
    ActionContent,
    Content,
    FooterContent,
    HeaderContent,
    HeaderGraphic,
    Heading,
    SubHeading,
    Wrapper,
} from './sync.styles.ts';

import dark from '/assets/video/coinLoader.webm';

export default function Sync() {
    const { t } = useTranslation('setup-view');
    const theme = useUIStore((s) => s.theme);

    const src = useMemo(
        () =>
            theme === 'dark' ? (
                <source src={dark} type="video/webm" key="darkMode" />
            ) : (
                <source src="/assets/video/coinLoader_light.mp4" type="video/mp4" key="lightMode" />
            ),
        [theme]
    );

    return (
        <Wrapper>
            <Content>
                <HeaderContent>
                    <HeaderGraphic>
                        <video
                            key={theme}
                            playsInline
                            autoPlay
                            loop
                            muted
                            controls={false}
                            disablePictureInPicture
                            disableRemotePlayback
                        >
                            {src}
                        </video>
                    </HeaderGraphic>
                    <Heading>{t('sync.header')}</Heading>
                    <SubHeading>{t('sync.subheader')}</SubHeading>
                </HeaderContent>
                <ActionContent>
                    <AirdropLogin />
                    <ModeSelection />
                    <AirdropInvite />
                </ActionContent>
                <FooterContent>
                    <Progress />
                </FooterContent>
            </Content>
        </Wrapper>
    );
}
