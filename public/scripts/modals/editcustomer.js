const init = (src) => {
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

  if (businessInput.value === type.textContent) {
    businessInput.setAttribute('checked', '');
  } else if (individualInput.value === type.textContent) {
    individualInput.setAttribute('checked', '');
  }

  M.updateTextFields();
};

export default { init };
