<script lang="ts">
  let {text, square} = $props();
  import { isMobile } from "../stores/isMobile";
</script>

<style>
  p{
    margin: unset;
    display: flex;
    flex-direction: row;
  }
  p.mobile{
    flex-direction: column;
  }
</style>

<p class:mobile={$isMobile}>
  <span>{text}: </span>
  <span>{square*2}</span>
</p>