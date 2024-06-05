import { Router } from './Router';

export function App(){
    const root = document.getElementById('root');
    if(!root){
        throw new Error('Root no está definido');
        return;
    }
    Router();
}