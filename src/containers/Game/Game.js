import React, {Component} from 'react';
import Board from '../../components/Board/Board';
import Rack from '../../components/Board/Rack/Rack';
import GameControls from '../../components/GameControls/GameControls';
import SwapLetters from '../SwapLetters/SwapLetters';
import Modal from '../../components/UI/Modal/Modal';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import getMoveBoardRackIndices from '../../utils/makeMove/getMoveBoardRackIndices';
import ComputerPlayer from '../../components/ComputerPlayer/ComputerPlayer';
import TilesLeft from '../../components/Info/TilesLeft/TilesLeft';
import PlayerMoveValidation from '../../utils/validateMove/PlayerMoveValidation';
import getDirection from '../../utils/validateMove/getDirection';
import Score from '../../components/Info/Score/Score';


class Game extends Component {
  colors = ['green', 'red', 'blue'];
  playerColor = '';
  computerColor = '';

  constructor(props) {
    super(props);

    const colorsShuffled = this.colors.sort(() => 0.5 - Math.random());
    this.playerColor = colorsShuffled.pop();
    this.computerColor = colorsShuffled.pop();

    this.dictionary = new Set(require('../../assets/dict_ukr.json'));

    this.playerMoveValidator = new PlayerMoveValidation();

    // https://en.wikipedia.org/wiki/Scrabble_letter_distributions#Ukrainian
    const bagOfLetters = [
      ...Array(10).fill({letter: 'О', value: 1}),
      ...Array(8).fill({letter: 'А', value: 1}),
      ...Array(7).fill({letter: 'И', value: 1}),
      ...Array(7).fill({letter: 'Н', value: 1}),
      ...Array(4).fill({letter: 'В', value: 1}),
      ...Array(5).fill({letter: 'Е', value: 1}),
      ...Array(5).fill({letter: 'І', value: 1}),
      ...Array(5).fill({letter: 'Т', value: 1}),
      ...Array(5).fill({letter: 'Р', value: 1}),

      ...Array(4).fill({letter: 'К', value: 2}),
      ...Array(4).fill({letter: 'С', value: 2}),
      ...Array(3).fill({letter: 'Д', value: 2}),
      ...Array(3).fill({letter: 'Л', value: 2}),
      ...Array(3).fill({letter: 'М', value: 2}),
      ...Array(3).fill({letter: 'П', value: 2}),

      ...Array(3).fill({letter: 'У', value: 3}),

      ...Array(2).fill({letter: 'З', value: 4}),
      ...Array(2).fill({letter: 'Я', value: 4}),
      ...Array(2).fill({letter: 'Б', value: 4}),
      ...Array(2).fill({letter: 'Г', value: 4}),

      ...Array(1).fill({letter: 'Ч', value: 5}),
      ...Array(1).fill({letter: 'Х', value: 5}),
      ...Array(1).fill({letter: 'Й', value: 5}),
      ...Array(1).fill({letter: 'Ь', value: 5}),

      ...Array(1).fill({letter: 'Ж', value: 6}),
      ...Array(1).fill({letter: 'Ї', value: 6}),
      ...Array(1).fill({letter: 'Ц', value: 6}),
      ...Array(1).fill({letter: 'Ш', value: 6}),

      ...Array(1).fill({letter: 'Ю', value: 7}),

      ...Array(1).fill({letter: 'Є', value: 8}),
      ...Array(1).fill({letter: 'Ф', value: 8}),
      ...Array(1).fill({letter: 'Щ', value: 8}),

      ...Array(1).fill({letter: 'Ґ', value: 10}),
      ...Array(1).fill({letter: '\'', value: 10}),
    ].sort(() => 0.5 - Math.random());

    const playerRack = [];
    const computerRack = [];

    for (let i = 0; i < 7; i++) {
      playerRack.push({...bagOfLetters.pop(), color: this.playerColor});
      computerRack.push({...bagOfLetters.pop(), color: this.computerColor});
    }

    const squares = Array(225).fill({});

    const bonuses = [
      {bonus: '3xWS', indices: [0, 7, 14, 105, 119, 210, 217, 224]},
      {bonus: '2xWS', indices: [16, 32, 48, 64, 28, 42, 56, 70, 196, 182, 168, 154, 208, 192, 176, 160]},
      {bonus: '3xLS', indices: [20, 24, 76, 136, 88, 148, 200, 204, 80, 84, 140, 144]},
      {bonus: '2xLS', indices: [36, 52, 38, 92, 108, 122, 102, 116, 132, 186, 172, 188, 96, 126, 98, 128, 3, 11, 45, 165, 213, 221, 59, 179]},
      {bonus: 'start', indices: [112]}
    ];

    for (const bonus of bonuses) {
      for (const i of bonus.indices) {
        squares[i] = {bonus: bonus.bonus};
        console.log(i);
      }
    }

    this.state =  {
      boardSize: 15,
      bagOfLetters: bagOfLetters,
      squares: squares,
      selectedLetter: null,
      squaresWithPlacedLettersIndices: new Set([]),
      playerRack: playerRack,
      computerRack: computerRack,
      moveIsInvalidMessage: null,
      invalidWords: null,
      whoseTurn: 'player',
      lastMove: new Set([]),
      playerScore: 0,
      computerScore: 0
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
      };
    });
  }

  refillRack = (rack, bagOfLetters, color) => {
    let updatedRack = rack.map(x => {
      if (x === null || x === undefined) {
        return null;
      }
      return {...x};
    });

    const updatedBagOfLetters = bagOfLetters.map(x => {return {...x};});

    updatedRack = updatedRack.map(l => {
      if (updatedBagOfLetters.length === 0) {
        return l;
      }
      if (l === null || l === undefined) {
        return {...updatedBagOfLetters.pop(), color: color};
      }
      return l;
    });

    return {
      updatedRack: updatedRack,
      updatedBagOfLetters: updatedBagOfLetters
    };
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
        bagOfLetters: updatedBagOfLetters,
        whoseTurn: 'computer'
      };
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
      const tiles = prevState.squares.map(x => { return {...x}; });
      const direction = getDirection(tiles, placedIndices, boardSize);
      const {isValid, errorMessage} = this.playerMoveValidator.validate({
        tiles: tiles, 
        boardSize: boardSize, 
        placedTilesIndices: placedIndices, 
        dictionary: this.dictionary,
        direction: direction
      });

      if (isValid === false) {
        return {
          moveIsInvalidMessage: errorMessage
        };
      }

      // mark placed letters as already played
      placedIndices.forEach(i => {
        tiles[i].letter.alreadyPlayed = true;
      });

      // refill players rack
      const updated = this.refillRack(prevState.playerRack, prevState.bagOfLetters, this.playerColor);

      // calculate score

      return {
        squares: tiles,
        bagOfLetters: updated.updatedBagOfLetters,
        playerRack: updated.updatedRack,
        squaresWithPlacedLettersIndices: new Set([]),
        whoseTurn: 'computer',
        lastMove: new Set(placedIndices)
      };
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
        console.log('computer pass');
        return {
          whoseTurn: 'player'
        };
      }

      const updatedTiles = prevState.squares.map(x => {return {...x}});
      const updatedComputerRack = prevState.computerRack.map(x => {return {...x}});

      for (let boardRackIndex of moveBoardRackIndices) {
        updatedTiles[boardRackIndex.boardIndex].letter = {...updatedComputerRack[boardRackIndex.rackIndex], alreadyPlayed: true};
        updatedComputerRack[boardRackIndex.rackIndex] = null;
      }

      // refill computer rack
      const updated = this.refillRack(updatedComputerRack, prevState.bagOfLetters, this.computerColor);

      // calculate score

      return {
        squares: updatedTiles,
        computerRack: updated.updatedRack,
        bagOfLetters: updated.updatedBagOfLetters,
        whoseTurn: 'player',
        lastMove: new Set(moveBoardRackIndices.map(x => x.boardIndex))
      };
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

  passHandler = () => {
    this.setState({
      whoseTurn: 'computer'
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

    let computerPlayer = null;
    if (this.state.whoseTurn === 'computer') {
      computerPlayer = <ComputerPlayer componentDidMountHandler={this.playComputerMove} />
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
          squares={this.state.squares}
          lastMove={this.state.lastMove} />

        <Rack 
          letterClick={this.selectLetterHandler} 
          selectedFrom='playerRack' 
          letters={this.state.playerRack}
          rackSelectable={true} />
        
        <GameControls
          enabled={this.state.whoseTurn === 'player'}
          clear={this.returnPlacedLettersToRackHandler}
          swap={this.startSwapLettersHandler}
          play={this.playTurnHandler}
          pass={this.passHandler} />
        
        <Score
          playerScore={this.state.playerScore}
          computerScore={this.state.computerScore} />

        <TilesLeft
          tilesCount={this.state.bagOfLetters.length} />

        {computerPlayer}
      </div>
    );
  }
}

export default Game;