import { config } from "../lib/config";
import { cssVar } from "../lib/utils";
import { GetForbiddenCells, GetTargetCells, type Cells } from "./MathMethods"
export type FieldCoordinate = {
  x:number,
  y:number,
};
type CtxCoordinate = {
  x:number,
  y:number,
};
export function getFieldCoordinateFromEvent(
  event: MouseEvent | TouchEvent, 
  canvas: HTMLCanvasElement
): FieldCoordinate {
  const rect = canvas.getBoundingClientRect();

  let clientX: number;
  let clientY: number;

  if (event instanceof MouseEvent) {
    clientX = event.clientX;
    clientY = event.clientY;
  } else {
    const touch = event.touches[0] ?? event.changedTouches[0];
    clientX = touch.clientX;
    clientY = touch.clientY;
  }

  const x = clientX - rect.left;
  const y = clientY - rect.top;

  // Вычисляем размер ячейки на основе размеров canvas
  const cellSize = rect.width / 16;

  let cellX = Math.floor(x / cellSize);
  if (cellX < 0) { cellX = 0 }
  if (cellX > 15) { cellX = 15 }
  
  let cellY = Math.floor(y / cellSize);
  if (cellY < 0) { cellY = 0 }
  if (cellY > 15) { cellY = 15 }
  
  return { x: cellX, y: cellY };
}

function getCtxCoordinate(fcoord:FieldCoordinate, canvas: HTMLCanvasElement):CtxCoordinate{
  const rect = canvas.getBoundingClientRect();
  const cellSize = canvas.width / 16;
  return {
    x: fcoord.x*cellSize + cellSize/2,
    y: fcoord.y*cellSize + cellSize/2
  };
};
export function setupCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  return ctx;
}
export function drawField(canvas:HTMLCanvasElement){
  let ctx = canvas.getContext("2d");
  if (!ctx){
    return;
  };
  const rect = canvas.getBoundingClientRect();
  const cellSize = canvas.width / 16;
  ctx.fillStyle = cssVar("--background-game-color");
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y<=config.fieldHeight; y++){
    const py = y * cellSize;
    ctx.strokeStyle = cssVar("--line-game-color")
    ctx.lineWidth = config.lineWidth;
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(canvas.width, py);
    ctx.stroke();
  };
  for (let x = 0; x<=config.fieldWidth; x++){
    const px = x * cellSize;
    ctx.strokeStyle = cssVar("--line-game-color")
    ctx.lineWidth = config.lineWidth;
    ctx.beginPath();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, canvas.height);
    ctx.stroke();
  };
};
export function clear(canvas:HTMLCanvasElement){
  drawField(canvas)
};
export function drawPoint(canvas: HTMLCanvasElement, coord:FieldCoordinate){
  let ctx = canvas.getContext("2d");
  if (!ctx){
    return;
  };
  if (coord.x>16 || coord.y>16){
    return;
  };
  const ccoord = getCtxCoordinate(coord, canvas);
  const rect = canvas.getBoundingClientRect();
  const pointScale = canvas.width/rect.width
  ctx.fillStyle = cssVar("--line-game-color");
  ctx.beginPath();
  ctx.arc(ccoord.x, ccoord.y, pointScale*config.pointWidth, 0, Math.PI * 2);
  ctx.fill();
};
export function drawForbiddenPoint(canvas: HTMLCanvasElement, coord:FieldCoordinate){
  let ctx = canvas.getContext("2d");
  if (!ctx){
    return;
  };
  if (coord.x>16 || coord.y>16){
    return;
  };
  const ccoord = getCtxCoordinate(coord, canvas);
  const rect = canvas.getBoundingClientRect();
  const pointScale = canvas.width/rect.width
  ctx.fillStyle = cssVar("--f-dot-game-color");
  ctx.beginPath();
  ctx.arc(ccoord.x, ccoord.y, pointScale*config.pointWidth, 0, Math.PI * 2);
  ctx.fill();
};
export function drawLine(canvas: HTMLCanvasElement, fcoord1:FieldCoordinate, fcoord2:FieldCoordinate){
  let ctx = canvas.getContext("2d");
  if (!ctx){
    return;
  }
  if (fcoord1.x>16 || fcoord1.y>16){
    return;
  };
  if (fcoord2.x>16 || fcoord2.y>16){
    return;
  };
  const ccoord1 = getCtxCoordinate(fcoord1, canvas);
  const ccoord2 = getCtxCoordinate(fcoord2, canvas);
  ctx.strokeStyle = cssVar("--line-game-color")
  ctx.lineWidth = config.lineWidth;
  ctx.beginPath();
  ctx.moveTo(ccoord1.x, ccoord1.y);
  ctx.lineTo(ccoord2.x, ccoord2.y);
  ctx.stroke();
};
export function drawTriangle(canvas: HTMLCanvasElement, fcoord1:FieldCoordinate, 
                                                        fcoord2:FieldCoordinate, 
                                                        fcoord3:FieldCoordinate,
                                                        type:"normal"|"forbidden"|"max"|null){
  let color = "";
  if (type){
    if (type == "max"){color = cssVar("--max-triangle-game-color")};
    if (type == "normal"){color = cssVar('--normal-triangle-color')};
    if (type == "forbidden"){color = cssVar("--forbidden-triangle-game-color")};
    fillTriangle(canvas, fcoord1, fcoord2, fcoord3, color)
  }
  drawLine(canvas, fcoord1, fcoord2);
  drawLine(canvas, fcoord3, fcoord2);
  drawLine(canvas, fcoord3, fcoord1);
};
export function fillTriangle(canvas: HTMLCanvasElement, fcoord1:FieldCoordinate, 
                                                        fcoord2:FieldCoordinate, 
                                                        fcoord3:FieldCoordinate,
                                                        color:string){
  let ctx = canvas.getContext("2d");
  if (!ctx){
    return;
  };
  const ccoord1 = getCtxCoordinate(fcoord1, canvas);
  const ccoord2 = getCtxCoordinate(fcoord2, canvas);
  const ccoord3 = getCtxCoordinate(fcoord3, canvas);
  ctx.beginPath();
  ctx.moveTo(ccoord1.x, ccoord1.y);
  ctx.lineTo(ccoord2.x, ccoord2.y);
  ctx.lineTo(ccoord3.x, ccoord3.y);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}
export function drawByCells(canvas: HTMLCanvasElement, cells: Cells){
  let ctx = canvas.getContext("2d");
  if (!ctx){
    return;
  };
  // clear(canvas);
  const TargetCells = GetTargetCells(cells);
  for (let TargetCell of TargetCells){
    drawPoint(canvas, TargetCell)
  }
  const ForbiddenCells = GetForbiddenCells(cells);
  for (let ForbiddenCell of ForbiddenCells){
    drawForbiddenPoint(canvas, ForbiddenCell)
  }
};
export function cellsEquality(cell1:FieldCoordinate|null, cell2: FieldCoordinate|null): boolean{
  if ((cell1===null || cell2===null) && cell1!=cell2){
    return false;
  };
  if (cell1 && cell2){
     return (cell1.x == cell2.x && cell1.y == cell2.y); 
  }
  return false;
};
