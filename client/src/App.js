import './App.css'
import Main from './components/main'
import { BrowserRouter } from 'react-router-dom';

const { React, Component } = require("react");

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {
            <div>
              <Main />
            </div>
          }
        </div>
      </BrowserRouter>
    )
  }
}

export default App