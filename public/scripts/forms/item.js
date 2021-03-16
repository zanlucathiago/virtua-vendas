import actionhelper from '../helpers/actionhelper.js';
import helper from '../helpers/helper.js';

const init = (e, id) => {
  const [, entityId] = id.split('edititemform');

  const {
    type,
    name,
    usageUnit,
    sellingPrice,
    account,
    description,
  } = e.target.elements;

  actionhelper.post(
    `/inventory/${entityId ? `edit/${entityId}` : 'add'}`,
    {
      type: type.value,
      name: name.value,
      usageUnit: usageUnit.value,
      sellingPrice: sellingPrice.value,
      account: account.value,
      description: description.value,
    },
    (res) => {
      helper.notifySuccess(res.msg);

      setTimeout(() => {
        document.getElementById('sidenav-inventory').click();
      }, 1000);
    }
  );
};

export default { init };
