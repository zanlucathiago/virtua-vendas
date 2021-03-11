import helper from './helper.js';

const init = () => {
  for (const form of document.querySelectorAll('form')) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const { id } = e.target;
      // debugger;
      if (id.includes('editcustomerform') || id === 'addcustomerform') {
        const [, entityId] = id.split('editcustomerform');

        const name = document.getElementById(`customername${entityId || ''}`)
          .value;

        if (!name) {
          helper.notifyWarning('O nome deve ser preenchido.');
        } else {
          e.currentTarget.submit();
        }
      } else if (id.includes('edititemform') || id === 'additemform') {
        const [, entityId] = id.split('edititemform');
        const name = document.getElementById(`itemname${entityId || ''}`).value;

        const price = parseFloat(
          document.getElementById(`itemsellingprice${entityId || ''}`).value
        );

        if (!name || !price) {
          helper.notifyWarning('O nome e o preço devem ser preenchidos.');
        } else {
          e.currentTarget.submit();
        }
      } else if (e.target.className === 'delete-form') {
        e.currentTarget.submit();
      }
    });
  }
};

export default { init };
