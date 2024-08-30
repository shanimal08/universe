import { ReactNode, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Content = styled.div`
    max-height: 90%;
    min-height: 300px;
    min-width: 640px;
    max-width: 840px;
    background-color: ${({ theme }) => theme.palette.background.paper};
    border-radius: ${({ theme }) => theme.shape.borderRadius.app};
    box-shadow: 0 4px 45px 0 rgba(0, 0, 0, 0.08);
    display: flex;
    padding: 20px;
    overflow-y: scroll;
    z-index: 1;
    position: relative;
`;
const Backdrop = styled.div`
    width: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
    height: 100%;
`;
const Wrapper = styled.div`
    width: 100vw;
    top: 0;
    left: 0;
    height: 100vh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
`;

interface Props {
    children: ReactNode;
    onClose: () => void;
    open?: boolean;
}

function ModalContent({ onClose, children }: Props) {
    const escFunction = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', escFunction, false);

        return () => {
            document.removeEventListener('keydown', escFunction, false);
        };
    }, [escFunction]);
    return (
        <Wrapper>
            <Backdrop />
            <Content>{children}</Content>
        </Wrapper>
    );
}

export default function Dialog({ onClose, children, open = false }: Props) {
    return (
        <>
            {open &&
                createPortal(
                    <ModalContent onClose={onClose} open={open}>
                        {children}
                    </ModalContent>,
                    document.body
                )}
        </>
    );
}
