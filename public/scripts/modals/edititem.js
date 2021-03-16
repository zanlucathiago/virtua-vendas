const init = (src) => {
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

  sellingPricePar.value = parseFloat(sellingPrice.textContent.split('R$ ')[1]);

  if (goodsInput.value === type.textContent) {
    goodsInput.setAttribute('checked', '');
  } else if (serviceInput.value === type.textContent) {
    serviceInput.setAttribute('checked', '');
  }

  M.updateTextFields();
};

export default { init };
