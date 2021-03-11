const init = (customers) => {
  const data = {};

  for (const customer of customers) {
    data[customer] = null;
  }

  const elem = document.querySelector('#dropdowner');
  // debugger;
  // const instance = M.Autocomplete.getInstance(elem);
  if (elem) {
    M.Dropdown.init(elem, {
      data,
      limit: 7,
      // onAutocomplete: () => {
      //   debugger;
      // },
      // sortFunction: () => {
      //   debugger;
      // },
    });
  } else {
    // debugger;
  }
};

export default { init };
