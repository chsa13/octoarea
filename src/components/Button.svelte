<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  interface Props{
    onclick: MouseEventHandler<HTMLButtonElement>;
    title?: string
    children: Snippet
  }
  let {onclick, title, children }: Props = $props();
</script>
<style>
  button{
  border: 2px solid var(--border-color);
  border-radius: 3px;
  color: var(--button-text-color);
  background-color: var(--primary-color);

  box-shadow: 0 1px 0 rgba(0,0,0,.18), 0 6px 18px rgba(0,0,0,.18);


  font-family: var(--font-family);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-normal);
  letter-spacing: var(--letter-spacing);
  line-height: var(--line-height-normal);
  padding: 4px 12px;

  cursor: pointer;
  user-select: none;

}
button:active{
  transform: translateY(1px);
}
</style>
<button onclick={onclick} title={title}>
  {@render children()}
</button>