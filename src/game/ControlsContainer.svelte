<script lang="ts">
  let {onInput, onStart, onReset, onCount, onCopy, square, MaxSquare} = $props();
</script>
<style>
  .text-cont{
    display: flex;
    justify-content: space-between;
    font-size: 15px;
  }
</style>
<div>
  <input oninput={onInput}>
  <button
    onclick={onStart}
  >
    Начать
  </button>
  <button
    onclick={onReset}
  >
    Отчистить
  </button>
  <button
    onclick={onCopy}
  >
    Поделиться
  </button>
  <div class = "text-cont">
    <div>
      Текущая площадь: {square*2}
    </div>
    <div>
      Возможная площадь: {MaxSquare*2}
    </div>
  </div>
</div>