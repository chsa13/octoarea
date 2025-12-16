type Config = {
  githubRepoUrl: string
  author:{
    github:string
    telegram: string
    name:string
  }
  license: {
    name: string
    url: string
  },
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
          ((window.innerHeight-259) / fieldHeight)
        )
      )
    : 35;

  return {
    githubRepoUrl:"https://github.com/Chsa13/octoarea",
    author:{
      github:"https://github.com/Chsa13",
      telegram: "https://t.me/chsa13",
      name:"Чернов Семён",
    },
    license: {
      name: "MIT License",
      url: "https://opensource.org/licenses/MIT",
    },
    fieldWidth,
    fieldHeight,
    cellSize,
    lineWidth: 2,
    pointWidth: 4,
  };
}

export const config = createConfig();
