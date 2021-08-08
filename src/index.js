import menuItems from './menu.json';
import menuTemplate from './templates/menu.hbs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const THEME_KEY = 'Theme';

const menuListEl = document.querySelector('.js-menu');
const themeToggleEl = document.getElementById('theme-switch-toggle');
const bodyEl = document.querySelector('body');

menuListEl.innerHTML = menuTemplate(menuItems);

const toggleThemeClass = () => {
  const bodyClassList = bodyEl.classList;
  if (bodyClassList.contains(Theme.LIGHT)) {
    bodyClassList.replace(Theme.LIGHT, Theme.DARK);
    return;
  }
  bodyClassList.replace(Theme.DARK, Theme.LIGHT);
};

const onToggleChange = evt => {
  const isDarkTheme = evt.target.checked;
  const themeValue = isDarkTheme ? Theme.DARK : Theme.LIGHT;

  localStorage.setItem(THEME_KEY, themeValue);
  toggleThemeClass();
};

themeToggleEl.addEventListener('change', onToggleChange);

const setPreviousThemeOrDefault = () => {
  try {
    const prevThemeValue = localStorage.getItem(THEME_KEY);
    bodyEl.classList.add(prevThemeValue);

    if (prevThemeValue === Theme.DARK) {
      themeToggleEl.checked = true;
    }
  } catch {
    bodyEl.classList.add(Theme.LIGHT);
  }
};

setPreviousThemeOrDefault();
