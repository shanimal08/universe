import { useTranslation } from 'react-i18next';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { Typography } from '@app/components/elements/Typography';
import { SETTINGS_TYPES, SettingsType } from '../types.ts';
import { ButtonContainer, Container, LinkContainer, SectionButton, TermsBtn } from './Navigation.styles.ts';

import { open } from '@tauri-apps/plugin-shell';
interface SettingsNavigationProps {
    activeSection: SettingsType;
    onChangeActiveSection: (section: SettingsType) => void;
}
export default function SettingsNavigation({ activeSection, onChangeActiveSection }: SettingsNavigationProps) {
    const { t } = useTranslation('settings', { useSuspense: false });

    function handleClick(section: SettingsType) {
        onChangeActiveSection(section);
    }

    return (
        <Container>
            <ButtonContainer>
                {SETTINGS_TYPES.map((type: SettingsType) => {
                    const isActiveSection = activeSection === type;
                    const name = t(`tabs.${type}`);
                    return (
                        <SectionButton
                            key={type}
                            size="small"
                            onClick={() => handleClick(type)}
                            variant={isActiveSection ? 'secondary' : 'primary'}
                            disableColour
                        >
                            {name}
                        </SectionButton>
                    );
                })}
            </ButtonContainer>
            <LinkContainer>
                <TermsBtn onClick={() => open('https://www.tari.com/user_agreement/')}>
                    <Typography>{t('user-agreement')}</Typography>
                    <HiOutlineExternalLink />
                </TermsBtn>
                <TermsBtn onClick={() => open('https://github.com/tari-project/universe/blob/main/LICENSE.md')}>
                    <Typography>{t('license-agreement')}</Typography>
                    <HiOutlineExternalLink />
                </TermsBtn>
            </LinkContainer>
        </Container>
    );
}
