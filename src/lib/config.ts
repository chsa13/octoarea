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
  lineWidth:number//сколько пикселей толщина линни
  pointWidth:number//сколько пикселей толщина точки
};

export const config: Config = {
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
  fieldWidth:16,
  fieldHeight:16,
  lineWidth: 6,
  pointWidth: 3.5,
};;
