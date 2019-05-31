import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Rack from '../../components/Board/Rack/Rack';
import Button from '../../components/UI/Button/Button';
import styles from './SwapLetters.css';

class SwapLetters extends Component {

  state = {
    rackLetters: [...this.props.playerRack],
    selectedIndices: new Set([])
  }

  letterClickHandler = (_letter, index, _selectedFrom) => {
    this.setState((prevState) => {
      const updatedSelectedIndices = new Set(prevState.selectedIndices);

      if (updatedSelectedIndices.has(index) === true) {
        updatedSelectedIndices.delete(index);
      } else {
        updatedSelectedIndices.add(index);
      }

      const updatedRackLetters = prevState.rackLetters.map((l, index) => {
        const selected = updatedSelectedIndices.has(index) === true;
        return {
          ...l,
          selected: selected
        };
      });

      return {
        selectedIndices: updatedSelectedIndices,
        rackLetters: updatedRackLetters
      }
    });
  }

  render () {
    return (
      <Auxiliary>
        <div className={styles.SwapLetters}>
          <Rack 
            letterClick={this.letterClickHandler} 
            selectedFrom='swapLetters' 
            letters={this.state.rackLetters}
            rackSelectable={true} />

          <Button 
            clickHandler={() => this.props.swapLettersHandler(this.state.selectedIndices)}
            caption='Ok'
          />
        </div>
      </Auxiliary>
    );
  }
}

export default SwapLetters;
