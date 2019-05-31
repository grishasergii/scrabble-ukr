import React, {Component} from 'react';
import Board from '../../components/Board/Board';
import Rack from '../../components/Board/Rack/Rack';
import GameControls from '../../components/GameControls/GameControls';
import SwapLetters from '../SwapLetters/SwapLetters';
import Modal from '../../components/UI/Modal/Modal';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import InfoMessage from '../../components/UI/InfoMessage/InfoMessage';
import getMoveBoardRackIndices from '../../utils/makeMove/getMoveBoardRackIndices';
import ComputerPlayer from '../../components/ComputerPlayer/ComputerPlayer';
import TilesLeft from '../../components/Info/TilesLeft/TilesLeft';
import PlayerMoveValidation from '../../utils/validateMove/PlayerMoveValidation';
import getDirection from '../../utils/validateMove/getDirection';
import Score from '../../components/Info/Score/Score';
import getWordsWithScore from '../../utils/score/getWordsWithScore';
import ListOfWords from '../../components/Info/ListOfWords/ListOfWords';
import ToggleButton from '../../components/UI/ToggleButton/ToggleButton';
import ButtonWithConfirm from '../ButtonWithConfirm/ButtonWithConfirm';
import styles from './Game.css';
import FlexRow from '../../components/UI/FlexRow/FlexRow';
import uuidv4 from 'uuid/v4';
import axios from '../../axios-actions';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import GameSettings from '../../components/GameSettings/GameSettings';

class Game extends Component {
  constructor(props) {
    super(props);
    this.dictionary = new Set(require('../../assets/dict_ukr.json'));
    this.playerMoveValidator = new PlayerMoveValidation();
    this.state = {
      computerRackIsVisible: false,
      ...this.getInitialGameState()};
  }

  getInitialGameState = () => {
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
      playerRack.push({...bagOfLetters.pop()});
      computerRack.push({...bagOfLetters.pop()});
    }

    const squares = Array(225).fill({});

    const bonuses = [
      {type: '3xWS', wordMultiplier: 3, letterMultiplier: 1, indices: [0, 7, 14, 105, 119, 210, 217, 224]},
      {type: '2xWS', wordMultiplier: 2, letterMultiplier: 1, indices: [16, 32, 48, 64, 28, 42, 56, 70, 196, 182, 168, 154, 208, 192, 176, 160]},
      {type: '3xLS', wordMultiplier: 1, letterMultiplier: 3, indices: [20, 24, 76, 136, 88, 148, 200, 204, 80, 84, 140, 144]},
      {type: '2xLS', wordMultiplier: 1, letterMultiplier: 2, indices: [36, 52, 38, 92, 108, 122, 102, 116, 132, 186, 172, 188, 96, 126, 98, 128, 3, 11, 45, 165, 213, 221, 59, 179]},
      {type: 'start', wordMultiplier: 2, letterMultiplier: 1, indices: [112]}
    ];

    for (const bonus of bonuses) {
      for (const i of bonus.indices) {
        squares[i] = {bonus: {type: bonus.type, wordMultiplier: bonus.wordMultiplier, letterMultiplier: bonus.letterMultiplier}};
      }
    }

    const gameId = uuidv4();

