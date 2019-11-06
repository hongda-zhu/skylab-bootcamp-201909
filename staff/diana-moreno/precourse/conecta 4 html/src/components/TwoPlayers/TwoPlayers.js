import React, { Component, Fragment } from 'react';
import '../../App.css';
import Board from '../Board/Board';
import { Link } from 'react-router-dom';


class TwoPlayers extends Component {
  state = {
    boardGame: Array(6).fill().map(()=>Array(7).fill(null)),
    color: 'red',
    player: 'Player 2',
    isWon: false,
    mode: 'twoPlayers'
  }

  // encuentra todas las posiciones vacías en la matriz
  getAllEmptyPositions() {
    let emptyPositions = [];
    this.state.boardGame.forEach((row, indexRow) => {
      row.forEach((elem, indexElem) => {
        if(!elem)
          emptyPositions.push({x: indexRow, y: indexElem})
      })
    })
    if(emptyPositions.length === 1 && !this.state.isWon) {
      this.setState({
        ...this.state,
        isWon: 'draw'
      })
    }
    return emptyPositions;
  }

  // encuentra la última posición vacía en la matriz según la columna elegida por el usuario que es pasada como parámetro
  getLastEmptyPosition(column) {
    let allEmptyPositions = this.getAllEmptyPositions();
    let lastEmptyPosition = allEmptyPositions
      .filter(elem => elem.y === column)
      .sort((a, b) => b.x - a.x)[0]
    return lastEmptyPosition;
  }

  // comprueba si ya hay un ganador, si no lo hay, encuentra un lugar libre para colocar la ficha, la coloca y comprueba si se ha ganado.
  playGame = (column) => {
    if(!this.state.isWon) {
      let lastEmptyPosition = this.getLastEmptyPosition(column)
      this.putAPiece(lastEmptyPosition)
      this.checkIfWinner()
    }
  }

  // coloca una ficha en el tablero según las coordenadas pasadas como parámetro
  putAPiece(coord) {
    let x = coord.x;
    let y = coord.y
    let boardGame = [...this.state.boardGame];
    boardGame[x][y] = this.state.color;

    this.setState({
      ...this.state,
      boardGame,
      color: this.state.color === 'red' ? 'blue' : 'red',
      player: this.state.player === 'Player 1' ? 'Player 2' : 'Player 1'
    })
  }

  // comprueba si algún jugador ha ganado, ya sea haciendo linea horizontal, vertical o en cualquier diagonal.
  checkIfWinner() {
    let color = this.state.color
    let horizontalMatrix = [...this.state.boardGame]
    let verticalMatrix = this.transposeMatrix(horizontalMatrix)
    this.checkIfWinHorizontal(color, horizontalMatrix)
    this.checkIfWinHorizontal(color, verticalMatrix)
    this.checkIfWinDiagonalLeft(color, horizontalMatrix)
    this.checkIfWinDiagonalRight(color, horizontalMatrix)
  }

  // transpone la matriz, girándola para convertir las filas en columnas y poder comprobar si hay linea en horizontal y aprovechar la función checkIfWinHorizontal
  transposeMatrix(horizontalMatrix) {
    let verticalMatrix = horizontalMatrix[0].map((col, i) =>
                           horizontalMatrix.map(row => row[i]));
    return verticalMatrix;
  }

  // comprobar si hay linea en horizontal
  checkIfWinHorizontal(color, matrix) {
    for(let i = 0; i < matrix.length; i++) {
      for(let j = 0; j < matrix[i].length; j++) {
        if(matrix[i][j] === matrix[i][j+1]
          && matrix[i][j] === matrix[i][j+2]
          && matrix[i][j] === matrix[i][j+3]
          && matrix[i][j] === color) {
          this.setState({
            ...this.state,
            isWon: true
          })
        }
      }
    }
  }

  // comprobar si hay linea en la diagonal de izquierda a derecha
  checkIfWinDiagonalLeft(color, matrix) {
    for(let i = 3; i < matrix.length; i++) {
      for(let j = 0; j < matrix[i].length; j++) {
        if(matrix[i][j] === matrix[i-1][j+1]
          && matrix[i][j] === matrix[i-2][j+2]
          && matrix[i][j] === matrix[i-3][j+3]
          && matrix[i][j] === color) {
          this.setState({
            ...this.state,
            isWon: true
          })
        }
      }
    }
  }

  // comprobar si hay linea en la diagonal de derecha a izquierda
  checkIfWinDiagonalRight(color, matrix) {
    for(let i = 5; i > 3; i--) {
      for(let j = 6; j > 3; j--) {
        if(matrix[i][j] === matrix[i-1][j-1]
         && matrix[i][j] === matrix[i-2][j-2]
          && matrix[i][j] === matrix[i-3][j-3]
          && matrix[i][j] === color) {
          this.setState({
            ...this.state,
            isWon: true
          })
        }
      }
    }
  }

  // reinicia el state
  restart = () => {
    this.setState({
      boardGame: Array(6).fill().map(()=>Array(7).fill(null)),
      color: 'red',
      player: 'Player 2',
      isWon: false
    })
  }

  // renderizar la aplicación
  render() {
    return (
      <Fragment>
        <main>
          <div className='left-container'>
            <div className="boardGame-container">
              {this.state.boardGame.map((row, rowIndex) => (
                row.map((cell, cellIndex) => (
                  <Board
                    X = {rowIndex}
                    Y = {cellIndex}
                    color = {cell}
                    playGame = {this.playGame}
                    key = {rowIndex + ' ' + cellIndex}
                  />
                ))
              ))}
            </div>
          </div>
          <div className='right-container'>
          {!this.state.isWon ?
            <div className='text-turn-container'>
              <h2>{this.state.player}, is your turn.</h2>
              <div className='turn-container'>
                <h2 className={this.state.player === 'Player 1' ? 'blue' : 'blue inactive'}>Player 1</h2>
                <h2 className={this.state.player === 'Player 2' ? 'red' : 'red inactive'}>Player 2</h2>
              </div>
            </div>
            :
            <div className='winner-container'>
              <h2>{this.state.isWon === true ? this.state.player + ' wins!' : 'This is a draw!'}</h2>
            </div>
          }
            <div>
              <button onClick={this.restart} className='restart-button'>
                  Restart
              </button>
                <Link to='/'>
                  <button className='end-game-button'>
                    End game
                  </button>
                </Link>
            </div>
          </div>
        </main>
      </Fragment>
    );
  }
}

export default TwoPlayers;
