import { Billboard, Text } from '@react-three/drei';
import {forwardRef} from 'react';
import { Group } from 'three';

interface NickNameBoardProps {
    text: string;
    isNpc: boolean;
}

export const NickNameBoard = forwardRef<Group,NickNameBoardProps>(({text,isNpc}, ref) => {
    return (
        <Billboard ref={ref} follow={false}>
            <Text  
                fontSize={isNpc ? 0.4 : 0.25}
                color={isNpc ?  0xff71c2 : 0x000000}
                >
                {text}
            </Text>
        </Billboard>
    );

});

NickNameBoard.displayName = 'NickNameBoard';
