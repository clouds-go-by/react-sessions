import {isFormFieldValid} from "./formsUtils";

describe("formUtils", () => {
  it("tests that the method isFormFieldValid correctly validates an email field", () => {
    const fieldId = "email";
    const value = "anca@gmail.com";
    expect(isFormFieldValid(fieldId, value)).toEqual(true);
  });

  it("tests that the method isFormFieldValid does not validate an erroneous email address", () => {
    const fieldId = "email";
    const value = "anca r.";
    expect(isFormFieldValid(fieldId, value)).toEqual(false);
  });

  it("tests that the method isFormFieldValid correctly validates a password field", () => {
    const fieldId = "password";
    const value = "pass123";
    expect(isFormFieldValid(fieldId, value)).toEqual(true);
  });

  it("tests that the method isFormFieldValid does not validate a password field if empty", () => {
    const fieldId = "password";
    const value = "";
    expect(isFormFieldValid(fieldId, value)).toEqual(false);
  });
});