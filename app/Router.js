import { Navbar } from "./components/navbar/navbar.component";
import { routes } from "./routes";
import { NotFoundScene } from "./scenes/not-found/nof-found";

export function Router(){
    const path = window.location.pathname
    const publicRoute = routes.public.find(route => route.path === path);
    const privateRoute = routes.private.find(route => route.path === path);
    const adminRoute = routes.admin.find(route => route.path === path);

    if(publicRoute){
        if(!localStorage.getItem('token')){
            publicRoute.scene();
        } else {
            navigateTo('/dashboard')
        }
    } else if (adminRoute){
        if(localStorage.getItem('token') && localStorage.getItem('role') === '1'){
            const { pageContent, logic } = adminRoute.scene()
            Navbar(pageContent, logic)
        } else {
            navigateTo('/dashboard')
        }           
    } else if (privateRoute){
        if(localStorage.getItem('token')){
            const { pageContent, logic } = privateRoute.scene()
            Navbar(pageContent, logic)
        } else {
            navigateTo('/login');
        }
    } else {
        NotFoundScene();
    }

}

export function navigateTo(path){
    window.history.pushState({}, '', window.location.origin + path);
    Router();
}