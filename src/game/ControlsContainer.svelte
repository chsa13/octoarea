<script lang="ts">
  import { lang } from "../stores/lang";
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
    <Button onclick={onNew}>{$lang("NewTask")}</Button>
    <Button onclick={onReset}>{$lang("Restart")}</Button>
  </div>
  <div class="row">
    <Button onclick={onCopy}>{$lang("CopyLink")}</Button>
  </div>
</div>