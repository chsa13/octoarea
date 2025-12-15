<script lang="ts">
  let {onNew, onReset, onCopy} = $props();
</script>
<style>
button{
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.563);
  border-radius: 5px;               /* угловато */
  background: rgb(231, 231, 231);
  color: black;

  box-shadow: 0 1px 0 rgba(0,0,0,.18), 0 6px 18px rgba(0,0,0,.18);;

  padding: 5px 14px;
  font: 600 14px/1.1 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial;
  letter-spacing: 0.02em;
  text-transform: none;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;
  user-select: none;

  transition: background-color .15s ease, color .15s ease, border-color .15s ease, transform .05s ease;
}
button:active{
  transform: translateY(1px);
}
.cont{
  margin: 0 auto;
  width: max-content;
  display: flex;
  flex-direction: column;
  /* width: 100%; */
}
.row{
  /* width: 100%; */
  justify-content: space-between;
  display: flex;
  padding-bottom: 8px;
}
</style>
<div class="cont">
  <div class="row">
    <button onclick={onNew}>Новая игра</button>
    <button onclick={onReset}>Начать заново</button>
  </div>
  <div class="row">
    <button onclick={onCopy} title="Будет скопированна сслыка на игру">Скопировать ссылку на расклад</button>
  </div>
</div>