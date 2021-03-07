const onItemCheckType = (type) => {
  for (const e of document.getElementsByClassName(`item-type-${type}-input`)) {
    e.setAttribute('checked', '');
  }

  for (const el of document.getElementsByClassName(`item-type-${type}-input`)) {
    el.removeAttribute('checked');
  }
};

const onItemCheckTypeGoods = () => onItemCheckType('goods');

const onItemCheckTypeService = () => onItemCheckType('service');

const init = () => {
  for (const e of document.getElementsByClassName('item-type-goods-label')) {
    e.addEventListener('click', onItemCheckTypeGoods);
  }

  for (const el of document.getElementsByClassName('item-type-service-label')) {
    el.addEventListener('click', onItemCheckTypeService);
  }
};

export default { init };
