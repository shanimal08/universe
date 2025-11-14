import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    position: relative;
`;

export default function FolderSelector() {
    return (
        <Wrapper>
            <div>{`this will be the file explorer thing`}</div>
        </Wrapper>
    );
}
