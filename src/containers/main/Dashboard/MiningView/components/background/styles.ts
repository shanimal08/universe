import styled, { css } from 'styled-components';
import { convertHexToRGBA } from '@app/utils';

export const Wrapper = styled.div<{ $isVisualMode?: boolean }>`
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 0;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    right: 0;
`;

export const Grid = styled.div`
    position: relative;
    display: grid;
    place-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 10px;
    width: 100%;
    height: 100%;
`;

export const Row = styled.div<{ $placement: 'top' | 'middle' | 'bottom' }>`
    display: flex;
    color: ${({ theme }) => convertHexToRGBA(theme.palette.contrast, 0.1)};
    position: absolute;
    justify-content: center;
    align-items: center;

    svg {
        display: flex;
        height: 100%;
    }

    ${({ $placement }) => {
        switch ($placement) {
            case 'top':
                return css`
                    top: 33%;
                    transform: translateY(-83%);
                `;
            case 'bottom':
                return css`
                    bottom: 33%;
                    transform: translateY(83%);
                `;
            case 'middle':
            default:
                return css`
                    top: 50%;
                    transform: translateY(-50%);
                    opacity: 1;
                `;
        }
    }}
`;

export const CenterHex = styled.div`
    position: absolute;
    display: flex;
    padding: 10px;
    max-width: 100%;
`;

export const LottieWrapper = styled.div`
    display: flex;
`;
