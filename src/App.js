import React, { Component } from 'react';
import './App.css';
import Game from './containers/Game/Game';
import { IntlProvider } from 'react-intl';
import messages from './messages';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'lang': 'uk'
    }
  }

  render() {
    const lang = this.state.lang;
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        <div className="App">
          <Game />        
        </div>
      </IntlProvider>
    );
  }
}

export default App;