    return {
      gameId: gameId,
      boardSize: 15,
      bagOfLetters: bagOfLetters,
      squares: squares,
      selectedLetter: null,
      squaresWithPlacedLettersIndices: new Set([]),
      playerRack: playerRack,
      computerRack: computerRack,
      modalMessage: null,
      errorMessage: null,
      whoseTurn: 'player',
      lastMove: new Set([]),
      playerScore: 0,
      computerScore: 0,
      playerWords: [],
      computerWords: [],
      gameFinished: false,
      outcomeMessage: '',
      actionOrder: 0
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

      const action = {
        gameId: prevState.gameId,
        agent: 'player',
        timestamp: + new Date(),
        type: 'clear',
        actionOrder: prevState.actionOrder,
        body: {
          numberOfPlacedLetters: prevState.squaresWithPlacedLettersIndices.size
        }
      };
      
      axios.post('/game-actions.json', action)
        .then()
        .catch();

      return {
        squares: updatedSquares,
        playerRack: updatedPlayerRack,
        squaresWithPlacedLettersIndices: new Set([]),
        actionOrder: prevState.actionOrder + 1
      };
    });
  }

  refillRack = (rack, bagOfLetters) => {
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
      if (l === null) {
        return {...updatedBagOfLetters.pop()};
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
      const numNewLetters = Math.min(indices.size, prevState.bagOfLetters.length);

      if (numNewLetters === 0) {
        return {
          showSwapLetters: false
        };
      }

      const updatedPlayerRack = prevState.playerRack.map(x => {
        if (x === null) {
          return null;
        }
        return {...x};
      });
      
      const shuffledBagOfLetters = prevState.bagOfLetters.map(x => {return {...x};}).sort(() => 0.5 - Math.random());
      const selectedLetters = shuffledBagOfLetters.slice(0, numNewLetters);
      const updatedBagOfLetters = shuffledBagOfLetters.slice(numNewLetters, shuffledBagOfLetters.length);
      const discardedLetters = [];
      const newLetters = [];
      for (let i of Array.from(indices).slice(0, numNewLetters)) {
        updatedBagOfLetters.push({
          ...updatedPlayerRack[i],
        });
        discardedLetters.push(updatedPlayerRack[i]);
        updatedPlayerRack[i] = {...selectedLetters.pop()};
        newLetters.push(updatedPlayerRack[i]);
      }

      const action = {
        gameId: prevState.gameId,
        agent: 'player',
        timestamp: + new Date(),
        type: 'swap',
        actionOrder: prevState.actionOrder,
        body: {
          discardedLetters: discardedLetters,
          newLetters: newLetters
        }
      };
      
      axios.post('/game-actions.json', action)
        .then()
        .catch();

      return {
        showSwapLetters: false,
        playerRack: updatedPlayerRack,
        bagOfLetters: updatedBagOfLetters,
        whoseTurn: 'computer',
        actionOrder: prevState.actionOrder + 1
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
        const action = {
          gameId: prevState.gameId,
          agent: 'player',
          timestamp: + new Date(),
          type: 'invalidMove',
          actionOrder: prevState.actionOrder,
          body: {
            errorMessage: errorMessage
          }
        };
        
        axios.post('/game-actions.json', action)
          .then()
          .catch();

        return {
          errorMessage: errorMessage,
          actionOrder: prevState.actionOrder + 1
        };
      }

      const placedLetters = [];
      for (let i of placedIndices) {
        placedLetters.push({...JSON.parse(JSON.stringify(tiles[i])), boardIndex: i});
      }

      // calculate score
      const wordsWithScore = getWordsWithScore(tiles, placedIndices, boardSize, direction);
      let totalScore = 0;
      for (const wordScore of wordsWithScore) {
        totalScore = totalScore + wordScore.score;
      }

      // mark placed letters as already played
      placedIndices.forEach(i => {
        tiles[i].letter.alreadyPlayed = true;
      });

      // refill players rack
      const updated = this.refillRack(prevState.playerRack, prevState.bagOfLetters);

      // update game events log
      const updatedPlayerWords = [...prevState.playerWords];
      const playedWordsWithScore = [];
      for (const wordWithScore of wordsWithScore) {
        updatedPlayerWords.unshift(wordWithScore);
        playedWordsWithScore.push({
          word: wordWithScore.word,
          value: wordWithScore.score
        });
      }

      const action = {
        gameId: prevState.gameId,
        agent: 'player',
        timestamp: + new Date(),
        type: 'play',
        actionOrder: prevState.actionOrder,
        body: {
          placedLetters: placedLetters,
          words: playedWordsWithScore
        }
      };
      
      axios.post('/game-actions.json', action)
        .then()
        .catch();

      return {
        squares: tiles,
        bagOfLetters: updated.updatedBagOfLetters,
        playerRack: updated.updatedRack,
        squaresWithPlacedLettersIndices: new Set([]),
        whoseTurn: 'computer',
        lastMove: new Set(placedIndices),
        playerScore: prevState.playerScore + totalScore,
        playerWords: updatedPlayerWords,
        actionOrder: prevState.actionOrder + 1
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
        const action = {
          gameId: prevState.gameId,
          agent: 'computer',
          timestamp: + new Date(),
          type: 'pass',
          actionOrder: prevState.actionOrder
        };
        
        axios.post('/game-actions.json', action)
          .then()
          .catch();

        return {
          whoseTurn: 'player',
          modalMessage: <FormattedMessage id='computer-passed' default message='Computer passed...'/>,
          actionOrder: prevState.actionOrder + 1
        };
      }

      const updatedTiles = prevState.squares.map(x => {return {...x}});
      const updatedComputerRack = prevState.computerRack.map(x => {
        if (x === null || x === undefined) {
          return null;
        }
        return {...x};
      });

      const placedLetters = [];

      for (let boardRackIndex of moveBoardRackIndices) {
        updatedTiles[boardRackIndex.boardIndex].letter = {...updatedComputerRack[boardRackIndex.rackIndex]};
        placedLetters.push({
          ...JSON.parse(JSON.stringify(updatedTiles[boardRackIndex.boardIndex])),
          boardIndex: boardRackIndex.boardIndex
        });
        updatedComputerRack[boardRackIndex.rackIndex] = null;
      }

      // calculate score
      const placedTilesIndices = moveBoardRackIndices.map(x => x.boardIndex);
      const direction = getDirection(updatedTiles, placedTilesIndices, prevState.boardSize);
      const wordsWithScore = getWordsWithScore(updatedTiles, placedTilesIndices, prevState.boardSize, direction);
      let totalScore = 0;
      for (const wordScore of wordsWithScore) {
        totalScore = totalScore + wordScore.score;
      }

      for (let boardRackIndex of moveBoardRackIndices) {
        updatedTiles[boardRackIndex.boardIndex].letter = {...updatedTiles[boardRackIndex.boardIndex].letter, alreadyPlayed: true};
      }

      // refill computer rack
      const updated = this.refillRack(updatedComputerRack, prevState.bagOfLetters);

      // update game events log
      const updatedComputerWords = [...prevState.computerWords];
      const playedWordsWithScore = [];
      for (const wordWithScore of wordsWithScore) {
        updatedComputerWords.unshift(wordWithScore); 
        playedWordsWithScore.push({
          word: wordWithScore.word,
          score: wordWithScore.score
        });
      }

      const action = {
        gameId: prevState.gameId,
        agent: 'computer',
        timestamp: + new Date(),
        type: 'play',
        actionOrder: prevState.actionOrder,
        body: {
          placedLetters: placedLetters,
          words: playedWordsWithScore
        }
      };
      
      axios.post('/game-actions.json', action)
        .then()
        .catch();

      return {
        squares: updatedTiles,
        computerRack: updated.updatedRack,
        bagOfLetters: updated.updatedBagOfLetters,
        whoseTurn: 'player',
        lastMove: new Set(moveBoardRackIndices.map(x => x.boardIndex)),
        computerScore: prevState.computerScore + totalScore,
        computerWords: updatedComputerWords,
        actionOrder: prevState.actionOrder + 1
      };
    });
  }

  closeModalMessageHandler = () => {
    this.setState({
      modalMessage: null
    });
  }

  closeErrorMessageHandler = () => {
    this.setState({
      errorMessage: null
    });
  }

  passHandler = () => {
    this.setState(prevState => {
      const action = {
        gameId: prevState.gameId,
        agent: 'player',
        timestamp: + new Date(),
        type: 'pass',
        actionOrder: prevState.actionOrder
      };
      
      axios.post('/game-actions.json', action)
        .then()
        .catch();

      return {
        whoseTurn: 'computer',
        actionOrder: prevState.actionOrder + 1
      };
    });
  }

  toggleComputerRackHandler = () => {
    this.setState(prevState => {
      return {
        computerRackIsVisible: !prevState.computerRackIsVisible
      }
    });
  }

  restartHandler = () => {
    this.setState(prevState => {
      const action = {
        gameId: prevState.gameId,
        agent: 'player',
        timestamp: + new Date(),
        type: 'restart',
        actionOrder: prevState.actionOrder
      };
      
      axios.post('/game-actions.json', action)
        .then()
        .catch();

      return this.getInitialGameState();
    });
  }

  checkForGameEnd = () => {
    this.setState(prevState => {
      const isDefined = (x) => x !== null && x !== undefined;
      if (prevState.playerRack.some(isDefined) && prevState.computerRack.some(isDefined)) {
        return;
      }

      let playerScorePenalty = 0;
      let computerScorePenalty = 0;
      for (let i = 0; i < 7; i++) {
        if (prevState.playerRack[i] !== null && prevState.playerRack[i] !== undefined) {
          playerScorePenalty += prevState.playerRack[i].value;
        }
        if (prevState.computerRack[i] !== null && prevState.computerRack[i] !== undefined) {
          computerScorePenalty += prevState.computerRack[i].value;
        }
      }

      const updatedPlayerScore = prevState.playerScore - playerScorePenalty;
      const updatedComputerScore = prevState.computerScore - computerScorePenalty;
      
      let outcomeMessage = computerScorePenalty === 0 ? 
        this.context.intl.formatMessage({id: 'computer-has-run-out-of-tiles-the-end', defaultMessage: 'Computer has run out of tiles, game will end now.'}) :
        this.context.intl.formatMessage({id: 'you-have-run-out-of-tiles-the-end', defaultMessage: 'You have run out of tiles, game will end now.'});
      
      outcomeMessage += ' ';
      outcomeMessage += this.context.intl.formatMessage({id: 'final-scores-are', defaultMessage: 'Your final score is {playerScore}, computer final score is {computerScore}.'}, {playerScore: updatedPlayerScore, computerScore: updatedComputerScore});
      outcomeMessage += ' ';

      if (updatedComputerScore > updatedPlayerScore) {
        outcomeMessage += this.context.intl.formatMessage({id: 'computer-won', defaultMessage: 'Computer won :('});
      } else if (updatedPlayerScore > updatedComputerScore) {
        outcomeMessage += this.context.intl.formatMessage({id: 'you-won', defaultMessage: 'You won !'});
      } else {
        outcomeMessage += this.context.intl.formatMessage({id: 'it-s-a-tie', defaultMessage: 'It\'s a tie!'});
      }

      const action = {
        gameId: prevState.gameId,
        agent: 'player',
        timestamp: + new Date(),
        type: 'finalScore',
        actionOrder: prevState.actionOrder,
        body: {
          playerScore: updatedPlayerScore,
          computerSCore: updatedComputerScore
        }
      };
      
      axios.post('/game-actions.json', action)
        .then()
        .catch();
      return {
        playerScore: updatedPlayerScore,
        computerScore: updatedComputerScore,
        gameFinished: true,
        outcomeMessage: outcomeMessage
      }
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

    let modalMessage = null;
    if (this.state.modalMessage !== null) {
      modalMessage = (
        <InfoMessage
          closeMessageHandler={this.closeModalMessageHandler}>
          {this.state.modalMessage}
        </InfoMessage>
      );
    }

    let errorMessage = null;
    if (this.state.errorMessage !== null) {
      errorMessage = (
        <ErrorMessage
          closeMessageHandler={this.closeErrorMessageHandler}>
          {this.state.errorMessage}
        </ErrorMessage>
      );
    }

    let computerPlayer = null;
    if (this.state.whoseTurn === 'computer' && this.state.gameFinished === false) {
      computerPlayer = <ComputerPlayer componentDidMountHandler={() => {
        this.playComputerMove();
        this.checkForGameEnd();
      }} />
    }

    let computerRack = null;
    if (this.state.computerRackIsVisible === true) {
      computerRack = <Rack 
        letters={this.state.computerRack} 
        rackSelectable={false} />;
    }

    let gameFinished = null;
    if (this.state.gameFinished === true) {
      gameFinished = <InfoMessage 
        closeMessageHandler={this.restartHandler}>
        {this.state.outcomeMessage}
      </InfoMessage>;
    }

    return(
      <div className={styles.Container}>
        <div className={styles.Row}>
          {modalMessage}
          {errorMessage}
          {gameFinished}
          {swapLetters}

          <div className={[styles.Column, styles.Left].join(' ')}>
            <FlexRow justifyContent={'letft'}>
              <ButtonWithConfirm 
                caption={<FormattedMessage id='restart' defaultMessage='Restart' />} 
                question={<FormattedMessage id='restart-confirm' defaultMessage='Do you really want to restart?' />} 
                action={this.restartHandler}
              />
              <ToggleButton 
                handler={this.toggleComputerRackHandler}
                isToggleOn={false}
                captionOn={<FormattedMessage id='hide-computer-rack' defaultMessage="Hide computer's rack" />}
                captionOff={<FormattedMessage id='show-computers-rack' defaultMessage="Show computer\'s rack" />}
              />
            </FlexRow>
            
            {computerRack}

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
            
            <FlexRow>
              <GameControls
                enabled={this.state.whoseTurn === 'player'}
                clear={this.returnPlacedLettersToRackHandler}
                swap={this.startSwapLettersHandler}
                play={() => {
                  this.playTurnHandler();
                  this.checkForGameEnd();
                }}
                pass={() => {
                  this.returnPlacedLettersToRackHandler();
                  this.passHandler();
                }} />
              </FlexRow>
          </div>
          
          <div className={[styles.Column, styles.Right].join(' ')}>
            <Score
              playerScore={this.state.playerScore}
              computerScore={this.state.computerScore} />

            <TilesLeft
              tilesCount={this.state.bagOfLetters.length} />

            <ListOfWords 
              heading={<FormattedMessage id='computer-words' defaultMessage='Computer words' />}
              words={this.state.computerWords} />

            <ListOfWords 
              heading={<FormattedMessage id='your-words' defaultMessage='Your words' />}
              words={this.state.playerWords} />
            
            <GameSettings 
              toggleLangHandler={this.props.toggleLangHandler}/> 
          </div>

          {computerPlayer}
        </div>
      </div>
    );
  }
}

Game.contextTypes ={
  intl: PropTypes.object.isRequired
}

export default Game;