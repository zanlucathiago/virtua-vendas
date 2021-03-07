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

const init = () => {
  initItemSelectAccount();
  initItemSelectUsageunit();
};

export default { init };
