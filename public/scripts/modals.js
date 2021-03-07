const onOpenStart = (a, src) => {
  if (a.id === 'inventorydeletemodal') {
    let ids = [];

    for (const child of document.getElementById('inventorytablebody')
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

const init = () => {
  M.Modal.init(document.querySelectorAll('.modal'), {
    onOpenStart,
  });
};

export default { init };
