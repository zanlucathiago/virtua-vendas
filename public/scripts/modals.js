import addinvoice from './modals/addinvoice.js';
import additem from './modals/additem.js';
import addpayment from './modals/addpayment.js';
import _delete from './modals/delete.js';
import editcustomer from './modals/editcustomer.js';

const onOpenStart = (a, src) => {
  if (a.id.includes('editcustomermodal')) {
    editcustomer.init(src);
  } else if (a.className === 'modal delete-modal') {
    _delete.init();
  }
};

const init = () => {
  const modals = document.querySelectorAll('.modal');

  M.Modal.init(modals, {
    onOpenStart,
  });

  for (const a of modals) {
    if (a.id.includes('addinvoice')) {
      addinvoice.init(a);
    } else if (a.id.includes('additem')) {
      additem.init(a);
    } else if (a.id.includes('addpayment')) {
      addpayment.init(a);
    }
  }
};

export default { init };
