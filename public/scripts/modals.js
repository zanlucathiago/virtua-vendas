// import autocompletes from './autocompletes.js';

// import autocompletes from './autocompletes.js';
import datepickers from './datepickers.js';
import dropdowns from './dropdowns.js';
import tablerow from './invoiceitem/tablerow.js';

const onOpenStart = (a, src) => {
  // debugger;
  if (a.id === 'addinvoice') {
    document
      .getElementById('additembutton')
      .addEventListener('click', tablerow.addinvoiceitem);

    datepickers.init(document.querySelectorAll('.datepicker'));
    fetch('/invoices/resources').then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw Error(data.msg);
      }

      dropdowns.init(
        document.getElementById('dropdown-customer-invoice-add-trigger'),
        data.customers
      );
      tablerow.clear();
      tablerow.addinvoiceitem(data.products);

      // autocompletes.init(data.customers);
      // }, 3000);
      // debugger;
    });
    // .catch((err) => {
    //   // debugger;

    //   M.toast({
    //     classes: 'danger-background',
    //     html: `
    // <div class="toast-content">
    //   <i class="material-icons toast-icon">
    //     report
    //   </i>
    //   <div>
    //     ${err.message}
    //   </div>
    // </div>`,
    //   });
    // });
  } else if (a.id.includes('editcustomermodal')) {
    const [
      id,
      ,
      name,
      company,
      email,
      phone,
      ,
      ,
      currency,
      paymentTerms,
      type,
    ] = src.parentElement.parentElement.children;

    const [
      businessInput,
      individualInput,
      companyPar,
      displayNamePar,
      emailPar,
      phonePar,
      currencyPar,
      paymentTermsPar,
    ] = document.getElementById(`editcustomerform${id.textContent}`);

    companyPar.value = company.textContent;
    displayNamePar.value = name.textContent;
    emailPar.value = email.textContent;
    phonePar.value = phone.textContent;

    for (const u of currencyPar.children) {
      if (u.value === currency.textContent) {
        u.setAttribute('selected', true);
        M.FormSelect.init(currencyPar);
      }
    }

    for (const u of paymentTermsPar.children) {
      if (u.value === paymentTerms.textContent) {
        u.setAttribute('selected', true);
        M.FormSelect.init(paymentTermsPar);
      }
    }

    // descriptionPar.value = description.textContent;

    // sellingPricePar.value = parseFloat(
    //   sellingPrice.textContent.split('R$ ')[1]
    // );

    if (businessInput.value === type.textContent) {
      businessInput.setAttribute('checked', '');
    } else if (individualInput.value === type.textContent) {
      individualInput.setAttribute('checked', '');
    }

    M.updateTextFields();
  } else if (a.className === 'modal delete-modal') {
    let ids = [];
    // debugger;
    for (const child of document.getElementsByClassName('generic-table-body')[0]
      .children) {
      if (
        child.children[1].firstElementChild.firstElementChild.firstElementChild
          .checked
      ) {
        ids = [...ids, child.firstElementChild.textContent];
      }
    }

    document.getElementById('modaldeleteids').value = JSON.stringify(ids);
  } else if (a.id.includes('edititemmodal')) {
    const [
      id,
      ,
      name,
      description,
      sellingPrice,
      usageUnit,
      account,
      type,
    ] = src.parentElement.parentElement.children;

    const [
      goodsInput,
      serviceInput,
      namePar,
      usageUnitPar,
      sellingPricePar,
      accountPar,
      descriptionPar,
    ] = document.getElementById(`edititemform${id.textContent}`);

    namePar.value = name.textContent;

    for (const u of usageUnitPar.children) {
      if (u.value === usageUnit.textContent) {
        u.setAttribute('selected', true);
        M.FormSelect.init(usageUnitPar);
      }
    }

    for (const u of accountPar.children) {
      if (u.value === account.textContent) {
        u.setAttribute('selected', true);
        M.FormSelect.init(accountPar);
      }
    }

    descriptionPar.value = description.textContent;

    sellingPricePar.value = parseFloat(
      sellingPrice.textContent.split('R$ ')[1]
    );

    if (goodsInput.value === type.textContent) {
      goodsInput.setAttribute('checked', '');
    } else if (serviceInput.value === type.textContent) {
      serviceInput.setAttribute('checked', '');
    }

    M.updateTextFields();
  }
};

// const onOpenEnd = (a, src) => {
// if (a.id === 'addinvoice') {
//   fetch('/invoices/resources')
//     .then(async (response) => {
//       const data = await response.json();

//       if (!response.ok) {
//         throw Error(data.msg);
//       }

//       // debugger;
//       const li = document.getElementById('dropdown-customer-invoice-add');

//       // debugger;
//       li.innerHTML = [
//         ...data.customers,
//         ...data.customers,
//         ...data.customers,
//         ...data.customers,
//       ]
//         .map(
//           (c) =>
//             `<li><a href="#!" id="dropdown-customer-invoice-add-${c.id}">${c.name}</a></li>`
//         )
//         .join('');
//       // M.Dropdown.getInstance(
//       //   document.getElementById('dropdown-customer-invoice-add-trigger')
//       // ).recalculateDimensions();
//       // setTimeout(() => {
//       // autocompletes.init(data.customers);
//       // }, 3000);
//       // debugger;
//     })
//     .catch((err) => {
//       // debugger;

//       M.toast({
//         classes: 'danger-background',
//         html: `
//         <div class="toast-content">
//           <i class="material-icons toast-icon">
//             report
//           </i>
//           <div>
//             ${err.message}
//           </div>
//         </div>`,
//       });
//     });
// }
// };

const init = () => {
  M.Modal.init(document.querySelectorAll('.modal'), {
    // onOpenEnd,
    onOpenStart,
  });
};

export default { init };
