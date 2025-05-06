import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { LottieWrapper, Wrapper } from './styles.ts';
import { TOWER_CANVAS_ID, useConfigUIStore } from '@app/store';
import winning from './winning.json?url';
import loading from './loading.json?url';
import { HexagonSVG } from '@app/assets/icons/hexagon.tsx';

export default function Background() {
    const visualMode = useConfigUIStore((s) => s.visual_mode);
    return (
        <Wrapper $isVisualMode={visualMode}>
            <canvas id={TOWER_CANVAS_ID} />
            {/*<LottieWrapper $isVisualMode={visualMode}>*/}
            {/*    <DotLottieReact src={winning} autoplay loop />*/}
            {/*</LottieWrapper>*/}
            <HexagonSVG />
        </Wrapper>
    );
}
