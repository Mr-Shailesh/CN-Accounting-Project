export const INCOME_ADD_REQUEST = "INCOME_ADD_REQUEST";
export const INCOME_ADD_SUCCESS = "INCOME_ADD_SUCCESS";
export const INCOME_ADD_ERROR = "INCOME_ADD_ERROR";

export const INCOME_EDIT_REQUEST = "INCOME_EDIT_REQUEST";
export const INCOME_EDIT_SUCCESS = "INCOME_EDIT_SUCCESS";
export const INCOME_EDIT_ERROR = "INCOME_EDIT_ERROR";

export const INCOME_DELETE_REQUEST = "INCOME_DELETE_REQUEST";
export const INCOME_DELETE_SUCCESS = "INCOME_DELETE_SUCCESS";
export const INCOME_DELETE_ERROR = "INCOME_DELETE_ERROR";


export const INCOME_GET_REQUEST = "INCOME_GET_REQUEST";
export const INCOME_GET_SUCCESS = "INCOME_GET_SUCCESS";
export const INCOME_GET_ERROR = "INCOME_GET_ERROR";


export const EXPENSE_ADD_REQUEST = "EXPENSE_ADD_REQUEST";
export const EXPENSE_ADD_SUCCESS = "EXPENSE_ADD_SUCCESS";
export const EXPENSE_ADD_ERROR = "EXPENSE_ADD_ERROR";

export const EXPENSE_EDIT_REQUEST = "EXPENSE_EDIT_REQUEST";
export const EXPENSE_EDIT_SUCCESS = "EXPENSE_EDIT_SUCCESS";
export const EXPENSE_EDIT_ERROR = "EXPENSE_EDIT_ERROR";

export const EXPENSE_DELETE_REQUEST = "EXPENSE_DELETE_REQUEST";
export const EXPENSE_DELETE_SUCCESS = "EXPENSE_DELETE_SUCCESS";
export const EXPENSE_DELETE_ERROR = "EXPENSE_DELETE_ERROR";

export const EXPENSE_GET_REQUEST = "EXPENSE_GET_REQUEST";
export const EXPENSE_GET_SUCCESS = "EXPENSE_GET_SUCCESS";
export const EXPENSE_GET_ERROR = "EXPENSE_GET_ERROR";

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  income: { ...block, data: [] },
  incomeAdd: { ...block },
  incomeEdit: { ...block },
  incomeDelete: { ...block },
  expenses: { ...block, data: [] },
  expensesAdd: { ...block, },
  expensesEdit: { ...block, },
  expensesDelete: { ...block, },
};

export const DashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INCOME_GET_REQUEST:
      return { ...state, income: { ...state.income, loading: true, success: false } };
    case INCOME_GET_SUCCESS:
      return {
        ...state,
        income: {
          ...state.income,
          data: payload,
          loading: false,
          success: true,
          error: "",
        },
      };
    case INCOME_GET_ERROR:
      return {
        ...state,
        income: { ...state.income, loading: false, error: payload, success: false },
      };


    case INCOME_ADD_REQUEST:
      return { ...state, incomeAdd: { ...state.incomeAdd, loading: true, success: false } };
    case INCOME_ADD_SUCCESS:
      return {
        ...state,
        incomeAdd: {
          ...state.incomeAdd,
          loading: false,
          success: true,
          error: "",
        },
      };
    case INCOME_ADD_ERROR:
      return {
        ...state,
        incomeAdd: { ...state.incomeAdd, loading: false, error: payload, success: false },
      };

    case INCOME_EDIT_REQUEST:
      return { ...state, incomeEdit: { ...state.incomeEdit, loading: true, success: false } };
    case INCOME_EDIT_SUCCESS:
      return {
        ...state,
        incomeEdit: {
          ...state.incomeEdit,
          loading: false,
          success: true,
          error: "",
        },
      };
    case INCOME_EDIT_ERROR:
      return {
        ...state,
        incomeEdit: { ...state.incomeEdit, loading: false, error: payload, success: false },
      };

    case INCOME_DELETE_REQUEST:
      return { ...state, incomeDelete: { ...state.expensesDelete, loading: true, success: false } };
    case INCOME_DELETE_SUCCESS:
      return {
        ...state,
        incomeDelete: {
          ...state.expensesDelete,
          loading: false,
          success: true,
          error: "",
        },
      };
    case INCOME_DELETE_ERROR:
      return {
        ...state,
        incomeDelete: { ...state.expensesDelete, loading: false, error: payload, success: false },
      };


    case EXPENSE_ADD_REQUEST:
      return { ...state, expensesAdd: { ...state.expensesAdd, loading: true, success: false } };
    case EXPENSE_ADD_SUCCESS:
      return {
        ...state,
        expensesAdd: {
          ...state.expensesAdd,
          loading: false,
          success: true,
          error: "",
        },
      };
    case EXPENSE_ADD_ERROR:
      return {
        ...state,
        expensesAdd: { ...state.expensesAdd, loading: false, error: payload, success: false },
      };

    case EXPENSE_GET_REQUEST:
      return { ...state, expenses: { ...state.expenses, loading: true, success: false } };
    case EXPENSE_GET_SUCCESS:
      return {
        ...state,
        expenses: {
          ...state.expenses,
          data: payload,
          loading: false,
          success: true,
          error: "",
        },
      };
    case EXPENSE_GET_ERROR:
      return {
        ...state,
        expenses: { ...state.expenses, loading: false, error: payload, success: false },
      };

    case EXPENSE_EDIT_REQUEST:
      return { ...state, expensesEdit: { ...state.expensesEdit, loading: true, success: false } };
    case EXPENSE_EDIT_SUCCESS:
      return {
        ...state,
        expensesEdit: {
          ...state.expensesEdit,
          loading: false,
          success: true,
          error: "",
        },
      };
    case EXPENSE_EDIT_ERROR:
      return {
        ...state,
        expensesEdit: { ...state.expensesEdit, loading: false, error: payload, success: false },
      };

    case EXPENSE_DELETE_REQUEST:
      return { ...state, expensesDelete: { ...state.expensesDelete, loading: true, success: false } };
    case EXPENSE_DELETE_SUCCESS:
      return {
        ...state,
        expensesDelete: {
          ...state.expensesDelete,
          loading: false,
          success: true,
          error: "",
        },
      };
    case EXPENSE_DELETE_ERROR:
      return {
        ...state,
        expensesDelete: { ...state.expensesDelete, loading: false, error: payload, success: false },
      };

    default:
      return state;
  }
};
