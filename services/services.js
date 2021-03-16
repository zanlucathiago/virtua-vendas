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
};
