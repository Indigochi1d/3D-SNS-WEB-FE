import styled from "styled-components";
import { GlobalFontHakgyoansimDunggeunmiso } from "../../../utils/fontSetting";

interface INotFound {
  serverStatus: boolean;
}

const NotFound = ({ serverStatus }: INotFound) => {
  return (
    <Page404>
      <GlobalFontHakgyoansimDunggeunmiso />
      <Container>
        <CenteredBox>
          <FourZeroFourBg />

          <ContentBox404>
            <h3>Looks like you are lost. The server might be down.</h3>
            <p>The page you are looking for is currently unavailable.</p>
            {serverStatus === true && (
              <>
                <p>The server is now available.</p>
                <RetryButton
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Try Again!
                </RetryButton>
              </>
            )}
          </ContentBox404>
        </CenteredBox>
      </Container>
    </Page404>
  );
};

const Page404 = styled.section`
  color: #000;
  padding: 40px 0;
  background: #fff;
  font-family: "HakgyoansimDunggeunmiso", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  padding: 0 20px;
`;

const CenteredBox = styled.div`
  width: 83.3333%; /* equivalent to col-sm-10 */
  margin: 0 auto; /* equivalent to col-sm-offset-1 */
  text-align: center;
`;

const FourZeroFourBg = styled.div`
  background-image: url(https://i.pinimg.com/originals/a8/12/1a/a8121abee959e18cbad25ad4046f76d8.gif);
  height: 400px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  h1 {
    font-size: 80px;
    margin: 0;
  }
`;

const ContentBox404 = styled.div`
  margin-top: -50px;

  h3 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const RetryButton = styled.button`
  color: #fff;
  padding: 10px 20px;
  background: #39ac31;
  display: inline-block;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #2d8e25;
  }
`;

export default NotFound;
