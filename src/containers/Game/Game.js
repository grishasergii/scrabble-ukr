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
    selectedLetter: null,
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

  selectLetterHandler = (letter) => {
    this.setState({
      selectedLetter: letter
    });
  }

  placeLetterOnBoardHandler = (squareIndex) => {
    this.setState((prevState) => {
      if (prevState.selectedLetter === null) {
        return;
      }
      const updatedSquares = [...prevState.squares];
      updatedSquares[squareIndex].letter = prevState.selectedLetter;
      return {
        squares: updatedSquares,
        selectedLetter: null
      };
    });
  }
  
  render() {
    return(
      <div>
        <Rack letterClick={this.selectLetterHandler} letters={this.state.playerRack} />
        <Board squareClick={this.placeLetterOnBoardHandler} squares={this.state.squares}/>
        <Rack letterClick={this.selectLetterHandler} letters={this.state.playerRack} />
      </div>
    );
  }
}

export default Game;