const init = (elems) => {
  M.Datepicker.init(elems, {
    container: document.getElementById('main-body'),
    format: 'dd/mm/yyyy',
    i18n: {
      cancel: 'Cancelar',
      months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      monthsShort: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
      weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    },
    isRTL: true,
  });
};

export default { init };
