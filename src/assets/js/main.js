const PixMapper = $(() => {
  'use strict';

  const Main = {
    init() {
      console.info( 'Hello Bitmap Editor!!' );

      this.initEvents();
    },

    initEvents() {
      var self = this;

      this.getGutter().addEventListener('mousedown', function (e) {
        self.resizePanes(e)
      });

      this.getLoadDataSubmit().addEventListener('click', () => void this.loadData() );
    },

    getLoadDataSubmit() {
      return document.querySelector('#loadInputData');
    },

    getGutter() {
      return document.querySelector('.gutter');
    },

    getLeftPane() {
      return document.querySelector('.pane__left');
    },

    getRightPane() {
      return document.querySelector('.pane__right');
    },

    getUserData() {
      return document.querySelector('#input__data').value;
    },

    loadData() {
      const currentUserData = this.getUserData();
      const userDataParsed = currentUserData.split('\n');
      console.info( 'loading user data: ', currentUserData );
      loadUserDataIntoEditor(userDataParsed);
    },

    resizePanes(e) {
      const leftPane =  this.getLeftPane();
      // const rightPane = this.getRightPane();

      window.addEventListener('mousemove', mousemove);
      window.addEventListener('mouseup', mouseup);

      let prevX = e.x;
      const leftPanel = leftPane.getBoundingClientRect();

      function mousemove(e) {
        let newX = prevX - e.x;
        leftPane.style.width = leftPanel.width - newX + 'px';
      }

      function mouseup () {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);
      }
    }
  };

  // Initializing
  Main.init();

  return Main;
});
