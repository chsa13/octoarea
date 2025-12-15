<script lang="ts">
  import ModeSelectionMenu from "./ModeSelectionMenu.svelte";
  import GameContainer from "./GameContainer.svelte";
  import Title from "./Title.svelte";
  import Rules from "./Rules.svelte";
    import Footer from "./Footer.svelte";
</script>
<style>
  .game-layout{
    justify-content: center;
    display: flex;
    flex-direction: column;
    width: min-content;
    margin: 0 auto;
  }
  @media(width > 750px){
    .game-layout{
      flex-direction: row-reverse;
      /* flex-direction: row; */
      gap:20px;
    }
  }
</style>
<div>
  <Title/>
  <!-- <ModeSelectionMenu/> -->
   <div class="game-layout">
     <Rules/>
    <GameContainer/>
   </div>
   <Footer></Footer>
</div>