export const isEmpty = value => {
  if (typeof value === 'string') {
    if (value.trim().length <= 0) {
      return false;
    } else {
      return true;
    }
  } else if (typeof value === 'number') {
    if (value.length <= 0) {
      return false;
    } else {
      return true;
    }
  }
};

export const checkLength = input => {
  if (input.value.length <= 0 || Number(input.value) <= 0) {
    return false;
  }
  return true;
};
