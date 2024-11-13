import React, {useState} from "react";
import {STEPS} from "../../../data/constants.ts";
import {useRecoilState, useSetRecoilState} from "recoil";
import {CharacterSelectFinishedAtom, SelectedGLBIndexAtom} from "../../../store/PlayersAtom.ts";
import {socket} from "../../../sockets/clientSocket.ts";
import styled from "styled-components";
import {isValidText} from "../../../utils.ts";
const LoginContainer = styled.div``;

const LoginTitle = styled.div``;

const JobContainer = styled.div``;

const CharacterCanvasContainer = styled.div``;

const CharacterTuningWrapper = styled.div``;

const CharacterCanvasWrapper = styled.div``;

const Input = styled.input``;

const NextBtn = styled.button``;

const PrevBtn = styled.button``;


const Lobby = () => {
    const [currentStep, setCurrentStep] = useState(STEPS.NICK_NAME);
    const [tmpNickname, setTmpNickname] = useState<string | undefined>();
    const [tmpJobPosition, setTmpJobPosition] = useState<string | undefined>();

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
                                if(!tmpNickname || !isValidText(tmpNickname)) return;
                                if(e.key == "Enter"){
                                    setCurrentStep(STEPS.JOB_POSITION);
                                }
                           }}
                    />
                    <NextBtn
                        disabled={!tmpNickname || !isValidText(tmpNickname)}
                        onClick={()=>{
                            setCurrentStep(STEPS.JOB_POSITION);
                        }}>
                        이대로 진행할래요.
                    </NextBtn>
                </>

            )}

            {currentStep === STEPS.JOB_POSITION && (
               <JobContainer>
                    <Input autoFocus
                           placeholder="스택을 입력해주세요."
                           onChange={(e : React.ChangeEvent<HTMLInputElement>)=>{
                               setTmpJobPosition(e.currentTarget.value);
                           }}
                           onKeyUp={(e : React.KeyboardEvent<HTMLInputElement>)=>{
                                if(!tmpJobPosition || !isValidText(tmpJobPosition)) return;
                                if(e.key == "Enter"){
                                    setCurrentStep(STEPS.CHARACTER);
                                }
                           }}
                    />
                    <PrevBtn
                        onClick={()=>{
                            setCurrentStep(STEPS.NICK_NAME);
                        }}>
                        이전으로
                    </PrevBtn>
                    <NextBtn
                        disabled={!tmpJobPosition || !isValidText(tmpJobPosition)}
                        onClick={()=>{
                            setCurrentStep(STEPS.CHARACTER);
                        }}
                    >
                        다음으로
                    </NextBtn>
               </JobContainer>
            )}

            {currentStep === STEPS.CHARACTER && (
                <CharacterCanvasContainer>
                    <CharacterCanvasWrapper>
                        CharacterCanvasWrapper
                    </CharacterCanvasWrapper>
                    <CharacterTuningWrapper>
                        CharacterTuningWrapper
                    </CharacterTuningWrapper>
                    <PrevBtn
                        onClick={()=>{
                            setCurrentStep(STEPS.JOB_POSITION);
                        }}>
                        이전으로
                    </PrevBtn>
                    <NextBtn
                        onClick={()=>{
                            setCurrentStep(STEPS.FINISH);
                        }}
                    >
                        다음으로
                    </NextBtn>
                </CharacterCanvasContainer>
            )}

            {currentStep === STEPS.FINISH && (
                <>
                </>
            )}
        </LoginContainer>
    );
};

export default Lobby;