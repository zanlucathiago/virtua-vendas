export default {
  notifyWarning: (message) => {
    M.toast({
      classes: 'warning-background',
      html: `
        <div class="toast-content">
          <i class="material-icons toast-icon">
            warning
          </i>
          <div>
            ${message}
          </div>
        </div>`,
    });
  },
};
