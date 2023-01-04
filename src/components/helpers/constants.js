export const validatePassword = (value = "") => {
  // Note: We can use regex /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%^&]).{8})/ to validate password
  // instead of below logic, but regex contains look ahead operations and it is not supporting in safari as of now
  // until safari and IE doesn't support it, we will use below logic

  if (value.length < 8) {
    // password should be at least 8 characters
    return false;
  }
  if (value.search(/[a-z]/) < 0) {
    // password should have at least 1 lowercase character
    return false;
  }
  if (value.search(/[A-Z]/) < 0) {
    // password should have at least 1 uppercase character
    return false;
  }
  if (value.search(/[0-9]/) < 0) {
    // password should have at least 1 digit
    return false;
  }
  if (value.search(/[~`!@#$%^&*(),./;'[\]|}{":?><_+\-= ]/) < 0) {
    // password should have at least 1 special character
    return false;
  }
  return true;
};
