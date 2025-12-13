<script lang="ts">
  let {getkey, startToken, resetToken, countToken, copyToken, handleSquare, handleMaxSquare} = $props()
  import { onMount } from "svelte";
  import { config } from "./config";
  import { drawField, setupCanvas, clear, drawTriangel, drawByCells, drawPoint, getFieldCoordinateFromEvent, type FieldCoordinate, cellsEquality, drawForbiddenPoint } from "./CanvasMethods";
  import { checkForbiddenCellsNotInTriangelFromCells, clearTargetCells, generateCells, GenerateForbiddenCells, GetForbiddenCells, GetMaxSquare, getSquareFromCoordinates, GetTargetCells, type Cells } from "./MathMethods";
    import { encodePoints } from "./Сoding";
  let canvas:HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null
  let cells: Cells = generateCells();
  let MaxSquare = 0;
  function Count(){
    clear(canvas);
    drawByCells(canvas, cells);
    let targetCells = GetTargetCells(cells);
    if (targetCells.length == 3){
      if (checkForbiddenCellsNotInTriangelFromCells(cells)){
        const square = getSquareFromCoordinates(targetCells[0], targetCells[1], targetCells[2])
        if (MaxSquare == square){
          handleSquare(square)
          drawTriangel(canvas, targetCells[0], targetCells[1], targetCells[2], "max");

        }
        handleSquare(square)
        drawTriangel(canvas, targetCells[0], targetCells[1], targetCells[2], "normal");
      } else {
        handleSquare(0);
        drawTriangel(canvas, targetCells[0], targetCells[1], targetCells[2], "forbidden");
      }
    }
  }
  onMount(()=>{
    // updateCellSize()
    ctx = setupCanvas(canvas, config.fieldWidth*config.cellSize, config.fieldHeight*config.cellSize);
    if (!ctx){
      return;
    };
    drawField(canvas);
  });
  $effect(() => {
    if (!ctx) return;
    resetToken;
    clear(canvas);
    cells = clearTargetCells(cells);
    drawByCells(canvas, cells);
  });
  $effect(() => {
    if (!ctx || !copyToken) return;
    copyToken;
    const ForbiddenCells = GetForbiddenCells(cells);
    for (let ForbiddenCell in ForbiddenCells){
      const x = ForbiddenCells[ForbiddenCell].x
      const y = ForbiddenCells[ForbiddenCell].y
      ForbiddenCells[ForbiddenCell].x = y
      ForbiddenCells[ForbiddenCell].y = x
    }
    const key = encodePoints(ForbiddenCells)
    navigator.clipboard.writeText(key)
  });
  $effect(() => {
    if (!ctx) return;

    countToken;
    Count()
  });
  $effect(() => {
    if (!ctx || !startToken) return;
    startToken;
    clear(canvas)
    cells = generateCells();
    cells = GenerateForbiddenCells(cells, 16, getkey());
    const ForbiddenCells = GetForbiddenCells(cells);
    const code = encodePoints(ForbiddenCells);
    handleSquare(0);
    MaxSquare = GetMaxSquare(cells);
    handleMaxSquare(MaxSquare);
    drawByCells(canvas, cells);
  });
function handleCanvasClick(event:MouseEvent, canvas:HTMLCanvasElement, cells:Cells){
  const fcoord = getFieldCoordinateFromEvent(event, canvas)
  const TargetCells = GetTargetCells(cells);
  if (TargetCells.length<3){
    cells[fcoord.y][fcoord.x] = "1";
    drawPoint(canvas, fcoord);
  };
  if(GetTargetCells(cells).length == 3){
    Count()
  }
};
let dragging = false;
let draggnigCell: FieldCoordinate | null;
function onPointerDown(event: MouseEvent | TouchEvent){
  draggnigCell = getFieldCoordinateFromEvent(event, canvas);
  const TargetCells = GetTargetCells(cells);
  dragging = false;
  for(let TargetCell of TargetCells){
      if (cellsEquality(TargetCell, draggnigCell)){
        dragging = true; 
        break;
      }
  }
}
function onPointerUp(event: MouseEvent | TouchEvent){
  if (draggnigCell) draggnigCell = null;
  if (dragging) dragging = false
}
function onPointerMove(event: MouseEvent | TouchEvent){
  if (!draggnigCell || !dragging) return
  const currentCell = getFieldCoordinateFromEvent(event, canvas);
  const ForbiddenCells = GetForbiddenCells(cells);
  const TargetCells = GetTargetCells(cells);
  if (!cellsEquality(draggnigCell, currentCell)){
    for(let ForbiddenCell of ForbiddenCells){
      if (cellsEquality(ForbiddenCell, currentCell)){return}
    }
    for(let TargetCell of TargetCells){
      if (cellsEquality(TargetCell, currentCell)){return}
    }
    cells[draggnigCell.y][draggnigCell.x] = ""
    cells[currentCell.y][currentCell.x] = "1"
    draggnigCell.x = currentCell.x
    draggnigCell.y = currentCell.y
    clear(canvas)
    drawByCells(canvas, cells);
    Count()
  }
}
</script>
<style>
  canvas{
    border: 2px solid black;
    touch-action: none; /* запрещает скролл/зум/refresh жестами над канвой */
  }
</style>
<canvas 
  bind:this={canvas}
  onclick= {(event)=>{handleCanvasClick(event, canvas, cells)}}
  onmousedown={onPointerDown}
  onmousemove={onPointerMove}
  onmouseup={onPointerUp}
  onmouseleave={onPointerUp}
  ontouchstart={onPointerDown}
  ontouchmove={onPointerMove}
  ontouchend={onPointerUp}
  ontouchcancel={onPointerUp}
></canvas>