module.exports = {
  times: function (obj, block) {
    const { rp, a, redirecturl } = obj;
    let accum = '';

    for (let i = 0; i < rp; ++i) {
      accum += block.fn({
        active: i + 1 === parseInt(a || '1', 10),
        label: i + 1,
        redirecturl,
      });
    }

    return accum;
  },
  iterator: function (obj, block) {
    let accum = block.fn({
      id: '',
      isGoods: true,
      isService: false,
      label: 'Lançar',
      redirecturl: 'add',
      index: '0',
      trstyle: 'display: none',
    });

    for (let i = 0; i < (obj || []).length; ++i) {
      accum += block.fn({
        label: 'Alterar',
        redirecturl: 'edit',
        index: `${i + 1}`,
        trstyle: 'display: table-row',
        ...obj[i],
      });
    }

    return accum;
  },
  invoiceitemrows: function (obj, block) {
    let accum = '';

    for (let i = 0; i < (obj || []).length; ++i) {
      // debugger;
      accum += block.fn({
        index: `${i + 1}`,
        ...obj[i],
      });
    }

    return accum;
  },
};
