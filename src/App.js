import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      timer: 5 * 60,
      gameOver: false,
      gameSubmitted: false,
    };
  }

  componentDidMount() {
    this.initializeGame();
    this.timerInterval = setInterval(this.updateTimer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  initializeGame = () => {
    const myString =
      "We design and develop applications that run the world and showcase the future";

    const gameString =
      "W  d s g   n  develop a    ca      tha  r n th  w r d an  sho c se the futu  ";
    let array = myString.split(' ');
    let columns = 17;
    const blocks = [];
    let x = 0;
    let cnt = 0;
    let len = myString.length;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < columns; col++) {
        if (myString.charAt(cnt) === ' ' || cnt + 1 > len) {
          blocks.push({
            id: row * columns + col + 1,
            letter: ' ',
            originalLetter: '',
            isEditable: false,
          });
        } else {
          if (gameString.charAt(cnt) === ' ') {
            blocks.push({
              id: row * columns + col + 1,
              letter: '',
              originalLetter: myString.charAt(cnt).toUpperCase(),
              isEditable: true,
            });
          } else {
            blocks.push({
              id: row * columns + col + 1,
              letter: gameString.charAt(cnt).toUpperCase(),
              originalLetter: myString.charAt(cnt).toUpperCase(),
              isEditable: false,
            });
          }
        }
        cnt++;
      }
    }
    this.setState({ blocks });
  };

  updateTimer = () => {
    if (this.state.timer === 0 || this.state.gameSubmitted) {
      this.setState({ gameOver: true });
      clearInterval(this.timerInterval);
    } else {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }
  };

  editable = (blockId) => {
    const blocks = this.state.blocks.map((block) =>
      block.id === blockId
        ? { ...block, letter: '', isEditable: true }
        : block
    );
    this.setState({ blocks });
  };

  handleBlockClick = (blockId, enteredLetter, original) => {
    if (this.state.gameOver || this.state.gameSubmitted) return;

    const blocks = this.state.blocks.map((block) =>
      block.id === blockId
        ? { ...block, letter: enteredLetter, originalLetter: original, isEditable: false }
        : block
    );

    this.setState({ blocks });

    const nextEditableBlock = blocks.find(
      (block) => block.isEditable && block.letter === ''
    );

    if (nextEditableBlock) {
      nextEditableBlock.ref.focus();
    }
  };

  handleSubmitGame = () => {
    if (this.state.gameOver || this.state.gameSubmitted) return;
    const filteredBlocks = this.state.blocks.filter((block) => block.letter !== ' ');
    const isWinner = filteredBlocks.every((block) =>
      block.letter.toUpperCase() === block.originalLetter.toUpperCase()
    );

    this.setState({ gameSubmitted: true, isWinner });
  };

  render() {
    return (
      <div className="App">
        <header className="Header">
          <h1>userfacet</h1>
          <div className="Timer">
            Time Left: <br></br>{Math.floor(this.state.timer / 60)} min {this.state.timer % 60} sec
          </div>
        </header>
        <div className="BlockText">
          <p>USERFACET STATEMENT: <br /><br />We design and develop applications that run the world and showcase the future</p>
        </div>
        <div className="Blocks">
          {this.state.blocks.map((block) => (
            <input
              key={block.id}
              className={`Block ${block.isEditable ? 'Editable' : 'Uneditable'} ${
                block.letter === block.originalLetter
                  ? 'Correct'
                  : block.letter === ' '
                  ? 'default'
                  : block.letter === ''
                  ? 'Empty'
                  : 'Incorrect'
              }`}
              type="text"
              maxLength="1"
              value={block.letter}
              readOnly={!block.isEditable}
              onClick={(e) => this.editable(block.id)}
              onChange={(e) =>
                this.handleBlockClick(block.id, e.target.value.toUpperCase(), block.originalLetter)
              }
              ref={(input) => {
                block.ref = input;
              }}
            />
          ))}
        </div>
        <div className="SubmitButtonWrapper">
          <button
            className="SubmitButton"
            onClick={this.handleSubmitGame}
            disabled={this.state.gameOver || this.state.gameSubmitted}
          >
            Submit
          </button>
        </div>
        {this.state.gameSubmitted && (
          <div className={`Result ${this.state.isWinner ? 'Winner' : 'Loser'}`}>
            {this.state.isWinner ? 'You Win!' : 'You Lose!'}
          </div>
        )}
      </div>
    );
  }
}

export default App;
