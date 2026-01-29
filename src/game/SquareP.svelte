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
  .value{
    font-weight: bold;
  }
</style>

<p class:mobile={$isMobile}>
  <span>{text}:&nbsp;</span>
  <span class="value"> {square*2}</span>
</p>