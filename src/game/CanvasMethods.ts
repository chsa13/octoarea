import { config } from "./config";
import { GetForbiddenCells, GetTargetCells, type Cells } from "./MathMethods"
export type FieldCoordinate = {
  x:number,
  y:number,
};
type CtxCoordinate = {
  x:number,
  y:number,
};
export function getFieldCoordinateFromEvent(event:MouseEvent | TouchEvent, canvas:HTMLCanvasElement):FieldCoordinate{
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

  let cellX = Math.floor(x / config.cellSize);
  if (cellX<0) {cellX = 0};
  if (cellX>15) {cellX = 15};
  let cellY = Math.floor(y / config.cellSize);
  if (cellY<0) {cellY = 0};
  if (cellY>15) {cellY = 15};
  return {x: cellX, y: cellY}
};
function getCtxCoordinate(fcoord:FieldCoordinate):CtxCoordinate{
  return {
    x: fcoord.x*config.cellSize + config.cellSize/2,
    y: fcoord.y*config.cellSize + config.cellSize/2
  };
};
export function setupCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  const dpr = (window.devicePixelRatio || 1)*3;

  // логический размер (как ты хочешь видеть в макете)
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  // реальный размер в пикселях с учётом DPR
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.scale(dpr, dpr);

  return ctx;
}
export function drawField(canvas:HTMLCanvasElement){
  let ctx = canvas.getContext("2d");
  if (!ctx){
    return;
  };
  ctx.fillStyle = "#ffffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y<=config.fieldHeight; y++){
    const py = y * config.cellSize;
    ctx.strokeStyle = "#000"
    ctx.lineWidth = config.lineWidth;
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(canvas.width, py);
    ctx.stroke();
  };
  for (let x = 0; x<=config.fieldWidth; x++){
    const px = x * config.cellSize;
    ctx.strokeStyle = "#000"
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
  const ccoord = getCtxCoordinate(coord);
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(ccoord.x, ccoord.y, config.pointWidth, 0, Math.PI * 2);
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
  const ccoord = getCtxCoordinate(coord);
  ctx.fillStyle = '#ff0000ff';
  ctx.beginPath();
  ctx.arc(ccoord.x, ccoord.y, config.pointWidth, 0, Math.PI * 2);
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
  const ccoord1 = getCtxCoordinate(fcoord1);
  const ccoord2 = getCtxCoordinate(fcoord2);
  ctx.strokeStyle = "#000"
  ctx.lineWidth = config.lineWidth;
  ctx.beginPath();
  ctx.moveTo(ccoord1.x, ccoord1.y);
  ctx.lineTo(ccoord2.x, ccoord2.y);
  ctx.stroke();
};
export function drawTriangel(canvas: HTMLCanvasElement, fcoord1:FieldCoordinate, 
                                                        fcoord2:FieldCoordinate, 
                                                        fcoord3:FieldCoordinate,
                                                        type:"normal"|"forbidden"|"max"|null){
  drawLine(canvas, fcoord1, fcoord2);
  drawLine(canvas, fcoord3, fcoord2);
  drawLine(canvas, fcoord3, fcoord1);
  let color = "";
  if (type){
    if (type == "max"){color = 'rgba(154, 255, 128, 0.91)'};
    if (type == "normal"){color = 'rgba(6, 70, 122, 0.5)'};
    if (type == "forbidden"){color = 'rgba(255, 0, 0, 0.5)'};
    fillTriangel(canvas, fcoord1, fcoord2, fcoord3, color)
  }
};
export function fillTriangel(canvas: HTMLCanvasElement, fcoord1:FieldCoordinate, 
                                                        fcoord2:FieldCoordinate, 
                                                        fcoord3:FieldCoordinate,
                                                        color:string){
  let ctx = canvas.getContext("2d");
  if (!ctx){
    return;
  };
  const ccoord1 = getCtxCoordinate(fcoord1);
  const ccoord2 = getCtxCoordinate(fcoord2);
  const ccoord3 = getCtxCoordinate(fcoord3);
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
  clear(canvas);
  const TargetCells = GetTargetCells(cells);
  for (let TargetCell of TargetCells){
    drawPoint(canvas, TargetCell)
  }
  const ForbiddenCells = GetForbiddenCells(cells);
  for (let ForbiddenCell of ForbiddenCells){
    drawForbiddenPoint(canvas, ForbiddenCell)
  }
};
export function cellsEquality(cell1:FieldCoordinate, cell2: FieldCoordinate): boolean{
  return (cell1.x == cell2.x && cell1.y == cell2.y);
};