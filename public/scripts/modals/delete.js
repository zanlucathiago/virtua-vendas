const init = () => {
  let ids = [];

  for (const child of document.getElementsByClassName('generic-table-body')[0]
    .children) {
    if (
      child.children[1] &&
      child.children[1].firstElementChild.firstElementChild.firstElementChild
        .checked
    ) {
      ids = [...ids, child.firstElementChild.textContent];
    }
  }

  document.getElementById('modaldeleteids').value = JSON.stringify(ids);
};

export default { init };
