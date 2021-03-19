import dropdowns from './dropdowns.js';
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
      classes: 'success-background',
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
  M.Sidenav.init(document.getElementById('slide-out'));
  initToastConfirmations();
  tablecheckboxes.init();
  forms.init();
  dropdowns.init(document.getElementById('avatar-topright-dropdown-trigger'));
  itemradios.init();
  itemselects.init();
  M.FormSelect.init(document.querySelectorAll('select'));
  itemselects.doUpdate();
  M.Tooltip.init(document.querySelectorAll('.tooltipped'));
  M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'));
  modals.init();
};

document.addEventListener('DOMContentLoaded', onContentLoad);
