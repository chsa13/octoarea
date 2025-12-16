<script lang="ts">
  import GameContainer from "./GameContainer.svelte";
  import Title from "./Title.svelte";
  import Rules from "./Rules.svelte";
  import Footer from "./Footer.svelte";
  import { isMobile } from "../stores/isMobile";
</script>

<style>
  .game-layout{
    justify-content: center;
    display: flex;
    width: min-content;
    margin: 0 auto;
    flex-direction: row-reverse;
    gap:20px;
  }
  .mobile .game-layout{
    flex-direction: column;
    gap: 0;
  }
</style>

<div class:mobile={$isMobile}>
  <Title/>
  <div class="game-layout">
    <Rules/>
    <GameContainer/>
  </div>
  <Footer/>
</div>