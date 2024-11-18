import './App.css'
import {ClientSocketControls} from "./components/utilComponents/ClientSocketControls.ts";
import {RecoilRoot} from "recoil";
import {Content} from "./components/content/Content.tsx";

function App() {
  ClientSocketControls();
  return (
      <RecoilRoot>
        <Content/>
      </RecoilRoot>


  )
}

export default App
