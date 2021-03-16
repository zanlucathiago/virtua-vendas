import dropdowns from '../dropdowns.js';

const init = (data, rows) => {
  for (const r of rows) {
    dropdowns.init(
      r.getElementsByClassName('addinvoiceitemdropdown-trigger')[0],
      data
    );

    r.lastElementChild.firstElementChild.addEventListener('click', () => {
      r.remove();
    });
  }
};

const addinvoiceitem = (data, entityId) => {
  const table = document.getElementById(
    `invoiceitemstablebodymodal${entityId || ''}`
  );

  const index = table.lastElementChild
    ? parseInt(table.lastElementChild.getAttribute('current-index'), 10) + 1
    : 1;

  table.insertAdjacentHTML(
    'beforeend',
    `
  <tr current-index="${index}">
  <td>
    <a
      class="dropdown-trigger addinvoiceitemdropdown-trigger"
      data-target="dropdown-product-invoice-add-${entityId || ''}-${index}"
      href="#"
      id="dropdown-product-invoice-add-trigger-${entityId || ''}-${index}"
      style="position: relative"
    >
      <div style="margin: -15px 0">
        <input
          id="invoiceitemitemid-${entityId || ''}-${index}"
          type="text"
          class="validate"
        />
        <input
          id="invoiceitemitemidvalue-${entityId || ''}-${index}"
          name="itemId"
          required
          style="display: none"
        />                  <input
        id="invoiceitemid-${entityId || ''}-${index}"
        name="entityId"
        style="display: none"
      /></div
    ></a>
    <ul
      id="dropdown-product-invoice-add-${entityId || ''}-${index}"
      class="dropdown-content"
    ></ul>
  </td>
  <td>
    <div style="margin: -15px 0">
      <input
        id="quantity-${entityId || ''}-${index}"
        min="0.0001"
        name="quantity"
        step="0.0001"
        type="number"
        class="validate"
        value="1"
      />
    </div>
  </td>
  <td>
    <div style="margin: -15px 0; display: flex">
      <input disabled style="width: 32px" value="R$" />
      <input
        id="unitPrice-${entityId || ''}-${index}"
        min="0.01"
        name="unitPrice"
        step="0.01"
        type="number"
        class="validate"
      />
    </div>
  </td>
  <td>R$ 0,00</td>
  <td>
    <a
      class="waves-effect waves-light btn danger-background default-icon-button row-icon-button delete-invoiceitem-row"
      ><i class="material-icons">delete</i></a
    >
  </td>
</tr>
  `
  );

  init(data, [table.lastElementChild]);
};

const addinvoices = (entityId, invoices) => {
  const table = document.getElementById(
    `paymentstablebodymodal${entityId || ''}`
  );

  table.parentElement.parentElement.setAttribute('style', 'display: block');

  table.parentElement.parentElement.previousElementSibling.setAttribute(
    'style',
    'display: none'
  );

  table.innerHTML = invoices
    .map(
      (i, index) =>
        `
  <tr current-index="${index}">
  <td>
  ${i.date}
        <input
          name="invoiceId"
          style="display: none"
          value="${i.id}"
        />
  </td>
  <td>
      ${i.dueDate}
  </td>
  <td>
      ${i.number}
  </td>
  <td>
      ${i.valueLabel}
  </td>
  <td>
      ${i.dueValueLabel}
  </td>
  <td>
    <div style="margin: -15px 0; display: flex">
      <input disabled style="width: 32px" value="R$" />
      <input
        min="0.01"
        name="invoicePaymentValue"
        step="0.01"
        type="number"
        class="validate"
        value="${i.dueValue}"
      />
    </div>
  </td>
</tr>
  `
    )
    .join('');

  // init(data, [table.lastElementChild]);
};

export default { addinvoices, addinvoiceitem, init };
