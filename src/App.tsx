import './App.css'
import MainCanvas from "./components/content/canvas/MainCanvas.tsx";
import {ClientSocketControls} from "./components/utilComponents/ClientSocketControls.ts";

function App() {
  ClientSocketControls();
  return (
      <>
        <MainCanvas />
      </>


  )
}

export default App
