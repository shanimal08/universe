import styled from 'styled-components';
import { TOWER_CANVAS_ID } from '@app/store';

export const Wrapper = styled.div<{ $isVisualMode?: boolean }>`
    width: 100%;
    height: 100%;
    //position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 0;
`;

export const LottieWrapper = styled.div<{ $isVisualMode?: boolean }>`
    visibility: ${({ $isVisualMode }) => ($isVisualMode ? 'hidden' : 'visible')};
    display: flex;
    max-width: 350px;
`;

export const Grid = styled.div`
    display: grid;
`;
