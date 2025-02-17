import { useAirdropTokensRefresh } from './stateHelpers/useAirdropTokensRefresh';
// import { useGetReferralQuestPoints } from './stateHelpers/useGetReferralQuestPoints';

export const useAirdropSyncState = () => {
    useAirdropTokensRefresh();
    // useGetReferralQuestPoints();
};
