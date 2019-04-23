import React, {Component} from 'react';
import Board from '../../components/Board/Board';
import Rack from '../../components/Board/Rack/Rack';
import GameControls from '../../components/GameControls/GameControls';
import SwapLetters from '../SwapLetters/SwapLetters';
import Modal from '../../components/UI/Modal/Modal';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import isValidWordPlacement from '../../utils/validateMove/isValidWordPlacement';
import getMoveBoardRackIndices from '../../utils/makeMove/getMoveBoardRackIndices';

class Game extends Component {
  dictionary = {
    'ab': ['ab', 'ba'],
    'br': ['br', 'rb'],
    'aert': ['tear'],
    'abc': ['cab', 'abc'],
    'act': ['cat']
  };
  
  colors = ['green', 'red', 'blue', 'purple', 'orange', 'yellow'];
  playerColor = '';
  computerColor = '';

  constructor(props) {
    super(props);

    const colorsShuffled = this.colors.sort(() => 0.5 - Math.random());
    this.playerColor = colorsShuffled.pop();
    this.computerColor = colorsShuffled.pop();

    this.state =  {
      boardSize: 15,
      bagOfLetters: [
        ...Array(5).fill({letter: 'A', value: 1}),
        ...Array(2).fill({letter: 'B', value: 1}),
        ...Array(2).fill({letter: 'C', value: 1}),
        ...Array(2).fill({letter: 'D', value: 1}),
        ...Array(2).fill({letter: 'E', value: 1}),
        ...Array(2).fill({letter: 'F', value: 1}),
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
        { letter: 'A', value: '1', color: this.playerColor },
        { letter: 'B', value: '1', color: this.playerColor },
        { letter: 'C', value: '4', color: this.playerColor },
        { letter: 'D', value: '1', color: this.playerColor },
        { letter: 'E', value: '1', color: this.playerColor },
        { letter: 'F', value: '1', color: this.playerColor },
        { letter: 'G', value: '4', color: this.playerColor },
      ],
      computerRack: [
        { letter: 'C', value: '1', color: this.computerColor },
        { letter: 'T', value: '1', color: this.computerColor },
        { letter: 'E', value: '4', color: this.computerColor },
        { letter: 'R', value: '4', color: this.computerColor },
        { letter: 'T', value: '1', color: this.computerColor },
        { letter: 'E', value: '4', color: this.computerColor },
        { letter: 'R', value: '4', color: this.computerColor },
      ],
      moveIsInvalidMessage: null,
      invalidWords: null
    };
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
        default:
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

      const updatedSquares = prevState.squares.map(x => { return {...x}; });
      updatedSquares[squareIndex].letter = prevState.selectedLetter.letter;

      const updatedPlayerRack = prevState.playerRack.map(x => {
        if (x === null) {
          return null;
        }
        return {...x};
      });

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
      const updatedSquares = prevState.squares.map(x => { return {...x}; });;
      const updatedPlayerRack = prevState.playerRack.map(x => {
        if (x === null) {
          return null;
        }
        return {...x};
      });

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

      const updatedPlayerRack = prevState.playerRack.map(x => {
        if (x === null) {
          return null;
        }
        return {...x};
      });

      const numNewLetters = Math.min(indices.size, prevState.bagOfLetters.length);
      const shuffledBagOfLetters = prevState.bagOfLetters.map(x => {return {...x};}).sort(() => 0.5 - Math.random());
      const selectedLetters = shuffledBagOfLetters.slice(0, numNewLetters);
      const updatedBagOfLetters = shuffledBagOfLetters.slice(numNewLetters, shuffledBagOfLetters.length);

      for (let i of Array.from(indices).slice(0, numNewLetters)) {
        updatedBagOfLetters.push({
          ...updatedPlayerRack[i],
          color: null
        });
        updatedPlayerRack[i] = {...selectedLetters.pop(), color: this.playerColor};
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
      const placedIndices = [...prevState.squaresWithPlacedLettersIndices].sort((a, b) => a - b);
      const boardSize = prevState.boardSize;
      const squares = prevState.squares.map(x => { return {...x}; });

      const {isValid, errorMessage} = isValidWordPlacement(squares, boardSize, placedIndices, this.dictionary);

        if (isValid === false) {
        return {
          moveIsInvalidMessage: errorMessage
        };
      }

      // mark placed letters as already played
      placedIndices.forEach(i => {
        squares[i].letter.alreadyPlayed = true;
      });

      // refill players rack
      const updatedBagOfLetters = prevState.bagOfLetters.map(x => {return {...x};}).sort(() => 0.5 - Math.random());
      const updatedPlayerRack = prevState.playerRack.map(x => {
        if (x === null) {
          return null;
        }
        return {...x};
      }).map(l => {
        if (l === null || l === undefined) {
          return {...updatedBagOfLetters.pop(), color: this.playerColor};
        }
        return l;
      });

      // calculate score

      return {
        squares: squares,
        bagOfLetters: updatedBagOfLetters,
        playerRack: updatedPlayerRack,
        squaresWithPlacedLettersIndices: new Set([])
      }
    }, () => {
      this.playComputerMove();
    });
  }

  playComputerMove = () => {
    this.setState(prevState => {
      const moveBoardRackIndices = getMoveBoardRackIndices(
        prevState.squares, 
        prevState.boardSize, 
        prevState.computerRack, 
        this.dictionary);
      
      if (moveBoardRackIndices === null) {
        alert('Computer pass!');
        return;
      }

      const updatedTiles = prevState.squares.map(x => {return {...x}});
      const updatedComputerRack = prevState.computerRack.map(x => {return {...x}});

      for (let boardRackIndex of moveBoardRackIndices) {
        updatedTiles[boardRackIndex.boardIndex].letter = {...updatedComputerRack[boardRackIndex.rackIndex], alreadyPlayed: true};
        updatedComputerRack[boardRackIndex.rackIndex] = null;
      }

      // refill computer rack

      // calculate score

      return {
        squares: updatedTiles,
        computerRack: updatedComputerRack
      }
    });
  }

  closeMoveIsInvalidMessageHandler = () => {
    this.setState({
      moveIsInvalidMessage: null
    });
  }

  closeInvalidWordsMessageHandler = () => {
    this.setState({
      invalidWords: null
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

    let moveIsInvalidMessage = null;
    if (this.state.moveIsInvalidMessage !== null) {
      moveIsInvalidMessage = (
        <ErrorMessage
          closeMessageHandler={this.closeMoveIsInvalidMessageHandler}>
          Sorry, your move is invalid: {this.state.moveIsInvalidMessage}
        </ErrorMessage>
      );
    }

    let invalidWordsMessage = null;
    if (this.state.invalidWords !== null) {
      invalidWordsMessage = (
        <ErrorMessage
          closeMessageHandler={this.closeInvalidWordsMessageHandler}>
          Ніт! Не знаю таких слів: {this.state.invalidWords}
        </ErrorMessage>
      );
    }

    return(
      <div>
        {moveIsInvalidMessage}
        {invalidWordsMessage}

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