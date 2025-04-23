import { useCallback, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ChatsAtom } from "../../../../../store/PlayersAtom";
import { isValidText } from "../../../../../utils/utils";
import { socket } from "../../../../../sockets/clientSocket";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ChatBox = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isChatContentOpen, setIsChatContentOpen] = useState<boolean>(false);
  const chats = useRecoilValue(ChatsAtom);
  const [tmpText, setTmpText] = useState<string>("");
  const [isChatCollapsed, setIsChatCollapsed] = useState<boolean>(true);

  const submitMessage = () => {
    if (!isValidText(tmpText)) return;

    socket.emit("newText", tmpText);
    setTmpText("");
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  };

  const handleSubmit = useCallback(() => {
    submitMessage();
  }, [submitMessage]);

  const handleSubmitEnter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        submitMessage();
      }
    },
    [submitMessage]
  );
  console.log(isChatContentOpen);
  return (
    <ChatBoxWrapper isChatCollapsed={isChatCollapsed}>
      <ChatBoxHeader>
        <ChatBoxTitle>Chatting</ChatBoxTitle>
        <ChatBoxCollapseBtn
          onClick={() => {
            setIsChatCollapsed((prev) => !prev);
          }}
        >
          {isChatCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </ChatBoxCollapseBtn>
      </ChatBoxHeader>
      {!isChatCollapsed && (
        <ChatDropdownWrapper>
          <ChatContentContainer ref={contentRef}>
            {chats?.map(
              ({ senderNickname, senderJobPosition, text }, index: number) => {
                return (
                  <ChatLine key={index}>
                    <ChatSender>{`${senderNickname}-${senderJobPosition}`}</ChatSender>
                    {" : "}
                    <ChatContent>{text}</ChatContent>
                  </ChatLine>
                );
              }
            )}
          </ChatContentContainer>
        </ChatDropdownWrapper>
      )}
      <ChatInputContainer>
        <ChatInputBox
          onClick={() => {
            setIsChatContentOpen(true);
          }}
          value={tmpText}
          onChange={(e) => {
            setTmpText(e.target.value);
          }}
          onKeyUp={handleSubmitEnter}
          placeholder="메시지 입력"
        />
        <button onClick={handleSubmit}>Send</button>
      </ChatInputContainer>
    </ChatBoxWrapper>
  );
};

const ChatBoxWrapper = styled.div<{ isChatCollapsed: boolean }>`
  position: fixed;
  right: 0;
  top: 0;
  width: 30vw;
  max-width: 400px;
  height: ${({ isChatCollapsed }) => (isChatCollapsed ? "0" : "55%")};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 8px;
  background-color: #3da57971;
  & > * {
    transition: 0.5s ease-in-out;
  }
`;

const ChatDropdownWrapper = styled.div`
  width: 100%;
  flex: 20;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid gray;
  overflow-y: hidden;
`;

const ChatBoxHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3da57971;
  border-radius: 8px 8px 0 0;
`;

const ChatBoxCollapseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background-color: #276b4f;
  color: #ececec;
  margin-right: 5px;
  &:active {
    transform: scale(0.85);
  }
`;

const ChatBoxTitle = styled.h4`
  margin: 0;
  padding: 12px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  svg {
    width: 32px;
    height: 32px;
  }
`;

const ChatContentContainer = styled.div`
  padding-left: 10px;
  font-size: 13px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  border-top: 1px solid gray;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ChatLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ChatContent = styled.div`
  max-width: 250px;
  font-size: 13px;
  font-weight: 700;
  text-shadow: #ececec;
  overflow-wrap: break-word;
`;

const ChatInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #3da57971;
  border-radius: 0 0 8px 8px;
  button {
    font-size: 18px;
    border: none;
    outline: none;
    border-radius: 8px;
    width: 60px;
    background-color: #276b4f;
    color: #f1d8f1cc;
  }
`;

const ChatSender = styled.div`
  font-size: 13px;
  font-weight: 700;
  text-shadow: 0.5px #ececec;
`;

const ChatInputBox = styled.input`
  padding: 10px;
  font-size: 15px;
  width: 100%;
  outline: none;
  border: none;
  background-color: #d3d4d49f;
`;

export default ChatBox;
