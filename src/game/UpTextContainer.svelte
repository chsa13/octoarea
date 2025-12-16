<script lang="ts">
  let {square, MaxSquare} = $props();
  import SquareP from "./SquareP.svelte";
</script>

<style>
  div{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding-bottom: 8px;
  }
</style>

<div>
  <SquareP text="Текущая площадь" square={square}/>
  <SquareP text="Возможная площадь" square={MaxSquare}/>
</div>