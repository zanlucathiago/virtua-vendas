import actionhelper from '../helpers/actionhelper.js';
import helper from '../helpers/helper.js';

const init = (e, id) => {
  const [, entityId] = id.split('addpaymentform');

  const {
    customerId,
    number,
    value,
    date,
    mode,
    reference,
    account,
  } = e.target.elements;

  actionhelper.post(
    `/paymentsreceived/${entityId ? `edit/${entityId}` : 'add'}`,
    {
      customerId: customerId.value,
      value: value.value,
      date: date.value,
      number: number.value,
      mode: mode.value,
      account: account.value,
      reference: reference.value,
      invoicepayments: Array.from(e.target.querySelector('tbody').children).map(
        (ev) => ({
          id: ev.querySelector('[name="entityId"]').value,
          invoiceId: ev.querySelector('[name="invoiceId"]').value,
          value: ev.querySelector('[name="invoicePaymentValue"]').value,
        })
      ),
    },
    (res) => {
      helper.notifySuccess(res.msg);

      setTimeout(() => {
        document.getElementById('sidenav-paymentsreceived').click();
      }, 1000);
    }
  );
};

export default { init };
