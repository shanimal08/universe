import { Typography } from '@app/components/elements/Typography.tsx';
import {
    SettingsGroup,
    SettingsGroupContent,
    SettingsGroupTitle,
    SettingsGroupWrapper,
} from '../../components/SettingsGroup.styles.ts';
import FolderSelector from '../../components/FolderSelector.tsx';

export default function DirectorySettings() {
    return (
        <SettingsGroupWrapper>
            <SettingsGroup>
                <SettingsGroupContent>
                    <SettingsGroupTitle>
                        <Typography variant="h6">{`Node data location`}</Typography>
                    </SettingsGroupTitle>
                    <Typography variant="p">{`Changing this will require an app restart`}</Typography>
                </SettingsGroupContent>
            </SettingsGroup>
            <SettingsGroup>
                <SettingsGroupContent>
                    <FolderSelector />
                </SettingsGroupContent>
            </SettingsGroup>
        </SettingsGroupWrapper>
    );
}
