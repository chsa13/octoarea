<script lang="ts">
  import ControlsContainer from "./ControlsContainer.svelte";
  import SquareContainer from "./SquareContainer.svelte";
  let startToken = 0;
  function handleStart(){startToken+=1}
  let resetToken = 0;
  function handleReset(){resetToken+=1}
  let countToken = 0;
  function handleCount(){countToken+=1}
  let square = 0
  function handleSquare(x:number){square=x}
  let MaxSquare = 0
  function handleMaxSquare(x:number){MaxSquare=x}
</script>
<div>
  <ControlsContainer
    onStart={handleStart}
    onReset={handleReset}
    onCount={handleCount}
    square ={square}
    MaxSquare ={MaxSquare}
  />
  <SquareContainer
    {startToken}
    {resetToken}
    {countToken}
    {handleSquare}
    {handleMaxSquare}
  />
</div>