import { DashboardContainer, DashboardContent } from '@app/theme/styles.ts';
import SidebarNavigation from '@app/containers/navigation/SidebarNavigation.tsx';
import { Dashboard } from './Dashboard';
import { useSetupStore } from '@app/store/useSetupStore.ts';
import Sync from '@app/containers/main/Sync/Sync.tsx';
import { useUIStore } from '@app/store';
import Banner from '@app/containers/main/Banner/Banner.tsx';

export default function MainView() {
    const showWarmup = useUIStore((s) => s.showWarmup);
    const isSettingUp = useSetupStore((s) => !s.appUnlocked);

    return (
        <DashboardContainer>
            {showWarmup && <Banner />}
            <DashboardContent>
                <SidebarNavigation />
                {isSettingUp ? <Sync /> : <Dashboard />}
            </DashboardContent>
        </DashboardContainer>
    );
}
