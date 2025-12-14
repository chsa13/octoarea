<script lang="ts">
  let {square, MaxSquare} = $props();
</script>
<style>
  .text-cont{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding-bottom: 8px;
  }
  @media(width<400px){
    .text-cont{
      height: 45px;
      align-items: flex-end;
    }
  }
</style>
<div>
  <div class = "text-cont">
    <div>
      Текущая площадь: {square*2}
    </div>
    <div>
      Возможная площадь: {MaxSquare*2}
    </div>
  </div>
</div>