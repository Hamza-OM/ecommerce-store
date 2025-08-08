export const formatCurrency = (value, currency = 'USD', locale = 'en-US') => {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  } catch {
    return `$${Number(value).toFixed(2)}`;
  }
};

export const cn = (...classes) => classes.filter(Boolean).join(' ');
