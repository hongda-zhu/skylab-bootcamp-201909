import React, { Fragment } from 'react';
import './Board.css';
import Piece from '../Piece/Piece';
import { string, func, number } from 'prop-types';

const Board = ({ playGame, Y, X, color }) => {

  // cuando el usuario hace click en cualquier celda, esta función se redirige a la función pasada por propiedades 'getLastEmptyPosition', y le pasa el valor de la columna a la que pertenece esa celda seleccionada.
  const userChoosesColumn = () => playGame(Y);

  // se renderiza el tablero completo indicando unas clases que están vinculadas a una posición y un estilo en CSS.
  const divClassName = `box box-position-${X}-${Y} column-${Y}`

  return(
    <Fragment>
      <Piece X = {X} Y = {Y} color = {color} />
      <div onClick={userChoosesColumn} className={divClassName}></div>
   </Fragment>
  )
}

Board.propTypes = {
  X: number.isRequired,
  Y: number.isRequired,
  color: string,
  playGame: func.isRequired,
}

export default Board;