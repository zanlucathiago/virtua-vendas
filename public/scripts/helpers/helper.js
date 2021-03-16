const notifyWarning = (message) => {
  M.toast({
    classes: 'warning-background',
    html: `
      <div class="toast-content">
        <i class="material-icons toast-icon">
          warning
        </i>
        <div>
          ${message}
        </div>
      </div>`,
  });
};

const notifyError = (message) => {
  M.toast({
    classes: 'danger-background',
    html: `
      <div class="toast-content">
        <i class="material-icons toast-icon">
          report
        </i>
        <div>
          ${message}
        </div>
      </div>`,
  });
};

const notifySuccess = (message) => {
  M.toast({
    classes: 'success-background',
    html: `
      <div class="toast-content">
        <i class="material-icons toast-icon">
        check_circle
        </i>
        <div>
          ${message}
        </div>
      </div>`,
  });
};

const dueDate = (date, terms) => {
  const result = new Date(date);

  switch (terms) {
    case '15D':
      result.setDate(result.getDate() + 15);
      break;
    case '30D':
      result.setDate(result.getDate() + 30);
      break;
    case '45D':
      result.setDate(result.getDate() + 45);
      break;
    case '60D':
      result.setDate(result.getDate() + 60);
      break;
    case '0D':
      result.setDate(result.getDate());
      break;
    case '0M':
      result.setMonth(result.getMonth() + 1);
      result.setDate(1);
      result.setDate(result.getDate() - 1);
      break;
    case '1M':
      result.setMonth(result.getMonth() + 2);
      result.setDate(1);
      result.setDate(result.getDate() - 1);
      break;
    default:
      break;
  }

  return result.toLocaleDateString('pt-BR');
};

export default {
  dueDate,
  notifyWarning,
  notifyError,
  notifySuccess,
};
