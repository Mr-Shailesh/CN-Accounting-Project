import Profile from "./pages/Profile";
import Calendar from "./pages/calendar";
import Dashboard from "./pages/dashboard";
import Income from "./pages/income";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import ContactUs from "./pages/ContactUs";
import Expense from "./pages/expense";

const routes = [
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    isPrivate: false,
    layout: "auth",
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    isPrivate: false,
    layout: "auth",
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/forgotPassword",
    name: "ForgotPasswordPage",
    component: ForgotPassword,
    isPrivate: false,
    layout: "auth",
  },
  {
    path: "/resetPassword",
    name: "resetPasswordPage",
    component: ResetPassword,
    isPrivate: false,
    layout: "auth",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/income",
    name: "IncomeData",
    component: Income,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: ContactUs,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/expense",
    name: "ExpenseData",
    component: Expense,
    isPrivate: true,
    layout: "private",
  },
];

export default routes;
