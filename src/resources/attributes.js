const mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

export const attributes = {
  otp: {
    keyboardType: 'number-pad',
    maxLength: 6,
    blurOnSubmit: false,
  },
  amount: {
    keyboardType: 'number-pad',
    blurOnSubmit: true,
    maxLength: 8,
    mask: mask,
  },
};
