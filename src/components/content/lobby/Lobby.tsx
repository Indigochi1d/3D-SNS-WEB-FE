import React, {ChangeEvent, useState} from "react";
import {STEPS} from "../../../data/constants.ts";
import {useRecoilState, useSetRecoilState} from "recoil";
import {CharacterSelectFinishedAtom, SelectedGLBIndexAtom} from "../../../store/PlayersAtom.ts";
import {socket} from "../../../sockets/clientSocket.ts";
import styled from "styled-components";
import {isValidText} from "../../../utils.ts";
const LoginContainer = styled.div``;

const LoginTitle = styled.div``;

const CharacterCanvasContainer = styled.div``;

const CharacterTuningWrapper = styled.div``;

const CharacterCanvasWrapper = styled.div``;

const Input = styled.input``;

const NextBtn = styled.button``;

const PrevBtn = styled.button``;


const Lobby = () => {
    const [currentStep, setCurrentStep] = useState(STEPS.NICK_NAME);
    const [tmpNickname, setTmpNickname] = useState<string | undefined>("");
    const [tmpJobPosition, setTmpJobPosition] = useState();

    const [selectedGLBIndex,setSelectedGLBIndex] = useRecoilState(SelectedGLBIndexAtom);
    const setCharacterSeletFinshed = useSetRecoilState(CharacterSelectFinishedAtom);

    if(!socket) return null;
    return (
        <LoginContainer>
            {currentStep === STEPS.NICK_NAME && (
                <>
                    <LoginTitle>그리디에서 사용할 내 이름이에요.</LoginTitle>
                    <Input autoFocus
                           placeholder="별명을 입력해주세요."
                           onChange={(e : React.ChangeEvent<HTMLInputElement>)=>{
                               setTmpNickname(e.currentTarget.value);
                           }}
                           onKeyUp={(e : React.KeyboardEvent<HTMLInputElement>)=>{
                                if(!isValidText(tmpNickname)) return;
                                if(e.key == "Enter"){
                                    setCurrentStep(STEPS.JOB_POSITION);
                                }
                           }}
                    />

                </>

            )}

            {currentStep === STEPS.JOB_POSITION && (
               <></>
            )}

            {currentStep === STEPS.CHARACTER && (
                <>
                </>
            )}

            {currentStep === STEPS.FINISH && (
                <>
                </>
            )}
        </LoginContainer>
    );
};

export default Lobby;