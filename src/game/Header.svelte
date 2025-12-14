<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<style>
  .name {
    font-size: 64px;
    font-weight: 700;
    color: #3e40a0;
    /* filter: blur(2px); */
    opacity: 0.8;
    font-family: "Comic Neue", system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
  }
  .rules{
    text-align: start;
    padding-bottom: 8px;
  }
</style>
<div class="name">Octoarea</div>
<div class="rules">
  <div><b>Цель:</b> построить треугольник c наибольшей возможной площадью.</div>
  <div><b>Правило:</b> красные точки не должны лежать внутри треугольника.</div>
</div>
