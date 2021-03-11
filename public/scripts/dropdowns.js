const renderOptions = (data, input) => {
  // debugger;
  const li = document.getElementById(
    input.parentElement.parentElement.getAttribute('data-target')
  );

  li.innerHTML = Array.isArray(data)
    ? data
        .filter((d) =>
          `${d.id} - ${d.name}`
            .toLowerCase()
            .includes((input.value || '').toLowerCase())
        )
        .map(
          (c) =>
            `<li><a href="#!" id="dropdown-customer-invoice-add-${c.id}">${c.name}</a></li>`
        )
        .join('')
    : data;

  for (const ch of li.children) {
    ch.addEventListener('click', (e) => {
      input.value = e.target.textContent;
      M.updateTextFields();
    });
  }
};

const init = (el, data) => {
  // debugger;
  let input;

  if (data) {
    // debugger;
    input = el.firstElementChild.firstElementChild;
    renderOptions(data, input);
  } else {
    document.getElementById('logout-btn').addEventListener('click', (e) => {
      document.cookie = 'token=""';
      const form = document.createElement('form');
      form.method = 'GET';
      form.action = '/';
      document.body.appendChild(form);
      form.submit();
    });
  }

  M.Dropdown.init(el, {
    coverTrigger: false,
    hover: !data,
    onOpenEnd: () => {
      if (data) {
        input.focus();

        input.addEventListener('keyup', () => {
          renderOptions(data, input);
          M.Dropdown.getInstance(el).recalculateDimensions();
        });
      }
    },
  });
};

export default { init };
