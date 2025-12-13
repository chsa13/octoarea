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
// где-нибудь после инициализации окна (например, в onMount)
// export function updateCellSize() {
//   if (typeof window === 'undefined') return;
// 
//   const size = Math.floor(
//     Math.min(
//       window.innerWidth-20 / config.fieldWidth,
//       window.innerHeight-20 / config.fieldHeight
//     )
//   );
// 
//   config.cellSize = size;
// }