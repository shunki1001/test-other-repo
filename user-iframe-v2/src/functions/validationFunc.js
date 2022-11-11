const validationFunc = (index, validationText) => {
  switch (index) {
    case "name":
      if (validationText.length > 0) {
        return true;
      } else {
        return false;
      }

    case "enterprise":
      if (validationText.length > 0) {
        return true;
      } else {
        return false;
      }
    case "email":
      const emailRegex =
        /^([a-zA-Z0-9])+([a-zA-Z0-9._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9._-]+)+$/;
      const emailRegex2 = /^(?!.*(gmail|yahoo|icloud.com|outlook.com)).*$/;
      if (validationText.length > 0) {
        if (
          validationText.match(emailRegex) &&
          validationText.match(emailRegex2)
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    case "phone":
      if (validationText.length > 0) {
        return true;
      } else {
        return false;
      }
    case "address":
      if (validationText.length > 0) {
        return true;
      } else {
        return false;
      }
    default:
      return false;
  }
};

export default validationFunc;
