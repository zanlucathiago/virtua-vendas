import actionhelper from '../helpers/actionhelper.js';
import helper from '../helpers/helper.js';

const init = (e, id) => {
  const [, entityId] = id.split('addinvoiceform');

  const {
    customerId,
    number,
    order,
    date,
    paymentTerms,
    dueDate,
  } = e.target.elements;

  actionhelper.post(
    `/invoices/${entityId ? `edit/${entityId}` : 'add'}`,
    {
      customerId: customerId.value,
      number: number.value,
      order: order.value,
      date: date.value,
      paymentTerms: paymentTerms.value,
      dueDate: dueDate.value,
      invoiceitems: Array.from(e.target.querySelector('tbody').children).map(
        (ev) => ({
          id: ev.querySelector('[name="entityId"]').value,
          itemId: ev.querySelector('[name="itemId"]').value,
          quantity: parseFloat(
            ev.querySelector('[name="quantity"]').value || '0'
          ),
          unitPrice: parseFloat(
            ev.querySelector('[name="unitPrice"]').value || '0'
          ),
        })
      ),
      status: 'DRAFT',
    },
    (res) => {
      helper.notifySuccess(res.msg);

      setTimeout(() => {
        document.getElementById('sidenav-invoices').click();
      }, 1000);
    }
  );
};

export default { init };
