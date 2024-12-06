/* eslint-disable i18next/no-literal-string */
import { setAnimationState } from '@app/visuals.ts';
import { Button, ButtonGroup, CategoryLabel, CategoryWrapper } from '../styles';
import { GlAppState } from '@app/glApp';
import { Typography } from '@app/components/elements/Typography.tsx';
import { useEffect, useState } from 'react';

export function AnimationGroup() {
    const glApp = window.glApp;
    const [currentState, setCurrentState] = useState(glApp.stateManager.status);
    const [currentResult, setCurrentResult] = useState(glApp.stateManager.result);

    function handleAnimation(state: GlAppState) {
        console.debug(`changed to= ${state}`);
        setAnimationState(state);
    }

    console.debug(glApp.stateManager);

    useEffect(() => {
        console.debug(`status= ${glApp.stateManager.status}`);
        console.debug(`result= ${glApp.stateManager.result}`);
        setCurrentState(glApp.stateManager.status);
        setCurrentResult(glApp.stateManager.result);
    }, [glApp.stateManager]);

    return (
        <CategoryWrapper>
            <CategoryLabel>Animations</CategoryLabel>
            <Typography variant="p">Current state: {currentState}</Typography>
            <Typography variant="p">Current res: {currentResult}</Typography>
            <ButtonGroup>
                <Button onClick={() => handleAnimation('start')}>Start</Button>
                <Button onClick={() => handleAnimation('stop')}>Stop</Button>
                <Button onClick={() => handleAnimation('fail')}>Fail</Button>
                <Button onClick={() => handleAnimation('success')}>Success</Button>
                <Button onClick={() => handleAnimation('success2')}>Success 2</Button>
                <Button onClick={() => handleAnimation('success3')}>Success 3</Button>
            </ButtonGroup>
        </CategoryWrapper>
    );
}
