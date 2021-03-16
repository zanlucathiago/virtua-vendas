const init = (elems, onSelect = () => {}) => {
  M.Datepicker.init(elems, {
    autoClose: true,
    container: document.getElementById('main-body'),
    defaultDate: new Date(),
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
    onSelect,
    setDefaultDate: true,
  });
};

export default { init };
