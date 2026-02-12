<script lang="ts">
  import { lang } from "../stores/lang";
  let {square, MaxSquare} = $props();
  import SquareP from "./SquareP.svelte";
</script>

<style>
  div{
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-small);
    padding-bottom: var(--s-2);
  }
</style>

<div>
  <SquareP text={$lang("CurrentSquare")} square={square}/>
  <SquareP text={$lang('MaxSquare')} square={MaxSquare}/>
</div>