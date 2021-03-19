const remove = (list) => {
  list.setAttribute('style', 'background-color: #FFFFFF');
  list.firstElementChild.setAttribute('style', 'color: #000000');

  for (const en of Array.from(list.querySelectorAll('input'))) {
    en.removeAttribute('disabled');
  }
};

const add = (list) => {
  list.setAttribute('style', 'background-color: #e0e0e0');
  list.firstElementChild.setAttribute('style', 'color: #9e9e9e');

  for (const en of Array.from(list.querySelectorAll('input'))) {
    en.setAttribute('disabled', 'disabled');
  }
};

const doUpdate = (a, textContent) => {
  const sellingTab = a.querySelector('.selling-tab');
  const purchaseTab = a.querySelector('.purchase-tab');

  if (textContent === 'Revenda') {
    remove(sellingTab);
    remove(purchaseTab);
  } else if (textContent === 'Venda') {
    remove(sellingTab);
    add(purchaseTab);
  } else if (textContent === 'Compra') {
    add(sellingTab);
    remove(purchaseTab);
  }
};

const updateTabViews = (a, li) => {
  const { textContent } = li.firstElementChild;
  doUpdate(a, textContent);
};

const init = (a) => {
  for (const li of Array.from(
    a.querySelector('.item-class-select').parentElement.children[1].children
  )) {
    li.addEventListener('click', () => updateTabViews(a, li));
  }
};

export default { doUpdate, init };
