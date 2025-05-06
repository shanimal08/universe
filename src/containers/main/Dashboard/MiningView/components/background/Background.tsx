import { Grid, Row, Wrapper } from './styles.ts';
import { HexagonSVG } from '@app/assets/icons/hexagon.tsx';

export default function Background() {
    return (
        <Wrapper>
            <Grid>
                <Row $placement="top">
                    <HexagonSVG />
                    <HexagonSVG />
                </Row>
                <Row $placement="middle">
                    <HexagonSVG />
                    <HexagonSVG />
                    <HexagonSVG />
                </Row>
                <Row $placement="bottom">
                    <HexagonSVG />
                    <HexagonSVG />
                </Row>
            </Grid>
        </Wrapper>
    );
}
