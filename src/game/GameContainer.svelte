<script lang="ts">
  import ControlsContainer from "./ControlsContainer.svelte";
  import SquareContainer from "./SquareContainer.svelte";
  import UpTextContainer from "./UpTextContainer.svelte";
  let newToken = 0;
  function handleNew(){newToken+=1}
  let resetToken = 0;
  function handleReset(){resetToken+=1}
  let copyToken = 0;
  function handleCopy(){copyToken+=1}
  let square = 0
  function handleSquare(x:number){square=x}
  let MaxSquare = 0
  function handleMaxSquare(x:number){MaxSquare=x}
</script>

<div>
  <UpTextContainer {square} {MaxSquare}/>
  <SquareContainer {newToken} {resetToken} {copyToken} {handleSquare} {handleMaxSquare}/>
  <ControlsContainer onNew={handleNew} onReset={handleReset} onCopy={handleCopy}/>
</div>