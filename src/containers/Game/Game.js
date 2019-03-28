import React, {Component} from 'react';
import Board from '../../components/Board/Board';
import Rack from '../../components/Board/Rack/Rack';

class Game extends Component {
  
  state = {
    squares: [
      {bonus: '3xWS'}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
      {}, {bonus: '2xWS'}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
      {bonus: '2xLS'}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    ],
    playerRack: [
      { letter: 'A', value: '1' },
      { letter: 'E', value: '1' },
      { letter: 'V', value: '4' },
      { letter: 'A', value: '1' },
      { letter: 'A', value: '1' },
      { letter: 'A', value: '1' },
      { letter: 'B', value: '4' },
    ]
  }
  
  render() {
    return(
      <div>
        <Rack letters={this.state.playerRack} />
        <Board squares={this.state.squares}/>
        <Rack letters={this.state.playerRack} />
      </div>
    );
  }
}

export default Game;