import {
  EXPENSE_ADD_REQUEST,
  EXPENSE_DELETE_REQUEST,
  EXPENSE_EDIT_REQUEST,
  INCOME_ADD_REQUEST,
  INCOME_DELETE_REQUEST,
  INCOME_EDIT_REQUEST,
  EXPENSE_GET_REQUEST,
  INCOME_GET_REQUEST,
} from "./DashboardReducer";

export const addIncomeData = (payload) => ({
  type: INCOME_ADD_REQUEST,
  payload,
});
export const addExpenseData = (payload) => ({
  type: EXPENSE_ADD_REQUEST,
  payload,
});
export const editIncomeData = (payload) => ({
  type: INCOME_EDIT_REQUEST,
  payload,
});
export const editExpenseData = (payload) => ({
  type: EXPENSE_EDIT_REQUEST,
  payload,
});
export const deleteIncomeData = (payload) => ({
  type: INCOME_DELETE_REQUEST,
  payload,
});
export const deleteExpenseData = (payload) => ({
  type: EXPENSE_DELETE_REQUEST,
  payload,
});
export const getExpensesData = (payload) =>({
  type: EXPENSE_GET_REQUEST,
  payload,
})
export const getIncomeData = (payload) =>({
  type: INCOME_GET_REQUEST,
  payload,
})
