<script lang="ts">
  let {onStart, onReset, onCount, square, MaxSquare} = $props();
</script>
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
<!-- <button
  onclick={onCount}
>
  Посчитать
</button> -->
<div>
  Площадь: {square}
</div>

<div>
  Максимальная площадь: {MaxSquare}
</div>