import './App.css'
import {ClientSocketControls} from "./components/utilComponents/ClientSocketControls.tsx";
import {RecoilRoot} from "recoil";
import {Content} from "./components/content/Content.tsx";

function App() {

  return (
      <RecoilRoot>
          <ClientSocketControls />
        <Content/>
      </RecoilRoot>


  )
}

export default App
