import React, { Component } from 'react';
import './App.css';
import Game from './containers/Game/Game';
import { IntlProvider } from 'react-intl';
import messages from './messages';
import ToggleButton from './components/UI/ToggleButton/ToggleButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'lang': 'uk'
    }
  }

  toggleLangHandler = () => {
    this.setState(prevState => {
      if (prevState.lang === 'en') {
        return {lang: 'uk'};
      }

      return {'lang': 'en'};
    });
  }

  render() {
    const lang = this.state.lang;
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        <div className="App">
          
          <Game />     



          <ToggleButton 
            handler={this.toggleLangHandler}
            isToggleOn={true}
            captionOn='in English'
            captionOff='Українською'
          />
   
        </div>
      </IntlProvider>
    );
  }
}

export default App;
