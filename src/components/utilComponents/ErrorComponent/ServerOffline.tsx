import { GlobalFontHakgyoansimDunggeunmiso } from "../../../utils/fontSetting";
import styled from "styled-components";
import serverImage from "../../../data/images/serveroffline.png";

const ErrorContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    height:100%;
    width:100%;
    background-color: #2d423f;
`;

const ServerOffText = styled.p`
    color:#ffffff;
    font-family: "HakgyoansimDunggeunmiso",sans-serif;
    font-size: 50px;
    font-weight: bold;
`
const ServerOffImage = styled.img`
    width: 500px;
    height: 500px;
`

const ServerOffline = () => {
    return (
        <ErrorContainer>
            <GlobalFontHakgyoansimDunggeunmiso/>
            <ServerOffText>Server Offline...</ServerOffText>
            <ServerOffImage src={serverImage} alt="serverOff"/>
        </ErrorContainer>
    );
};

export default ServerOffline;