import React, {Component} from 'react';
import Button from '../Button/Button';

class ToggleButton extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isToggleOn: props.isToggleOn === true
    };

    this.handlerFromProps = props.handler;
    this.captionOn = props.captionOn;
    this.captionOff = props.captionOff;
  }

  clickHandler = () => {
    this.setState((prevState) => {
      const updatedIsToggleOn = !prevState.isToggleOn;
      return {
        isToggleOn: updatedIsToggleOn
      }
    });
  }
  
  render () {
    const caption = this.state.isToggleOn === true ? this.captionOn : this.captionOff;
    const handler = () => {
      this.handlerFromProps();
      this.clickHandler();
    }
    return (
      <Button 
        clickHandler={handler}
        caption={caption}
      />
    );
  }
}

export default ToggleButton;