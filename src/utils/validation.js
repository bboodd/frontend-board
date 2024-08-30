/**
 * 빈값 체크 함수
 * @param {*} field - input
 * @param {*} fieldName - 필드 이름
 * @returns 비어있지 않다면 true or Error
 */
const validateEmpty = (field, fieldName) => {
  //비어있지 않다면 true
  if (field.trim()) {
    return true;
  }

  alert(`${fieldName}을(를) 입력해 주세요.`);

  // throw new Error(`"${fieldName}" is required...`);
};

export { validateEmpty };
