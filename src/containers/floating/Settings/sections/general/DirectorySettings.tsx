import { Typography } from '@app/components/elements/Typography.tsx';
import {
    SettingsGroupContent,
    SettingsGroupTitle,
    SettingsGroupWrapper,
} from '../../components/SettingsGroup.styles.ts';
import FolderSelector from '../../components/FolderSelector.tsx';

export default function DirectorySettings() {

    return (
        <SettingsGroupWrapper>
            <SettingsGroupTitle>
                <Typography variant="h6">{`App directories`}</Typography>
            </SettingsGroupTitle>

            <SettingsGroupContent>
                <FolderSelector />
            </SettingsGroupContent>
        </SettingsGroupWrapper>
    );
}
