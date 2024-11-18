import React, {useState} from "react";
import {STEPS} from "../../../data/constants.ts";
import {useRecoilState, useSetRecoilState} from "recoil";
import {CharacterSelectFinishedAtom, SelectedGLBIndexAtom} from "../../../store/PlayersAtom.ts";
import {socket} from "../../../sockets/clientSocket.ts";
import styled from "styled-components";
import {isValidText} from "../../../utils/utils.ts";
import {GlobalFontHakgyoansimDunggeunmiso, GlobalFontSubakYang} from "../../../utils/fontSetting.ts";
import MainCanvas from "../canvas/MainCanvas.tsx";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 100%;
    background-color: #007355;
`;

const Title = styled.div`
    font-family: 'HakgyoansimDunggeunmisoTTF-B', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color:#cccccc;
`;


const CharacterCanvasContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 1200px;
    height: 80%;
`;

const CharacterTuningWrapper = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const CharacterCanvasWrapper = styled.div`
    flex: 2;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Input = styled.input`
    font-size: 24px;
    border: none;
    outline: none;
    padding: 12px 10px;
    border-radius: 8px;
    width: 280px;
    font-family: 'RixXladywatermelonR', sans-serif;
`;

const Button = styled.button`
    font-family: 'HakgyoansimDunggeunmisoTTF-B', sans-serif;
    padding: 10px;
    width: 200px;
    font-size: 18px;
    border-radius: 8px;
    border: none;
    outline: none;
    font-weight: 800;
    transition-duration: 0.2s;

    &.valid {
        color: white;
        cursor: pointer;

        &:hover {
            color: white;
        }
    }

    &.disabled {
        background-color: #007355;
        color: #ededed;
        cursor: not-allowed;
    }
`
const NextBtn = styled(Button)`
    &.valid {
        background-color: #ebb9af;

        &:hover {
            background-color: #efc4bb;
        }
    }
`;

const PrevBtn = styled(Button)`
    &.valid {
        background-color: #cccccc;

        &:hover {
            background-color: #aaaaaa;
        }
    }
`;

const SwitchBtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 70px;
    width: 150px;
    gap: 15px;
`;
const SwitchCharacterPrevBtn = styled(Button)`
    background-image: url("/images/buttonPrev.png");
    background-size: contain;
    background-position: center;
    height: 60px;
    width: 60px;

    &:hover {
        cursor: pointer;
    }

    &:active {
        transform: scale(0.90);
    }

`

const SwitchCharacterNextBtn = styled(Button)`
    background-image: url("/images/buttonNext.png");
    background-size: contain;
    background-position: center;
    height: 60px;
    width: 60px;

    &:hover {
        cursor: pointer;
    }

    &:active {
        transform: scale(0.90);
    }

`

const Lobby = () => {
    const [currentStep, setCurrentStep] = useState(STEPS.NICK_NAME);
    const [tmpNickname, setTmpNickname] = useState<string | undefined>();
    const [tmpJobPosition, setTmpJobPosition] = useState<string | undefined>();

    const [selectedGLBIndex, setSelectedGLBIndex] = useRecoilState(SelectedGLBIndexAtom);
    const setCharacterSelectFinished = useSetRecoilState(CharacterSelectFinishedAtom);

    if (!socket) return null;
    return (
        <Container>
            <GlobalFontHakgyoansimDunggeunmiso/>
            <GlobalFontSubakYang/>
            {currentStep === STEPS.NICK_NAME && (
                <>
                    <Title>그리디에서 사용할 내 이름이에요.</Title>
                    <Input autoFocus
                           placeholder="별명을 입력해주세요."
                           value={tmpNickname ?? ""}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               setTmpNickname(e.currentTarget.value);
                           }}
                           onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                               if (!tmpNickname || !isValidText(tmpNickname)) return;
                               if (e.key == "Enter") {
                                   setCurrentStep(STEPS.JOB_POSITION);
                               }
                           }}
                    />
                    <NextBtn
                        disabled={!tmpNickname || !isValidText(tmpNickname)}
                        className={isValidText(tmpNickname ?? "") ? "valid" : "disabled"}
                        onClick={() => {
                            setCurrentStep((prev: number) => prev + 1);
                        }}>
                        다음으로
                    </NextBtn>
                </>
            )}

            {currentStep === STEPS.JOB_POSITION && (
                <Container>
                    <Title> 그리디에서 공유할 내 직군이에요.</Title>
                    <Input autoFocus
                           placeholder="개발 직군을 입력해주세요."
                           value={tmpJobPosition ?? ""}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               setTmpJobPosition(e.currentTarget.value);
                           }}
                           onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                               if (!tmpJobPosition || !isValidText(tmpJobPosition)) return;
                               if (e.key == "Enter") {
                                   setCurrentStep((prev: number) => prev + 1);
                               }
                           }}
                    />
                    <NextBtn
                        disabled={!tmpJobPosition || !isValidText(tmpJobPosition)}
                        className={isValidText(tmpJobPosition ?? "") ? "valid" : "disabled"}
                        onClick={(): void => {
                            setCurrentStep((prev: number) => prev + 1);
                        }}
                    >
                        다음으로
                    </NextBtn>
                    <PrevBtn
                        className={"valid"}
                        onClick={(): void => {
                            setCurrentStep((prev: number) => prev - 1);
                        }}>
                        이전으로
                    </PrevBtn>
                </Container>
            )}

            {currentStep === STEPS.CHARACTER && (
                <>
                    <Title>그리디에서 사용할 내 아바타를 고를 시간이에요.</Title>
                    <CharacterCanvasContainer>
                        <CharacterTuningWrapper>
                            <CharacterCanvasWrapper>
                                <MainCanvas/>
                            </CharacterCanvasWrapper>
                        </CharacterTuningWrapper>
                        <NextBtn
                            className={(tmpNickname && tmpJobPosition) ? "valid" : "disabled"}
                            onClick={(): void => {
                                if (!tmpNickname || !tmpJobPosition) return;
                                socket.emit('initialize', {
                                    tmpNickname: tmpNickname,
                                    tmpJobPosition: tmpJobPosition,
                                    selectedGLBIndex: selectedGLBIndex,
                                    myRoom: {object: []}
                                })
                                setCharacterSelectFinished(true);
                            }}
                            onKeyUp={(e): void => {
                                if (!tmpNickname || !tmpJobPosition) return;
                                if (e.key == "Enter") {
                                    socket.emit('initialize', {
                                        tmpNickname: tmpNickname,
                                        tmpJobPosition: tmpJobPosition,
                                        selectedGLBIndex: selectedGLBIndex,
                                        myRoom: {object: []}
                                    });
                                    setCharacterSelectFinished(true);
                                }
                            }}
                        >
                            이 모습으로 진행할래요
                        </NextBtn>
                        <SwitchBtnWrapper>
                            <SwitchCharacterPrevBtn
                                onClick={()=>{
                                    if(selectedGLBIndex === 0) return;
                                    setSelectedGLBIndex(prev => prev-1);
                                }}
                            />
                            <SwitchCharacterNextBtn
                                onClick={()=>{
                                    if(selectedGLBIndex === 2) return;
                                    setSelectedGLBIndex(prev => prev+1);
                                }}
                            />
                        </SwitchBtnWrapper>

                        <PrevBtn
                            className={"valid"}
                            onClick={(): void => {
                                setCurrentStep((prev: number) => prev - 1);
                            }}>
                            이전으로
                        </PrevBtn>
                    </CharacterCanvasContainer>
                </>
            )}

            {currentStep === STEPS.FINISH && (
                <>
                </>
            )}
        </Container>
    );
};

export default Lobby;