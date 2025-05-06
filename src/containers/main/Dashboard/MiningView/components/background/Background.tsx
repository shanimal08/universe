import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { HexagonSVG } from '@app/assets/icons/hexagon.tsx';
import { CenterHex, Grid, LottieWrapper, Row, Wrapper } from './styles.ts';

import winning from './winning.json?url';

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
                    <CenterHex>
                        <LottieWrapper>
                            <DotLottieReact src={winning} autoplay loop />
                        </LottieWrapper>
                    </CenterHex>
                </Row>
                <Row $placement="bottom">
                    <HexagonSVG />
                    <HexagonSVG />
                </Row>
            </Grid>
        </Wrapper>
    );
}
