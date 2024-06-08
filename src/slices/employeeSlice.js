import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: {
    name: '',
    email: '',
    jobTitle: '',
    department: '',
    phone: '',
    employmentDate: '',
  },
  employeeList: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployeeData: (state, action) => {
            state.employee = action.payload;
        },
        clearEmployeeData: (state) => {
            state.employee = {
                name: '',
                email: '',
                jobTitle: '',
                department: '',
                phone: '',
                employmentDate: '',
            };
        },
        fetchEmployeeStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchEmployeeSuccess: (state, action) => {
            state.loading = false;
            state.employeeList = action.payload;
        },
        fetchEmployeeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { 
    setEmployeeData,
    clearEmployeeData,
    fetchEmployeeStart,
    fetchEmployeeSuccess,
    fetchEmployeeFailure,
} = employeeSlice.actions;

export default employeeSlice.reducer;
