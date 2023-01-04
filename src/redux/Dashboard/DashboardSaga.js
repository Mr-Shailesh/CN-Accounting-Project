import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { call, all, put, takeLatest } from "redux-saga/effects";
import { Axios } from "../../api/axios";
import { getSimplifiedError } from "../../utils/error";
import {
  EXPENSE_ADD_ERROR,
  EXPENSE_ADD_REQUEST,
  EXPENSE_ADD_SUCCESS,
  EXPENSE_DELETE_ERROR,
  EXPENSE_DELETE_REQUEST,
  EXPENSE_DELETE_SUCCESS,
  EXPENSE_EDIT_ERROR,
  EXPENSE_EDIT_REQUEST,
  EXPENSE_EDIT_SUCCESS,
  EXPENSE_GET_ERROR,
  EXPENSE_GET_REQUEST,
  EXPENSE_GET_SUCCESS,
  INCOME_ADD_ERROR,
  INCOME_ADD_REQUEST,
  INCOME_ADD_SUCCESS,
  INCOME_DELETE_ERROR,
  INCOME_DELETE_REQUEST,
  INCOME_DELETE_SUCCESS,
  INCOME_EDIT_REQUEST,
  INCOME_EDIT_SUCCESS,
  INCOME_GET_ERROR,
  INCOME_GET_REQUEST,
  INCOME_GET_SUCCESS,
} from "./DashboardReducer";

async function addIncome(payload) {
  const userId = Cookies.get("localId");
  return await Axios.post(`income/${userId}.json`, payload);
}
function* handleIncomeAdd({ payload }) {
  try {
    const response = yield call(addIncome, payload);
    if (response) {
      yield put({
        type: INCOME_ADD_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: INCOME_ADD_ERROR,
      error: getSimplifiedError(error),
    });
    if (error) {
      toast(getSimplifiedError(error), { type: "error" });
    }
  }
}

async function addExpense(payload) {
  const userId = Cookies.get("localId");
  return await Axios.post(`expense/${userId}.json`, payload);
}
function* handleExpenseAdd({ payload }) {
  try {
    const response = yield call(addExpense, payload);
    if (response) {
      yield put({
        type: EXPENSE_ADD_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: EXPENSE_ADD_ERROR,
      error: getSimplifiedError(error),
    });
    if (error) {
      toast(getSimplifiedError(error), { type: "error" });
    }
  }
}

async function editIncome({ uniqueKey, ...payload }) {
  const userId = Cookies.get("localId");
  return await Axios.put(`income/${userId}/${uniqueKey}.json`, payload);
}
function* handleIncomeEdit({ payload }) {
  try {
    const response = yield call(editIncome, payload);
    if (response) {
      yield put({
        type: INCOME_EDIT_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: INCOME_DELETE_ERROR,
      error: getSimplifiedError(error),
    });
    if (error) {
      toast(getSimplifiedError(error), { type: "error" });
    }
  }
}

async function editExpense({ uniqueKey, ...payload }) {
  const userId = Cookies.get("localId");
  return await Axios.put(`expense/${userId}/${uniqueKey}.json`, payload);
}
function* handleExpenseEdit({ payload }) {
  try {
    const response = yield call(editExpense, payload);
    if (response) {
      yield put({
        type: EXPENSE_EDIT_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: EXPENSE_EDIT_ERROR,
      error: getSimplifiedError(error),
    });
    if (error) {
      toast(getSimplifiedError(error), { type: "error" });
    }
  }
}


async function getExpense() {
  const userId = Cookies.get("localId");
  return await Axios.get(`expense/${userId}.json`);
}
function* handleExpenseGet({ payload }) {
  try {
    const response = yield call(getExpense, payload);
      yield put({
        type: EXPENSE_GET_SUCCESS,
        payload: response,
      });
  } catch (error) {
    yield put({
      type: EXPENSE_GET_ERROR,
      error: getSimplifiedError(error),
    });
    if (error) {
      toast(getSimplifiedError(error), { type: "error" });
    }
  }
}



async function deleteIncome(payload) {
  const userId = Cookies.get("localId");
  return await Axios.delete(`income/${userId}/${payload}.json`);
}

function* handleIncomeDelete({ payload }) {
  try {
    const response = yield call(deleteIncome, payload);
    yield put({
      type: INCOME_DELETE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: INCOME_DELETE_ERROR,
      error: getSimplifiedError(error),
    });
    if (error) {
      toast(getSimplifiedError(error), { type: "error" });
    }
  }
}


async function getIncome() {
  const userId = Cookies.get("localId");
  return await Axios.get(`income/${userId}.json`);
}
function* handleIncomeGet({ payload }) {
  try {
    const response = yield call(getIncome, payload);
      yield put({
        type: INCOME_GET_SUCCESS,
        payload: response,
      });
  } catch (error) {
    yield put({
      type: INCOME_GET_ERROR,
      error: getSimplifiedError(error),
    });
    if (error) {
      toast(getSimplifiedError(error), { type: "error" });
    }
  }
}


async function deleteExpense(payload) {
  const userId = Cookies.get("localId");
  return await Axios.delete(`expense/${userId}/${payload}.json`);
}

function* handleExpenseDelete({ payload }) {
  try {
    let response = yield call(deleteExpense, payload);
    yield put({
      type: EXPENSE_DELETE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: EXPENSE_DELETE_ERROR,
      error: getSimplifiedError(error),
    });
    if (error) {
      toast(getSimplifiedError(error), { type: "error" });
    }
  }
}

export default all([
  takeLatest(INCOME_ADD_REQUEST, handleIncomeAdd),
  takeLatest(INCOME_EDIT_REQUEST, handleIncomeEdit),
  takeLatest(INCOME_DELETE_REQUEST, handleIncomeDelete),
  takeLatest(INCOME_GET_REQUEST, handleIncomeGet),

  takeLatest(EXPENSE_EDIT_REQUEST, handleExpenseEdit),
  takeLatest(EXPENSE_ADD_REQUEST, handleExpenseAdd),
  takeLatest(EXPENSE_DELETE_REQUEST, handleExpenseDelete),
  takeLatest(EXPENSE_GET_REQUEST, handleExpenseGet),
]);
