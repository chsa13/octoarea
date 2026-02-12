<script lang="ts">
  import { locale, lang } from '../stores/lang';
  
  function switchLanguage() {
    $locale = $locale === 'ru' ? 'en' : 'ru';
  }
</script>

<div class="language-switcher">
  <button 
    class="switch-btn"
    class:en={$locale === 'en'}
    on:click={switchLanguage}
    title="Переключить язык / Switch language"
  >
    <span class="flag ru" class:active={$locale === 'ru'}></span>
    <div class="toggle"></div>
    <span class="flag en" class:active={$locale === 'en'}></span>
    
    <span class="label">
      {$locale === 'ru' ? 'РУ' : 'EN'}
    </span>
  </button>
</div>

<style>
  .language-switcher {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .switch-btn {
    position: relative;
    width: 80px;
    height: 36px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 18px;
    cursor: pointer;
    padding: 4px;
    box-shadow: 
      0 4px 15px rgba(102, 126, 234, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }
  
  .switch-btn:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 25px rgba(102, 126, 234, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
  
  .switch-btn:active {
    transform: translateY(0);
  }
  
  .flag {
    position: absolute;
    top: 4px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    transition: all 0.3s ease;
    z-index: 2;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }
  
  .ru {
    left: 4px;
    background: linear-gradient(135deg, #fd1d1d, #ff6b6b);
  }
  
  .en {
    right: 4px;
    background: linear-gradient(135deg, #00b09b, #96c93d);
  }
  
  .flag.active {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255,255,255,0.6);
  }
  
  .toggle {
    position: absolute;
    top: 4px;
    left: var(--toggle-left, 4px);
    width: 28px;
    height: 28px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 1;
  }
  
  .en ~ .toggle {
    left: 48px;
  }
  
  .label {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 11px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    z-index: 3;
    transition: opacity 0.2s ease;
  }
</style>
