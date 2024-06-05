import { DashboardScene } from "./scenes/dashboard/dashboard.scene";
import { EditFightScene } from "./scenes/editFlight/editFlight.scene";
import { LoginScene } from "./scenes/login/login.scene";
import { NewFlightScene } from "./scenes/newFlight/newFlight.scene";
import { RegisterScene } from "./scenes/register/register.scene";

export const routes = {
    public: [
        {path: '/register', scene: RegisterScene},
        {path: '/login', scene: LoginScene},
    ],
    private: [
        {path: '/dashboard', scene: DashboardScene}
    ],
    admin: [
        {path: '/dashboard/flights/create', scene: NewFlightScene},
        {path: '/dashboard/flights/edit', scene: EditFightScene}
    ]
}