import "./App.css";
import Table from "./components/DataTable";

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1 style={{
          textAlign:'center',
          margin:'1rem 0rem',
        }}>Table data fetched using AXIOS</h1>
        <Table />
      </div>
    </div>
  );
}

export default App;
