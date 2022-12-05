import Meme from "./components/Meme";
import "./App.css";
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Meme />
      </header>
    </div>
  );
}

export default App;
