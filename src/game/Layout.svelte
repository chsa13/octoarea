<script lang="ts">
  import GameContainer from "./GameContainer.svelte";
  import Header from "./Header.svelte";
  import Rules from "./Rules.svelte";
  import Footer from "./Footer.svelte";
  import { isMobile } from "../stores/isMobile";
</script>

<style>
  .layout{
    min-height: 100vh;
    background: var(--background-gradient);
  }
  .game-layout{
    width: max-content;
    justify-content: center;
    display: flex;
    width: min-content;
    margin: 0 auto;
    flex-direction: row-reverse;
    gap:var(--s-5);
  }
  .mobile .game-layout{
    flex-direction: column;
    gap: 0;
  }
</style>

<div class="layout" class:mobile={$isMobile}>
  <Header/>
  <div class="game-layout">
    <Rules/>
    <GameContainer/>
  </div>
  <Footer/>
</div>