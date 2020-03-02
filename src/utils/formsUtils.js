export const isFormFieldValid = (fieldId, value) => {
  switch (fieldId) {
    case "email":
      const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regEx.test(String(value).toLowerCase());
    case "password":
      return value.length > 0;
    default:
      return true;
  }
};