type Config = {
  fieldWidth:number//сколько клеток поле в широту
  fieldHeight:number//сколько клеток поле в длину
  cellSize:number//сколько пикселей одна клетка
  lineWidth:number//сколько пикселей толщина линни
  pointWidth:number//сколько пикселей толщина точки
};
export function createConfig(): Config {
  const fieldWidth = 16;
  const fieldHeight = 16;

  const isBrowser = typeof window !== 'undefined';

  const cellSize = isBrowser
    ? Math.floor(
        Math.min(
          (window.innerWidth-60) / fieldWidth,
          (window.innerHeight-290) / fieldHeight
        )
      )
    : 35;

  return {
    fieldWidth,
    fieldHeight,
    cellSize,
    lineWidth: 2,
    pointWidth: 4,
  };
}

export const config = createConfig();
