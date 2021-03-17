const moment = require('moment');

module.exports = {
  getDate: (date) => moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
  getPrice: (value) => `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`,
  pp: 10,
  getStatus: (status) => {
    switch (status) {
      case 'DRAFT':
        return 'Rascunho';
      case 'PENDING_APPROVAL':
        return 'Falta aprovação';
      case 'ACCEPTED':
        return 'Aprovado';
      case 'REJECTED':
        return 'Rejeitado';
      case 'SENT':
        return 'Enviado';
      case 'PARTIALLY_PAID':
        return 'Pago parcial';
      case 'PAID':
        return 'Pago';
      case 'OVERDUE':
        return 'Atrasado';
      default:
        return '-';
    }
  },
  getMode: (status) => {
    switch (status) {
      case 'CASH':
        return 'Dinheiro';
      case 'BANK_REMITTANCE':
        return 'Remessa bancária';
      case 'BANK_TRANFER':
        return 'Transferência bancária';
      case 'CHECK':
        return 'Cheque';
      case 'CREDIT_CARD':
        return 'Cartão de crédito';
      default:
        return '-';
    }
  },
  getUsageUnit: (usageUnit) => {
    switch (usageUnit) {
      case 'UN':
        return 'Unidade';
      case 'G':
        return 'Grama';
      case 'JOGO':
        return 'Jogo';
      case 'LT':
        return 'Litro';
      case 'MWMHORA':
        return 'Megawatt Hora';
      case 'METRO':
        return 'Metro';
      case 'M3':
        return 'Metro Cúbico';
      case 'M2':
        return 'Metro Quadrado';
      case '1000UN':
        return 'Mil Unidades';
      case 'PARES':
        return 'Pares';
      case 'QUILAT':
        return 'Quilate';
      case 'KG':
        return 'Quilograma';
      default:
        return '';
    }
  },
};
