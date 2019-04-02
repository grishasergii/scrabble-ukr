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
    selectedLetterIndex: null,
    playerRack: [
      { letter: 'A', value: '1' },
      { letter: 'E', value: '1' },
      { letter: 'V', value: '4' },
      { letter: 'A', value: '1' },
      { letter: 'A', value: '1' },
      { letter: 'A', value: '1' },
      { letter: 'B', value: '4' },
    ],
    computerRack: [
      { letter: 'C', value: '1' },
      { letter: 'O', value: '1' },
      { letter: 'M', value: '4' },
      { letter: 'P', value: '1' },
      { letter: 'U', value: '1' },
      { letter: 'T', value: '1' },
      { letter: 'E', value: '4' },
      { letter: 'R', value: '4' },
    ],
  }

  selectLetterHandler = (letter, index, selectedFrom) => {
    this.setState({
      selectedLetter: {
        letter: letter,
        index: index,
        selectedFrom: selectedFrom
      }
    });
  }

  placeLetterOnBoardHandler = (squareIndex) => {
    this.setState((prevState) => {
      if (prevState.selectedLetter === null) {
        return;
      }

      const updatedSquares = [...prevState.squares];
      updatedSquares[squareIndex].letter = prevState.selectedLetter.letter;

      const updatedPlayerRack = [...prevState.playerRack];

      switch (prevState.selectedLetter.selectedFrom) {
        case 'playerRack':
          updatedPlayerRack[prevState.selectedLetter.index] = null;
          break;
        case 'board':
          updatedSquares[prevState.selectedLetter.index].letter = null;
          break;
        default:
          break;
      }

      return {
        squares: updatedSquares,
        selectedLetter: null,
        playerRack: updatedPlayerRack,
      };
    });
  }
  
  render() {
    return(
      <div>
        <Rack 
          letters={this.state.computerRack} 
          rackSelectable={false} />

        <Board 
          squareClick={this.placeLetterOnBoardHandler} 
          letterClick={this.selectLetterHandler} 
          squares={this.state.squares} />
          
        <Rack 
          letterClick={this.selectLetterHandler} 
          selectedFrom='playerRack' 
          letters={this.state.playerRack}
          rackSelectable={true} />
      </div>
    );
  }
}

export default Game;