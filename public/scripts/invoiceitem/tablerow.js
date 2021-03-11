import dropdowns from '../dropdowns.js';

const addinvoiceitem = (data) => {
  const table = document.getElementById('invoiceitemstablebody');
  const addButton = document.getElementById('additembutton');
  const id = parseInt(addButton.getAttribute('current-id'), 10);

  table.insertAdjacentHTML(
    'beforeend',
    `
  <tr>
  <td>
    <a
      class="dropdown-trigger"
      data-target="dropdown-product-invoice-add-${id}"
      href="#"
      id="dropdown-product-invoice-add-trigger-${id}"
      style="position: relative"
    >
      <div style="margin: -15px 0">
        <input
          id="invoiceitemitemid-${id}"
          name="customerId"
          type="text"
          class="validate"
        /></div
    ></a>
    <ul id="dropdown-product-invoice-add-${id}" class="dropdown-content">
</ul>
  </td>
  <td>
    <div style="margin: -15px 0">
      <input
        id="itemsellingprice-${id}"
        name="sellingPrice"
        type="number"
        class="validate"
      />
    </div>
  </td>
  <td>
    <div style="margin: -15px 0; display: flex">
      <input disabled style="width: 32px" value="R$" />
      <input
        id="itemsellingprice-${id}"
        min="0.01"
        name="sellingPrice"
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
  // debugger;
  if (id) {
    // debugger;
    dropdowns.init(
      document.getElementById(`dropdown-product-invoice-add-trigger-${id}`),
      table.firstElementChild.firstElementChild.lastElementChild.innerHTML
    );
  } else {
    dropdowns.init(
      document.getElementById('dropdown-product-invoice-add-trigger-0'),
      data
    );
  }
  // table.lastChild

  // for (const d of document.getElementsByClassName('delete-invoiceitem-row')) {
  const lastRow = table.lastElementChild;
  // if (id) {
  //   document.getElementById(`dropdown-product-invoice-add-${id}`).innerHTML =
  //     table.firstElementChild.firstElementChild.lastElementChild.innerHTML;
  // }
  lastRow.lastElementChild.firstElementChild.addEventListener('click', (e) => {
    // debugger;
    lastRow.remove();
  });
  addButton.setAttribute('current-id', `${id + 1}`);
  // }
};

const clear = () => {
  document.getElementById('invoiceitemstablebody').innerHTML = '';
};

export default { addinvoiceitem, clear };
