import actionhelper from '../helpers/actionhelper.js';
import helper from '../helpers/helper.js';
import tablerow from '../invoiceitem/tablerow.js';

const init = (lis, input, data) => {
  for (const [index, ch] of lis) {
    ch.addEventListener('click', (e) => {
      input.value = e.target.textContent;

      if (input.id.includes('paymentcustomerid')) {
        const [, id] = input.id.split('paymentcustomerid');

        const hiddenInput = document.getElementById(
          `paymentcustomeridvalue${id || ''}`
        );

        hiddenInput.value = data[index].id;
        M.updateTextFields();

        actionhelper.get(
          `/paymentsreceived/resources/${data[index].id}`,
          (res) => {
            // debugger;
            tablerow.addinvoices(id, res.invoices);
            document.getElementById(`paymentValue${id}`).value = res.value;
            M.updateTextFields();
          }
        );
      } else if (input.id.includes('invoiceitemitemid-')) {
        const [, id] = input.id.split('invoiceitemitemid-');

        const hiddenInput = document.getElementById(
          `invoiceitemitemidvalue-${id || ''}`
        );

        hiddenInput.value = data[index].id;
        const pricefield = document.getElementById(`unitPrice-${id || ''}`);
        pricefield.value = data[index].sellingPrice;
      } else if (input.id.includes('invoicecustomerid')) {
        const [, id] = input.id.split('invoicecustomerid');

        const [day, month, year] = document
          .getElementById(`invoicedate${id || ''}`)
          .value.split('/');

        const hiddenInput = document.getElementById(
          `invoicecustomeridvalue${id || ''}`
        );

        hiddenInput.value = data[index].id;

        const paymentTermsSelect = document.getElementById(
          `invoicepaymentTerms${id || ''}`
        );

        paymentTermsSelect.value = data[index].paymentTerms;

        const materializeEl = M.FormSelect.getInstance(paymentTermsSelect);

        materializeEl.input.value = [
          { label: '15 dias', value: '15D' },
          { label: '30 dias', value: '30D' },
          { label: '45 dias', value: '45D' },
          { label: '60 dias', value: '60D' },
          { label: 'No recebimento', value: '0D' },
          { label: 'Final do mês atual', value: '0M' },
          { label: 'Final do próximo mês', value: '1M' },
        ].find((ele) => ele.value === data[index].paymentTerms).label;

        document.getElementById(
          `invoicedueDate${id || ''}`
        ).value = helper.dueDate(
          new Date(year, month - 1, day),
          paymentTermsSelect.value
        );

        M.updateTextFields();
      }
    });
  }
};

export default { init };
