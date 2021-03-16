import actionhelper from '../helpers/actionhelper.js';
import helper from '../helpers/helper.js';

const init = (e, id) => {
  const [, entityId] = id.split('editcustomerform');

  const {
    company,
    currency,
    email,
    paymentTerms,
    phone,
    name,
    type,
  } = e.target.elements;

  actionhelper.post(
    `/contacts/${entityId ? `edit/${entityId}` : 'add'}`,
    {
      company: company.value,
      currency: currency.value,
      email: email.value,
      paymentTerms: paymentTerms.value,
      phone: phone.value,
      name: name.value,
      type: type.value,
    },
    (res) => {
      helper.notifySuccess(res.msg);

      setTimeout(() => {
        document.getElementById('sidenav-contacts').click();
      }, 1000);
    }
  );
};

export default { init };
