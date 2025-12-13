<script lang="ts">
  let {startToken, resetToken, countToken, handleSquare, handleMaxSquare} = $props()
  import { onMount } from "svelte";
  import { config } from "./config";
  import { drawField, setupCanvas, clear, drawTriangel, drawByCells, drawPoint, getFieldCoordinateFromEvent, type FieldCoordinate, cellsEquality } from "./CanvasMethods";
  import { checkForbiddenCellsNotInTriangelFromCells, clearTargetCells, generateCells, GenerateForbiddenCells, GetForbiddenCells, GetMaxSquare, getSquareFromCoordinates, GetTargetCells, type Cells } from "./MathMethods";
  let canvas:HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null
  let cells: Cells = generateCells();
  function Count(){
    let targetCells = GetTargetCells(cells);
    if (targetCells.length == 3 && checkForbiddenCellsNotInTriangelFromCells(cells)){
        let square = getSquareFromCoordinates(targetCells[0], targetCells[1], targetCells[2])
        handleSquare(square)
        drawTriangel(canvas, targetCells[0], targetCells[1], targetCells[2]);
    }
  }
  onMount(()=>{
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
    if (!ctx) return;
    countToken;
    Count()
  });
  $effect(() => {
    if (!ctx || !startToken) return;
    startToken;
    clear(canvas)
    cells = generateCells();
    cells = GenerateForbiddenCells(cells, 8);
    handleSquare(0)
    const MaxSquare = GetMaxSquare(cells);
    handleMaxSquare(MaxSquare)
    console.log(MaxSquare)
    drawByCells(canvas, cells)
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
let draggnig = false;
let draggnigCell: FieldCoordinate | null;
function onPointerDown(event: MouseEvent | TouchEvent){
  draggnigCell = getFieldCoordinateFromEvent(event, canvas);
  draggnig = true
}
function onPointerUp(event: MouseEvent | TouchEvent){
  if (draggnigCell) draggnigCell = null;
  if (draggnig) draggnig = false
}
function onPointerMove(event: MouseEvent | TouchEvent){
  console.log(draggnigCell)
  if (!draggnigCell) return
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
    border: 2px solid black
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