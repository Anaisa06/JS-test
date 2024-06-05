import styles from './not-found.css';

export function NotFoundScene(){
    const root = document.getElementById('root');
    root.innerHTML = `
        <h1>404</h1>
        <h2>Página no encontrada</h2>
    `
}