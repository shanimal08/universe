import styled from 'styled-components';

export const SB_MINI_WIDTH = 78;
export const SB_WIDTH = 356;
export const SB_SPACING = 15;

export const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100vh;
    width: 100%;
    padding: 10px;
    gap: 10px;
    max-height: 100%;
`;

export const DashboardContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
`;
