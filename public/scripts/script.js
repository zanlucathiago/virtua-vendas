import forms from './forms.js';
import itemradios from './item/radios.js';
import itemselects from './item/selects.js';
import modals from './modals.js';
import tablecheckboxes from './table/checkboxes.js';

const messages = {
  '/inventory/delete': 'Os produtos foram excluídos.',
  '/inventory/add': 'O produto foi criado.',
  '/inventory/edit': 'O produto foi alterado.',
};

const initToastConfirmations = () => {
  const { pathname } = window.location;
  const [, , action] = pathname.split('/');

  if (action) {
    M.toast({
      classes: 'confirm-background',
      html: `
      <div class="toast-content">
        <i class="material-icons toast-icon">
          check_circle
        </i>
        <div>
          ${messages[pathname]}
        </div>
      </div>`,
    });
  }
};

const onContentLoad = () => {
  initToastConfirmations();
  tablecheckboxes.init();
  forms.init();
  itemradios.init();
  itemselects.init();
  M.FormSelect.init(document.querySelectorAll('select'));
  modals.init();
  M.Tooltip.init(document.querySelectorAll('.tooltipped'));
  M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'));
};

document.addEventListener('DOMContentLoaded', onContentLoad);
