import React, { Component, Fragment } from 'react';
import '../../App.css';
import Board from '../Board/Board';
import { Link } from 'react-router-dom';


class SinglePlayer extends Component {
  state = {
    boardGame: Array(6).fill().map(() => Array(7).fill(null)),
    color: 'red',
    player: 'Player 2',
    isWon: false
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
      this.checkIfWinner('red')
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
  checkIfWinner(color) {
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
            isWon: true,
            color,
            player: color === 'red' ? 'Player 2' : 'Player Pc'
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
            isWon: true,
            color,
            player: color === 'red' ? 'Player 2' : 'Player Pc'
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
            isWon: true,
            color,
            player: color === 'red' ? 'Player 2' : 'Player Pc'
          })
        }
      }
    }
  }

  // reinicia el state
  restart =() => {
    this.setState({
      boardGame: Array(6).fill().map(() => Array(7).fill(null)),
      color: 'red',
      player: 'Player 2',
      isWon: false
    })
  }

// INTELIGENCIA ARTIFICIAL para elegir las jugadas del ordenador:

  // comprobar si el usuario va a ganar haciendo linea horizontal
  checkHorizontalIA(color, matrix) {
    for(let i = 0; i < matrix.length; i++) {
      for(let j = 0; j < matrix[i].length; j++) {
        if(matrix[i][j] === matrix[i][j+1]
          && matrix[i][j] === matrix[i][j+2]
          && matrix[i][j] === color) {

          let nextHorizontalRightPosition = {x: i, y: j+3}
          let nextHorizontalLeftPosition = {x: i, y: j-1}

          let rightPositionAvailable = this.getLastEmptyPosition(j+3)
          let leftPositionAvailable = this.getLastEmptyPosition(j-1)

          if(rightPositionAvailable && rightPositionAvailable.x === nextHorizontalRightPosition.x && rightPositionAvailable.y === nextHorizontalRightPosition.y) {
              return rightPositionAvailable;
          } else if(leftPositionAvailable && leftPositionAvailable.x === nextHorizontalLeftPosition.x && leftPositionAvailable.y === nextHorizontalLeftPosition.y) {
              return leftPositionAvailable;
          }
        }
      }
    }
  }

  // comprobar si el usuario va a ganar haciendo linea vertical
  checkVerticalIA(color, matrix) {
    for(let i = 2; i < matrix.length; i++) {
      for(let j = 0; j < matrix[i].length; j++) {
        if(matrix[i][j] === matrix[i-1][j]
          && matrix[i][j] === matrix[i-2][j]
          && matrix[i][j] === color) {

          let nextVerticalPosition = {x: i-3, y: j}
          let verticalPositionAvailable = this.getLastEmptyPosition(j)

          if(verticalPositionAvailable && verticalPositionAvailable.x === nextVerticalPosition.x && verticalPositionAvailable.y === nextVerticalPosition.y) {
              return verticalPositionAvailable;
          }
        }
      }
    }
  }

  // comprobar si el usuario va a ganar haciendo linea diagonal-izquierda
  checkDiagonalLeftIA(color, matrix) {
    for(let i = 3; i < matrix.length; i++) {
      for(let j = 0; j < matrix[i].length; j++) {
        if(matrix[i][j] === matrix[i-1][j+1]
          && matrix[i][j] === matrix[i-2][j+2]
          && matrix[i][j] === color) {

          let nextDiagonalLeftPosition = {x: i-3, y: j+3}
          let diagonalLeftPositionAvailable = this.getLastEmptyPosition(j+3);

          if(diagonalLeftPositionAvailable && diagonalLeftPositionAvailable.x === nextDiagonalLeftPosition.x && diagonalLeftPositionAvailable.y === nextDiagonalLeftPosition.y) {
              return diagonalLeftPositionAvailable;
          }
        }
      }
    }
  }

  // comprobar si el usuario va a ganar haciendo linea diagonal-derecha
  checkDiagonalRightIA(color, matrix) {
    for(let i = 5; i > 3; i--) {
      for(let j = 6; j > 3; j--) {
        if(matrix[i][j] === matrix[i-1][j-1]
         && matrix[i][j] === matrix[i-2][j-2]
          && matrix[i][j] === color) {

          let nextDiagonalRightPosition = {x: i-3, y: j-3}
          let diagonalRightPositionAvailable = this.getLastEmptyPosition(j-3);

          if(diagonalRightPositionAvailable && diagonalRightPositionAvailable.x === nextDiagonalRightPosition.x && diagonalRightPositionAvailable.y === nextDiagonalRightPosition.y) {
              return diagonalRightPositionAvailable;
          }
        }
      }
    }
  }

  // elegir una posición random para que juege el ordenador de entre las que quedan disponibles.
  getRandomPositionPc() {
    let availableColumns = this.getAllEmptyPositions()
      .map(elem => elem.y)
      .filter(function(item, index, array) {
        return array.indexOf(item) === index;
      })

    let randomIndex = Math.floor(Math.random() * (availableColumns.length))
    let randomColumn = availableColumns[randomIndex]
    let pcPosition = this.getLastEmptyPosition(randomColumn)
    return pcPosition
  }

  // función que decide qué posición va a jugar el ordenador. Entre las posibles que tenga, que son en las que sabe que el otro jugador va a ganar, elige una de manera random.
  artificialInteligence() {
    let matrix = this.state.boardGame
    let pcMovesInHorizontal = this.checkHorizontalIA('red', matrix)
    let pcMovesInVertical = this.checkVerticalIA('red', matrix);
    let pcMovesInDiagonalLeft = this.checkDiagonalLeftIA('red', matrix)
    let pcMovesInDiagonalRight = this.checkDiagonalRightIA('red', matrix)
    let pcRandomMove = this.getRandomPositionPc();

    let posibleMovements = []

    if(pcMovesInHorizontal) {
      posibleMovements.push(pcMovesInHorizontal)
    } else if(pcMovesInVertical) {
      posibleMovements.push(pcMovesInVertical)
    } else if(pcMovesInDiagonalLeft) {
      posibleMovements.push(pcMovesInDiagonalLeft)
    } else if(pcMovesInDiagonalRight) {
      posibleMovements.push(pcMovesInDiagonalRight)
    }

    if (posibleMovements.length > 0) {
      let randomIndex = Math.floor(Math.random() * posibleMovements.length)
      return posibleMovements[randomIndex];
    } else {
      return pcRandomMove
    }
  }

  // jugada del Pc
  playPc = () => {
    setTimeout(() => {
      if(this.state.player === 'Player 1') {
        let decisionPc = this.artificialInteligence()
        this.putAPiece(decisionPc);
        this.checkIfWinner('blue')
      }}, 500)
  }

  // cuando se actualiza el estado, ejecutamos la función que permite al PC colocar su ficha
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.playPc()
    }
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

          {!this.state.isWon
            ?
            <div className='text-turn-container'>
              <h2>{this.state.player === 'Player 2' ? 'Player 2' : 'Player PC'}, is your turn.</h2>
              <div className='turn-container'>
                <h2 className={this.state.player === 'Player 1' ? 'blue' : 'blue inactive'}>PC</h2>
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

export default SinglePlayer;
