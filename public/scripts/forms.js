const init = () => {
  for (const form of document.querySelectorAll('form')) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const { id } = e.target;

      if (id.includes('edititemform') || id === 'additemform') {
        const [, entityId] = id.split('edititemform');
        const name = document.getElementById(`itemname${entityId || ''}`).value;

        const price = parseFloat(
          document.getElementById(`itemsellingprice${entityId || ''}`).value
        );

        if (!name || !price) {
          M.toast({
            classes: 'warning-background',
            html: `
            <div class="toast-content">
              <i class="material-icons toast-icon">
                warning
              </i>
              <div>
                O nome e o preço precisam ser preenchidos.
              </div>
            </div>`,
          });
        } else {
          e.currentTarget.submit();
        }
      } else if (id === 'deleteitemsform') {
        e.currentTarget.submit();
      }
    });
  }
};

export default { init };
