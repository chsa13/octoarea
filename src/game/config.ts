type Config = {
  fieldWidth:number//сколько клеток поле в широту
  fieldHeight:number//сколько клеток поле в длину
  cellSize:number//сколько пикселей одна клетка
  lineWidth:number//сколько пикселей толщина линни
  pointWidth:number//сколько пикселей толщина точки
};
export const config: Config={
  fieldWidth:16,
  fieldHeight:16,
  cellSize:35,
  lineWidth:2,
  pointWidth:4,
};