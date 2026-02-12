<script lang="ts">
    import { isMobile } from "../stores/isMobile";
    import LanguageSwitcher from "../components/LanguageSwitcher.svelte";
</script>
<style>
  header{
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
    height: 120px;
    font-size: var(--font-size-xxl);
    font-weight: 600;
    color: var(--primary-color);
    padding-bottom: var(--s-2);
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
<!-- <LanguageSwitcher></LanguageSwitcher> -->