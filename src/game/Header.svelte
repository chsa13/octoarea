<script lang="ts">
    import { isMobile } from "../stores/isMobile";
</script>
<style>
  header{
    font-family: 'Courier New', Courier, monospace;
    height: 120px;
    font-size: var(--font-size-xxl);
    font-weight: 600;
    color: var(--primary-color);
    padding-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  header.mobile{
    font-size: var(--font-size-xl);
    height: unset;
  }
</style>

<header class:mobile={$isMobile}>Octoarea</header>
