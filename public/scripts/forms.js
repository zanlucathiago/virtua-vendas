import customer from './forms/customer.js';
import invoice from './forms/invoice.js';
import item from './forms/item.js';
import payment from './forms/payment.js';
import actionhelper from './helpers/actionhelper.js';
import helper from './helpers/helper.js';

const init = () => {
  for (const form of document.querySelectorAll('form')) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const { id } = e.target;

      if (id.includes('addpaymentform')) {
        payment.init(e, id);
      } else if (id.includes('addinvoiceform')) {
        invoice.init(e, id);
      } else if (id.includes('editcustomerform') || id === 'addcustomerform') {
        customer.init(e, id);
      } else if (id.includes('edititemform') || id === 'additemform') {
        item.init(e, id);
      } else if (e.target.className === 'delete-form') {
        const { modaldeleteids } = e.target.elements;
        const fullpath = e.target.getAttribute('action');
        const [, redirpath] = fullpath.split('/');

        actionhelper.post(
          fullpath,
          { modaldeleteids: modaldeleteids.value },
          (res) => {
            helper.notifySuccess(res.msg);

            setTimeout(() => {
              document.getElementById(`sidenav-${redirpath}`).click();
            }, 1000);
          }
        );
      }
    });
  }
};

export default { init };
