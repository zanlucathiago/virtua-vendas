import listitem from './dropdown/listitem.js';

const renderOptions = (data, input) => {
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

  listitem.init(Array.from(li.children).entries(), input, data);
};

const init = (el, data) => {
  let input;

  if (data) {
    input = el.firstElementChild.firstElementChild;
    renderOptions(data, input);
  } else {
    document.getElementById('logout-btn').addEventListener('click', () => {
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
