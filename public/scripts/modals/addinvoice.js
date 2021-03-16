import datepickers from '../datepickers.js';
import dropdowns from '../dropdowns.js';
import helper from '../helpers/helper.js';
import tablerow from '../invoiceitem/tablerow.js';

const init = (a) => {
  const [, entityId] = a.id.split('addinvoice');

  for (const opt of document.getElementById(
    `invoicepaymentTermscontainer${entityId || ''}`
  ).firstElementChild.children[1].children) {
    opt.addEventListener('click', () => {
      const [day, month, year] = document
        .getElementById(`invoicedate${entityId || ''}`)
        .value.split('/');

      const paymentTerms = document.getElementById(
        `invoicepaymentTerms${entityId || ''}`
      ).value;

      document.getElementById(
        `invoicedueDate${entityId || ''}`
      ).value = helper.dueDate(new Date(year, month - 1, day), paymentTerms);
    });
  }

  datepickers.init(document.getElementById(`invoicedueDate${entityId || ''}`));
  const dateel = document.getElementById(`invoicedate${entityId || ''}`);

  datepickers.init(dateel, (obj) => {
    const paymentTerms = document.getElementById(
      `invoicepaymentTerms${entityId || ''}`
    ).value;

    document.getElementById(
      `invoicedueDate${entityId || ''}`
    ).value = helper.dueDate(obj, paymentTerms);

    M.updateTextFields();
  });

  M.Datepicker.getInstance(dateel).setDate(new Date());

  fetch('/invoices/resources').then(async (response) => {
    const data = await response.json();

    if (!response.ok) {
      throw Error(data.msg);
    }

    document
      .getElementById(`additembutton${entityId || ''}`)
      .addEventListener('click', () =>
        tablerow.addinvoiceitem(data.products, entityId)
      );

    dropdowns.init(
      document.getElementById(
        `dropdown-customer-invoice-add-trigger${entityId || ''}`
      ),
      data.customers
    );

    const tablechildrenlist = Array.from(
      document.getElementById(`invoiceitemstablebody${entityId || ''}`).children
    );

    if (tablechildrenlist.length) {
      tablerow.init(data.products, tablechildrenlist);
    } else {
      tablerow.addinvoiceitem(data.products, entityId);
    }
  });
};

export default { init };
