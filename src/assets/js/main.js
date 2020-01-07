const PixMapper = $(() => {
  'use strict';

  const Main = {
    init() {
      console.info( 'Hello Bitmap Editor!!' );

      this.initEvents();
      this.checkForCookiesBar();
    },

    initEvents() {
      $('.cookies__bar__button--close').on('click', this.closeCookiesBar)
    },

    checkForCookiesBar() {
      const userSettings = localStorage.getItem('PixMapper') || "{}";
      const { cookiesApproved } = JSON.parse(userSettings);

      if (!cookiesApproved) {
        $('#cookies__bar').show();
      }
    },

    closeCookiesBar(e) {
      e.preventDefault();
      e.stopPropagation();
      localStorage.setItem('PixMapper', JSON.stringify({ cookiesApproved: true }));

      $('#cookies__bar').fadeOut();

      return false;
    }
  };

  // Initializing
  Main.init();

  return Main;
});
