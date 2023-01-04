
export const addExpensesSuccess = ({ dashboard }) => dashboard.expensesAdd.success;
export const expensesData = ({ dashboard }) => dashboard.expenses.data;
export const addIncomeSuccess = ({ dashboard }) => dashboard.incomeAdd.success;
export const incomeDatas = ({ dashboard }) => dashboard.income.data;
export const expensesDeleteSuccess = ({dashboard})=> dashboard.expensesDelete.success;
export const incomeDeleteSuccess = ({dashboard}) => dashboard.incomeDelete.success;
export const deleteExpensesLoading = ({dashboard}) => dashboard.expensesDelete.loading;
export const deleteIncomeLoading = ({dashboard}) => dashboard.incomeDelete.loading;
export const addExpensesLoading = ({dashboard}) => dashboard.expenses.loading;
export const addIncomeLoading = ({dashboard}) => dashboard.income.loading;
export const expensesEditLoading = ({ dashboard }) =>
  dashboard.expensesEdit.loading;
export const expenseEditSuccess = ({ dashboard }) =>
  dashboard.expensesEdit.success;
export const incomeEditLoading = ({ dashboard }) =>
  dashboard.incomeEdit.loading;
  export const incomeEditSuccess = ({ dashboard }) =>
  dashboard.incomeEdit.success;