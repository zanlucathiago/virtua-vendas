import datepickers from '../datepickers.js';
import dropdowns from '../dropdowns.js';
import actionhelper from '../helpers/actionhelper.js';
// import tablerow from '../invoiceitem/tablerow.js';

const init = (a) => {
  const [, entityId] = a.id.split('addpayment');
  const dateel = document.getElementById(`paymentdate${entityId || ''}`);
  datepickers.init(dateel);
  M.Datepicker.getInstance(dateel).setDate(new Date());

  if (entityId) {
    // debugger;
    const customerInput = document.getElementById(
      `paymentcustomerid${entityId}`
    );

    customerInput.setAttribute('disabled', 'disabled');

    const table = document.getElementById(
      `paymentstablebodymodal${entityId || ''}`
    );

    table.parentElement.parentElement.setAttribute('style', 'display: block');

    table.parentElement.parentElement.previousElementSibling.setAttribute(
      'style',
      'display: none'
    );

    // actionhelper.get(
    //   `/paymentsreceived/resources/${customerInput.value}/${entityId}`,
    //   (res) => {
    // debugger;
    // tablerow.addinvoices(entityId, res.invoices);
    // document.getElementById(`paymentValue${entityId}`).value = res.value;
    // M.updateTextFields();
    //   }
    // );
  } else {
    actionhelper.get('/paymentsreceived/resources', (data) => {
      dropdowns.init(
        document.getElementById(
          `dropdown-customer-payment-add-trigger${entityId || ''}`
        ),
        data.customers
      );
    });
  }
};

export default { init };
