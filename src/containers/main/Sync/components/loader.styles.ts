import styled, { keyframes } from 'styled-components';

const animateGlitch = keyframes`
    0%   { clip-path: inset(20% 0 50% 0); }
    5%   { clip-path: inset(10% 0 60% 0); }
    10%  { clip-path: inset(15% 0 55% 0); }
    15%  { clip-path: inset(25% 0 35% 0); }
    20%  { clip-path: inset(30% 0 40% 0); }
    25%  { clip-path: inset(40% 0 20% 0); }
    30%  { clip-path: inset(10% 0 60% 0); }
    35%  { clip-path: inset(15% 0 55% 0); }
    40%  { clip-path: inset(25% 0 35% 0); }
    45%  { clip-path: inset(30% 0 40% 0); }
    50%  { clip-path: inset(20% 0 50% 0); }
    55%  { clip-path: inset(10% 0 60% 0); }
    60%  { clip-path: inset(15% 0 55% 0); }
    65%  { clip-path: inset(25% 0 35% 0); }
    70%  { clip-path: inset(30% 0 40% 0); }
    75%  { clip-path: inset(40% 0 20% 0); }
    80%  { clip-path: inset(20% 0 50% 0); }
    85%  { clip-path: inset(10% 0 60% 0); }
    90%  { clip-path: inset(15% 0 55% 0); }
    95%  { clip-path: inset(25% 0 35% 0); }
    100% { clip-path: inset(30% 0 40% 0); }
`;
export const GlitchWrapper = styled.div`
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: clamp(1.2rem, 7vw, 6rem);
    white-space: nowrap;
    font-weight: 900;
    position: relative;
    margin: 0 auto;
    user-select: none;
    cursor: pointer;
    padding: 10px;

    &::after,
    &::before {
        content: attr(data-text);
        padding: 10px;
        position: absolute;
        top: 0;
        color: ${({ theme }) => theme.palette.text.primary};
        background-color: ${({ theme }) => theme.palette.text.contrast};
        overflow: hidden;
        clip-path: inset(0 0 0 0);
    }

    &::after {
        left: 10px;
        text-shadow: -3px 0 #9f42ff;
        animation: ${animateGlitch} 9.8s infinite linear alternate-reverse;
    }

    &::before {
        left: -5px;
        text-shadow: 3px 0 #c9eb00;
        animation: ${animateGlitch} 9s infinite linear alternate-reverse;
    }
`;
