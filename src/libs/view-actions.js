import { viewStore } from "./view-store";


export const disablePage = () => {
    const main = document.querySelector('main') || {};

    document.body.classList.add('overflow-hidden');
    main.inert = true;
}

export const enablePage = () => {
    const main = document.querySelector('main') || {};

    document.body.classList.remove('overflow-hidden');
    main.inert = false;
}

export const openNavigationDrawer = viewStore.action(() => {
    disablePage();
    return {isNavigationDrawerOpen: true};
  });
  
  export const closeNavigationDrawer = viewStore.action(() => {
    enablePage();
    return {isNavigationDrawerOpen: false};
  });
  