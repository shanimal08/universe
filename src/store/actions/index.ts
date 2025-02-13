export {
    airdropSetup,
    handleAirdropLogout,
    setAirdropTokens,
    setAuthUuid,
    setBonusTiers,
    setFlareAnimationType,
    setReferralCount,
    setReferralQuestPoints,
    setUserDetails,
    setUserGems,
    setUserPoints,
} from './airdropStoreActions.ts';
export {
    fetchAppConfig,
    setAirdropTokensInConfig,
    setAllowTelemetry,
    setApplicationLanguage,
    setAudioEnabled,
    setAutoUpdate,
    setCpuMiningEnabled,
    setCustomStatsServerPort,
    setGpuMiningEnabled,
    setMineOnAppStart,
    setMode,
    setMoneroAddress,
    setMonerodConfig,
    setP2poolEnabled,
    setPreRelease,
    setShouldAlwaysUseSystemLanguage,
    setShouldAutoLaunch,
    setShowExperimentalSettings,
    setTheme,
    setUseTor,
    setVisualMode,
} from './appConfigStoreActions.ts';

export {
    fetchApplicationsVersions,
    fetchApplicationsVersionsWithRetry,
    fetchExternalDependencies,
    loadExternalDependencies,
    setCriticalError,
    setCriticalProblem,
    setError,
    setIsAppUpdateAvailable,
    setIsSettingsOpen,
    setIssueReference,
    setReleaseNotes,
    setSetupComplete,
    setSetupParams,
    setSetupProgress,
    setSetupTitle,
    updateApplicationsVersions,
} from './appStateStoreActions.ts';

export {
    changeMiningMode,
    getMaxAvailableThreads,
    pauseMining,
    restartMining,
    setCustomLevelsDialogOpen,
    setExcludedGpuDevices,
    setMiningControlsEnabled,
    setMiningNetwork,
    startMining,
    stopMining,
} from './miningStoreActions.ts';
export {
    setShowExternalDependenciesDialog,
    setUITheme,
    setDialogToShow,
    setIsWebglNotSupported,
    setAdminShow,
} from './uiStoreActions.ts';
