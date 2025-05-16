import { Background, DashboardContainer, DashboardContent } from '@app/theme/styles.ts';
import SidebarNavigation from '@app/containers/navigation/SidebarNavigation.tsx';
import { Dashboard } from './Dashboard';
import { useSetupStore } from '@app/store/useSetupStore.ts';
import Sync from '@app/containers/main/Sync/Sync.tsx';
import { useConfigUIStore } from '@app/store';
import Banner from '@app/containers/main/Banner/Banner.tsx';

export default function MainView() {
    const visualMode = useConfigUIStore((s) => s.visual_mode);
    const isSettingUp = useSetupStore((s) => !s.appUnlocked);

    return (
        <DashboardContainer $disableBackground={true}>
            {/*{!visualMode && !isSettingUp && <Background />}*/}
            <Banner />
            <DashboardContent>
                <SidebarNavigation />
                <Sync />
                {/*{isSettingUp ? <Sync /> : <Dashboard />}*/}
            </DashboardContent>
        </DashboardContainer>
    );
}
