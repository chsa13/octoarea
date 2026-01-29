<script lang="ts">
  import { isMobile } from '../stores/isMobile';
</script>

<style>
  p{
    text-align: start;
    min-width: 300px;
    font-size: var(--font-size-normal);
  }
  p.mobile{
    padding-top: 0px;
  }
</style>

<p class:mobile={$isMobile}>
  <span><b>Цель:</b> построить треугольник c наибольшей возможной площадью.</span><br>
  <span><b>Правило:</b> красные точки не должны лежать внутри треугольника.</span><br>
  <span><b>Как играть:</b> ставь 3 точки на поле и двигай их.</span><br>
</p>