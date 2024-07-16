import { ADD_EXPENSE, EDIT_EXPENSE, DELETE_EXPENSE, SEARCH_EXPENSE } from '../actions/expenseActions';

const initialState = {
  expenses: [],
  searchQuery: '',
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return { ...state, expenses: [...state.expenses, action.payload] };
    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map(exp =>
          exp.id === action.payload.id ? { ...exp, ...action.payload.updatedExpense } : exp
        ),
      };
    case DELETE_EXPENSE:
      return { ...state, expenses: state.expenses.filter(exp => exp.id !== action.payload) };
    case SEARCH_EXPENSE:
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

export default expenseReducer;
