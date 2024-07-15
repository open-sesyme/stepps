import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employee: {
    name: '',
    email: '',
    jobTitle: '',
    department: '',
    phone: '',
    employmentDate: '',
    profilePicture: '',
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
                profilePicture: '',
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
        updateProfilePicture: (state, action) => {
            const { email, profilePicture } = action.payload;
            const employee = state.employeeList.find(emp => emp.email === email);
            if (employee) {
                employee.profilePicture = profilePicture;
            }
        },
    },
});

export const { 
    setEmployeeData,
    clearEmployeeData,
    fetchEmployeeStart,
    fetchEmployeeSuccess,
    fetchEmployeeFailure,
    updateProfilePicture,
} = employeeSlice.actions;

export default employeeSlice.reducer;
