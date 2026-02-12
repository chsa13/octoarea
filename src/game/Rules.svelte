<script lang="ts">
  import { lang } from "../stores/lang";
  import { isMobile } from '../stores/isMobile';
</script>

<style>
  p{
    text-align: start;
    min-width: 300px;
    font-size: var(--font-size-normal);
  }
  p.mobile{
    padding-top: 0px;
  }
</style>

<p class:mobile={$isMobile}>
  <span><b>{$lang("Goal")}:</b> {$lang("GoalText")}.</span><br>
  <span><b>{$lang("Rule")}:</b> {$lang("RuleText")}.</span><br>
  <span><b>{$lang("Play")}:</b> {$lang("PlayText")}.</span><br>
</p>