import styled, { css } from 'styled-components';

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
    flex-direction: column;
    justify-content: stretch;
    display: flex;
    width: 100%;
    height: 100%;
`;

export const Row = styled.div<{ $placement: 'top' | 'middle' | 'bottom' }>`
    display: flex;
    color: #dfdfdf;
    position: absolute;
    justify-content: center;
    align-items: center;
    height: 33%;
    width: 100%;
    gap: 40px;

    svg {
        display: flex;
        max-height: 100%;
        border: 1px solid rgba(255, 128, 46, 0.7);
        max-width: 100%;
    }

    ${({ $placement }) => {
        switch ($placement) {
            case 'top':
                return css`
                    top: 33%;
                    transform: translateY(-83%);
                    border: 1px solid green;
                `;
            case 'bottom':
                return css`
                    bottom: 33%;
                    border: 1px solid blue;
                    transform: translateY(83%);
                `;
            case 'middle':
            default:
                return css`
                    top: 50%;
                    transform: translateY(-50%);
                    border: 1px solid deeppink;
                `;
        }
    }}
`;
