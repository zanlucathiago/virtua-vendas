import actionhelper from '../helpers/actionhelper.js';
import helper from '../helpers/helper.js';

const init = (e, id) => {
  const [, entityId] = id.split('additemform');

  const {
    itemClass,
    name,
    usageUnit,
    sellingPrice,
    purchasePrice,
    sellingAccount,
    purchaseAccount,
    sellingDescription,
    purchaseDescription,
  } = e.target.elements;

  actionhelper.post(
    `/inventory/${entityId ? `edit/${entityId}` : 'add'}`,
    {
      itemClass: itemClass.value,
      type: e.target.querySelector('input[name="type"]:checked').value,
      name: name.value,
      usageUnit: usageUnit.value,
      sellingPrice: sellingPrice.value,
      purchasePrice: purchasePrice.value,
      sellingAccount: sellingAccount.value,
      purchaseAccount: purchaseAccount.value,
      sellingDescription: sellingDescription.value,
      purchaseDescription: purchaseDescription.value,
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
