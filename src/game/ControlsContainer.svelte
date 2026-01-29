<script lang="ts">
  import Button from "../components/Button.svelte";
  import type { MouseEventHandler } from 'svelte/elements';
  interface Props{
    onNew:  MouseEventHandler<HTMLButtonElement>;
    onReset:  MouseEventHandler<HTMLButtonElement>;
    onCopy:  MouseEventHandler<HTMLButtonElement>;
  }
  let {onNew, onReset, onCopy}:Props = $props();
</script>
<style>
.cont{
  margin: var(--s-2) auto;
  width: max-content;
  display: flex;
  flex-direction: column;
}
.row{
  justify-content: space-between;
  display: flex;
  padding-bottom: var(--s-2);
}
</style>
<div class="cont">
  <div class="row">
    <Button onclick={onNew}>Новая задача</Button>
    <Button onclick={onReset}>Заново</Button>
  </div>
  <div class="row">
    <Button onclick={onCopy} title="Будет скопированна сслыка на задачу">Скопировать ссылку на задачу</Button>
  </div>
</div>