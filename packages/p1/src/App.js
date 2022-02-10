import logo from './logo.svg';
import './App.css';
import Button from 'ngm-core/lib/components/Button'
// import Button from 'ngm-core/src/components/Button'
function App() {
  const onClickHandle = ( ) => {
    // const value =  (  getValue && getValue() ) || undefined
    // alert(value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div onClick={onClickHandle}>
          Edit <code>src/App.js</code> and save to reload.
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          <Button />
        </a>
      </header>
    </div>
  );
}

export default App;
