import React, { Component } from 'react';
import './App.css';
import Game from './containers/Game/Game';
import { IntlProvider } from 'react-intl';
import messages from './messages';
import Button from './components/UI/Button/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'lang': 'uk'
    }
  }

  setEnglishLangHandler = () => {
    this.setState({
      'lang': 'en'
    });
  }


  setUkrainianLangHandler = () => {
    this.setState({
      'lang': 'uk'
    });
  }

  render() {
    const lang = this.state.lang;
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        <div className="App">
          <Button 
            caption='English'
            clickHandler={this.setEnglishLangHandler}
          />
          <Button 
            caption='Українською'
            clickHandler={this.setUkrainianLangHandler}
          />
          <Game />        
        </div>
      </IntlProvider>
    );
  }
}

export default App;
