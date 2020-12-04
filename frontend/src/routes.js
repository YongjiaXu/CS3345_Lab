import { AdminPage } from "../src/admin/adminPage";
import { AddCountry } from "./admin/addCountry";
import { CountryEditor } from "./admin/countryEditor";
import { CityEditor } from "./admin/cityEditor";
import { ManageReviews } from "./admin/manageReviews";
import { ManageStats } from "./admin/manageStats";
import { ManageUsers } from "./admin/manageUsers";
import { ViewAccount } from "./admin/viewAccount";
import { Dashboard } from "./components/dashboard";
import { LoginPage } from "./app/loginPage";
import { ManageCountry } from "./admin/manageCountry";
import { ManageCity } from "./admin/manageCity";
import { AddCity } from "./admin/addCity";
import { UserEditor } from "./admin/userEditor";
import { LoginOption } from "./admin/loginOption";

export const ROUTES = [
    { path: '/admin/:username/stats/addCity', component: AddCity },
    { path: '/admin/:username/stats/addCountry', component: AddCountry },
    { path: '/admin/:username/stats/city/edit/:city', component: CityEditor },
    { path: '/admin/:username/stats/country/edit/:country', component: CountryEditor },
    { path: '/admin/:username/account', component: ViewAccount },
    { path: '/admin/:username/users/edit/:user', component: UserEditor },
    { path: '/admin/:username/users', component: ManageUsers },
    { path: '/admin/:username/stats/country', component: ManageCountry },
    { path: '/admin/:username/stats/city', component: ManageCity },
    { path: '/admin/:username/stats', component: ManageStats },
    { path: '/admin/:username/reviews', component: ManageReviews },
    { path: '/admin/:username', component: AdminPage },
    { path: '/loginOption/:username', component: LoginOption },
]
