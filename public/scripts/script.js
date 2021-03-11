// import autocompletes from './autocompletes.js';
import dropdowns from './dropdowns.js';
import forms from './forms.js';
import tablerow from './invoiceitem/tablerow.js';
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
  // tablerow.addinvoiceitem();
  initToastConfirmations();
  tablecheckboxes.init();
  forms.init();
  // autocompletes.init();
  dropdowns.init(document.getElementById('avatar-topright-dropdown-trigger'));
  itemradios.init();
  itemselects.init();
  M.FormSelect.init(document.querySelectorAll('select'));
  M.Tooltip.init(document.querySelectorAll('.tooltipped'));
  M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'));
  modals.init();
};

document.addEventListener('DOMContentLoaded', onContentLoad);
