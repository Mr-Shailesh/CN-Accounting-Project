import { validatePassword } from "./constants";

export const firstNameRule = [
  {
    required: true,
    message: "Please enter firstName",
  },
];

export const lastNameRule = [
  {
    required: true,
    message: "Please enter lastName",
  },
];

export const emailRule = [
  {
    required: true,
    message: "Please enter email",
  },
  {
    type: "email",
    message: "Please enter valid email",
  },
];

export const phoneNoRule = [
  {
    required: true,
    message: "Please enter phone number",
  },

  ({ getFieldValue }) => ({
    validator() {
      if (getFieldValue("phone").length !== 10) {
        return Promise.reject(new Error("Please enter valid phone number"));
      }

      return Promise.resolve();
    },
  }),
];

export const addressRule = [
  {
    required: true,
    message: "Please enter your address",
  },
];

export const cityRule = [
  {
    required: true,
    message: "Please enter city",
  },
];

export const stateRule = [
  {
    required: true,
    message: "Please enter state",
  },
];

export const countryRule = [
  {
    required: true,
    message: "Please enter country",
  },
];

export const zipCodeRule = [
  {
    required: true,
    message: "Please enter zip code",
  },
];

export const passwordRule = [
  ({ getFieldValue }) => ({
    validator() {
      if (!validatePassword(getFieldValue("password"))) {
        if (!getFieldValue("password")) {
          return Promise.reject(new Error("Please enter password"));
        }
        return Promise.reject(new Error("Please enter strong password"));
      }
      return Promise.resolve();
    },
  }),
];

export const conPasswordRule = [
  {
    required: true,
    message: "Please enter confirm password",
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("Confirm password does not match with password")
      );
    },
  }),
];

export const contactUsFullNameRule = [
  {
    required: true,
    message: "Please enter fullName",
  },
];
export const contactUsMessageRule = [
  {
    required: true,
    message: "Please enter Message",
  },
]

export const dateRule = [
  {
    required: true,
    message: "Please select date",
  },
];

export const descriptionRule = [
  {
    required: true,
    message: "Please enter description",
  },
];