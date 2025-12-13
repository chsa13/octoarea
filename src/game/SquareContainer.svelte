<script lang="ts">
  let {startToken, resetToken, countToken, handleSquare} = $props()
  import { onMount } from "svelte";
  import { config } from "./config";
  import { drawField, setupCanvas, clear, drawTriangel, drawByCells, drawPoint, getFieldCoordinateFromEvent } from "./CanvasMethods";
  import { checkForbiddenCellsNotInTriangel, clearTargetCells, generateCells, GenerateForbiddenCells, getSquareFromCoordinates, GetTargetCells, type Cells } from "./MathMethods";
  let canvas:HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null
  let cells: Cells = generateCells();
  function Count(){
    let targetCells = GetTargetCells(cells);
    if (targetCells.length == 3 && checkForbiddenCellsNotInTriangel(cells)){
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
    cells = GenerateForbiddenCells(cells, 5);
    handleSquare(0)
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
</script>
<style>
  canvas{
    border: 2px solid black
  }
</style>
<canvas 
  bind:this={canvas}
  onclick= {(event)=>{handleCanvasClick(event, canvas, cells)}}
></canvas>