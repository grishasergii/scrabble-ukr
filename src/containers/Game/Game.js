import React, {Component} from 'react';
import Board from '../../components/Board/Board';
import Rack from '../../components/Board/Rack/Rack';
import GameControls from '../../components/GameControls/GameControls';
import SwapLetters from '../SwapLetters/SwapLetters';
import Modal from '../../components/UI/Modal/Modal';

class Game extends Component {
  
  state = {
    boardSize: 15,
    bagOfLetters: [
      ...Array(5).fill({letter: 'A', value: 1}),
      ...Array(2).fill({letter: 'B', value: 1}),
      ...Array(2).fill({letter: 'C', value: 1}),
    ],
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
    squaresWithPlacedLettersIndices: new Set([]),
    playerRack: [
      { letter: 'A', value: '1' },
      { letter: 'B', value: '1' },
      { letter: 'C', value: '4' },
      { letter: 'D', value: '1' },
      { letter: 'E', value: '1' },
      { letter: 'F', value: '1' },
      { letter: 'G', value: '4' },
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
    // TODO this is too complicated, should be refactored
    this.setState((prevState) => {
      const updatedPlayerRack = prevState.playerRack.map(
        l => {
          if (l === null || l===undefined) {
            return null;
          }
          return {
            ...l,
            selected: false
          };
        }
      );
      const updatedSquares = prevState.squares.map(sq => {
        if (sq.letter === null || sq.letter === undefined) {
          return sq;
        }
        return {
          ...sq,
          letter: {
            ...sq.letter,
            selected: false
          }
        };
      });

      switch (selectedFrom) {
        case 'playerRack':
          updatedPlayerRack[index].selected = true;
          break;
        case 'board':
          updatedSquares[index].letter = {
            ...updatedSquares[index].letter,
            selected: true
          };
          break;
      }

      return {
      playerRack: updatedPlayerRack,
      squares: updatedSquares,
      selectedLetter: {
        letter: letter,
        index: index,
        selectedFrom: selectedFrom
      }};
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

      const updatedSquaresWithPlacedLettersIndices = new Set(prevState.squaresWithPlacedLettersIndices);
      updatedSquaresWithPlacedLettersIndices.add(squareIndex);

      switch (prevState.selectedLetter.selectedFrom) {
        case 'playerRack':
          updatedPlayerRack[prevState.selectedLetter.index] = null;
          break;
        case 'board':
          updatedSquares[prevState.selectedLetter.index].letter = null;
          updatedSquaresWithPlacedLettersIndices.delete(prevState.selectedLetter.index);
          break;
        default:
          break;
      }

      return {
        squares: updatedSquares,
        selectedLetter: null,
        playerRack: updatedPlayerRack,
        squaresWithPlacedLettersIndices: updatedSquaresWithPlacedLettersIndices
      };
    });
  }

  returnPlacedLettersToRackHandler = () => {
    this.setState((prevState) => {
      const updatedSquares = [...prevState.squares];
      const updatedPlayerRack = [...prevState.playerRack];

      let playerRackLetterIndex = 0;
      const playerRackLength = updatedPlayerRack.length;

      for (let index of prevState.squaresWithPlacedLettersIndices) {
        while (updatedPlayerRack[playerRackLetterIndex] !== null && playerRackLetterIndex < playerRackLength) {
          playerRackLetterIndex = playerRackLetterIndex + 1;
        }
        updatedPlayerRack[playerRackLetterIndex] = {
          ...updatedSquares[index].letter, 
          selected: false
        };
        updatedSquares[index].letter = null;
      }

      return {
        squares: updatedSquares,
        playerRack: updatedPlayerRack,
        squaresWithPlacedLettersIndices: new Set([])
      }
    });
  }

  swapLettersHandler = (indices) => {
    this.setState((prevState) => {

      const updatedPlayerRack = [...prevState.playerRack];

      const numNewLetters = Math.min(indices.size, prevState.bagOfLetters.length);
      const shuffledBagOfLetters = prevState.bagOfLetters.sort(() => 0.5 - Math.random());
      const selectedLetters = shuffledBagOfLetters.slice(0, numNewLetters);
      const updatedBagOfLetters = shuffledBagOfLetters.slice(numNewLetters, shuffledBagOfLetters.length);

      for (let i of Array.from(indices).slice(0, numNewLetters)) {
        updatedBagOfLetters.push(updatedPlayerRack[i]);
        updatedPlayerRack[i] = selectedLetters.pop();
      }

      return {
        showSwapLetters: false,
        playerRack: updatedPlayerRack,
        bagOfLetters: updatedBagOfLetters
      }
    });
  }
  
  startSwapLettersHandler = () => {
    this.setState({
      showSwapLetters: true
    });
  }

  playTurnHandler = () => {
    this.setState((prevState) => {
      const placedIndices = [...prevState.squaresWithPlacedLettersIndices].sort();
      const boardSize = prevState.boardSize;

      if (placedIndices.length === 0) {
        alert('Place some letters!');
        return;
      }

      // are all letters in the same row or column?
      const rows = new Set([]);
      const cols = new Set([]);
      placedIndices.map(i => {
        const col = i % boardSize;
        const row = Math.floor(i / boardSize);
        rows.add(row);
        cols.add(col);
      });

      if (rows.size > 1 && cols.size > 1) {
        alert('Not ok: All letters must be placed in the same row or column');
        return;
      }

      // do all placed letters form a continious sequence?
      let step = 0;
      let stepAllWords = 0;
      if (rows.size === 1) {
        step = 1;
        stepAllWords = boardSize;
      }
      if (cols.size === 1) {
        step = boardSize;
        stepAllWords = 1;
      }

      let index = placedIndices[0];
      let wordLength = 0;
      while (true) {
        if (prevState.squares[index].letter === null || prevState.squares[index].letter === undefined) {
          break;
        }
        wordLength = wordLength + 1;
        index = index + step;
      }

      if (wordLength < placedIndices.length) {
        alert('Not ok: there are gaps in the letter sequence!');
        return;
      }

      // get all formed words
      for (let i in placedIndices) {
        
      }

      alert('It\'s OK');

    });
  }

  render() {
    let swapLetters = null;
    if (this.state.showSwapLetters === true) {
      swapLetters = (
        <Modal>
          <SwapLetters 
            playerRack={this.state.playerRack}
            swapLettersHandler={this.swapLettersHandler}
          />
        </Modal>
      );
    }

    return(
      <div>
        {swapLetters}

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
        
        <GameControls
          clear={this.returnPlacedLettersToRackHandler}
          swap={this.startSwapLettersHandler}
          play={this.playTurnHandler} />
      </div>
    );
  }
}

export default Game;