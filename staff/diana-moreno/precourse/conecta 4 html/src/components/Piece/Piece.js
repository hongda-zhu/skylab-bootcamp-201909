import React from 'react';
import { string, number } from 'prop-types';

const Piece = ({X, Y, color}) =>
  <div className={`box box-position-${X}-${Y} ${color}`}></div>

Piece.propTypes = {
  X: number.isRequired,
  Y: number.isRequired,
  color: string,
}

export default Piece;