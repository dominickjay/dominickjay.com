<template>
    <div class="user-toggle">
        <div role="status" class="visually-hidden js-mode-status"></div>
        <label id="switch" class="switch">
            <span class="js-mode-toggle-text visually-hidden">Enable dark mode</span>
            <input id="slider" type="checkbox" class="js-mode-toggle">
            <span class="slider">
                <img src="/images/switch.png" alt="" srcset="">
            </span>
        </label>
    </div>
</template>

<script>

export default {
  mounted() {

    document.documentElement.classList.remove('no-js');
    const STORAGE_KEY = 'user-color-scheme';
    const COLOR_MODE_KEY = '--color-mode';

    const modeToggleButton = document.querySelector('.js-mode-toggle');
    const modeToggleText = document.querySelector('.js-mode-toggle-text');
    const modeStatusElement = document.querySelector('.js-mode-status');

    const getCSSCustomProp = propKey => {
      let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

      if (response.length) {
        response = response.replace(/\\"/g, '').trim();
      }

      return response;
    };

    const applySetting = passedSetting => {
      const currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

      if (currentSetting) {
        document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
        setButtonLabelAndStatus(currentSetting);
      } else {
        setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));
      }
    };

    const setButtonLabelAndStatus = currentSetting => {
      currentSetting === 'dark' ? document.getElementById('slider').setAttribute('checked', 'checked') : document.getElementById('slider').removeAttribute('checked');
    };

    const toggleSetting = () => {
      let currentSetting = localStorage.getItem(STORAGE_KEY);

      switch (currentSetting) {
        case null:
          currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
          break;
        case 'light':
          currentSetting = 'dark';
          break;
        case 'dark':
          currentSetting = 'light';
          break;
      }

      localStorage.setItem(STORAGE_KEY, currentSetting);

      return currentSetting;
    };

    modeToggleButton.addEventListener('click', evt => {
      evt.preventDefault();
      applySetting(toggleSetting());
    });

    applySetting();
  }
}

</script>

<style lang="scss" scoped>

.user-toggle {
  z-index: 1;
  width: 40px;
  height: 40px;
  position: absolute;
  margin: 0 auto;
  right: 100px;
  top: -20px;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  & img {
    margin: 0;
  }
}

.switch {
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

input[checked="checked"] + .slider img {
  transform: rotate(180deg);
  filter: invert(100%);
}

@media (max-width: 640px) {
  .user-toggle {
    top: -5px;
    right: 40px;
  }
}
</style>