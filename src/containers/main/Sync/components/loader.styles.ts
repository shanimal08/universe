import styled from 'styled-components';
import { m } from 'motion/react';

export const CircularText = styled(m.div)`
    margin: 0 auto;
    border-radius: 50%;
    width: 160px;
    position: relative;
    height: 160px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    transform-origin: 50% 50%;
    -webkit-transform-origin: 50% 50%;
    span {
        position: absolute;
        display: inline-block;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        font-size: 18px;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        transition: all 0.5s cubic-bezier(0, 0, 0, 1);
    }
`;
