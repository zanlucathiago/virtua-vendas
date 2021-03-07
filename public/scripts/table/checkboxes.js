const init = () => {
  const checks = document.getElementsByClassName('td-checkbox');

  for (const c of checks) {
    c.addEventListener('click', (e) => {
      const el = e.currentTarget.firstElementChild.firstElementChild;

      if (el.checked) {
        el.removeAttribute('checked');

        if (e.currentTarget.id === 'td-checkbox-main') {
          for (const ch of checks) {
            ch.firstElementChild.firstElementChild.removeAttribute('checked');
          }
        }
      } else {
        el.setAttribute('checked', 'checked');

        if (e.currentTarget.id === 'td-checkbox-main') {
          for (const ch of checks) {
            ch.firstElementChild.firstElementChild.setAttribute(
              'checked',
              'checked'
            );
          }
        }
      }
    });
  }
};

export default { init };
