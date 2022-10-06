import "./App.css";
import Card from "./Component/Card";
import Header from "./Component/Header";
import Search from "./Component/Search";

console.log(process.env,'vvvvvvvvv')

function App() {
  return (
    <div className="App">
      <Header />
      <Card />
      <Search />
    </div>
  );
}

export default App;
