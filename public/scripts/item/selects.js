const renderOption = (u) => `<option value="${u.value}">${u.label}</option>`;

const initItemSelectUsageunit = () => {
  for (const e of document.getElementsByClassName('item-usageunit-select')) {
    e.innerHTML = [
      { label: 'Selecione', value: '' },
      { label: 'Unidade', value: 'UN' },
      { label: 'Grama', value: 'G' },
      { label: 'Jogo', value: 'JOGO' },
      { label: 'Litro', value: 'LT' },
      { label: 'Megawatt Hora', value: 'MWHORA' },
      { label: 'Metro', value: 'METRO' },
      { label: 'Metro Cúbico', value: 'M3' },
      { label: 'Metro Quadrado', value: 'M2' },
      { label: 'Mil Unidades', value: '1000UN' },
      { label: 'Pares', value: 'PARES' },
      { label: 'Quilate', value: 'QUILAT' },
      { label: 'Quilograma', value: 'KG' },
    ]
      .map(renderOption)
      .join();
  }
};

const initItemSelectAccount = () => {
  for (const e of document.getElementsByClassName('item-account-select')) {
    e.innerHTML = [
      { label: 'Vendas', value: 'SALES' },
      { label: 'Desconto', value: 'DISCOUNT' },
      { label: 'Receita Geral', value: 'GENERAL_INCOME' },
      { label: 'Rendimento', value: 'INTEREST_INCOME' },
      { label: 'Taxa de Atraso', value: 'LATE_FEE_INCOME' },
      { label: 'Outras Cobranças', value: 'OTHER_CHARGES' },
      { label: 'Taxa de Entrega', value: 'SHIPPING_CHARGE' },
    ]
      .map(renderOption)
      .join();
  }
};

const initCustomerSelectCurrency = () => {
  for (const e of document.getElementsByClassName('customer-currency-select')) {
    e.innerHTML = [
      { label: 'BRL - Real brasileiro', value: 'BRL' },
      { label: 'USD - Dolar dos Estados Unidos', value: 'USD' },
      { label: 'EUR - Euro', value: 'EUR' },
      { label: 'JPY - Yen japonês', value: 'JPY' },
      { label: 'GBP - Libra esterlina', value: 'GBP' },
      { label: 'AUD - Dólar australiano', value: 'AUD' },
      { label: 'CAD - Dólar canadense', value: 'CAD' },
      { label: 'CHF - Franco suíço', value: 'CHF' },
      { label: 'CNY - Renminbi', value: 'CNY' },
      { label: 'HKD - Dólar de Hong Kong', value: 'HKD' },
      { label: 'NZD - Dólar neozelandês', value: 'NZD' },
      { label: 'SEK - Coroa sueca', value: 'SEK' },
      { label: 'KRW - Won sul-coreano', value: 'KRW' },
      { label: 'SGD - Dólar de Singapura', value: 'SGD' },
      { label: 'NOK - Coroa norueguesa', value: 'NOK' },
      { label: 'MXN - Peso mexicano', value: 'MXN' },
      { label: 'INR - Rupia indiana', value: 'INR' },
      { label: 'RUB - Rublo russo', value: 'RUB' },
      { label: 'ZAR - Rand sul-africano', value: 'ZAR' },
      { label: 'TRY - Lira turca', value: 'TRY' },
    ]
      .map(renderOption)
      .join();
  }
};

const initCustomerSelectPaymentterms = () => {
  for (const e of document.getElementsByClassName('paymentterms-select')) {
    e.innerHTML = [
      { label: '15 dias', value: '15D' },
      { label: '30 dias', value: '30D' },
      { label: '45 dias', value: '45D' },
      { label: '60 dias', value: '60D' },
      { label: 'No recebimento', value: '0D' },
      { label: 'Final do mês atual', value: '0M' },
      { label: 'Final do próximo mês', value: '1M' },
    ]
      .map(renderOption)
      .join();
  }
};

const init = () => {
  initItemSelectAccount();
  initItemSelectUsageunit();
  initCustomerSelectCurrency();
  initCustomerSelectPaymentterms();
};

export default { init };
