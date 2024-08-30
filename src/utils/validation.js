const validateEmpty = (field, fieldName) => {
  //비어있지 않다면 true
  if (field.value.trim()) {
    return true;
  }

  alert(`${fieldName}을(를) 입력해 주세요.`);

  throw new Error(`"${fieldName}" is required...`);
};

export { validateEmpty };
