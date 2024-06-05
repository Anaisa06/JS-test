import { navigateTo } from '../../Router';
import styles from './navbar.styles.css';

export function Navbar(pageContent, logic){
    const root = document.getElementById('root');
    root.innerHTML = `
    <header>
        <nav>
            <ul>
                <li><a href="http://localhost:9000/dashboard">Reservar</a></li>
            </ul>
            <button id="exit-button" type="button">Salir</button>
        </nav>
        
    </header>

    ${pageContent}
    `

    const $exitButton = document.getElementById('exit-button');
    $exitButton.addEventListener('click', () => {
        if(confirm('¿Deseas cerrar tu sesión?')){
            localStorage.removeItem('token');
            localStorage.removeItem('user-id');
            localStorage.removeItem('role');
            navigateTo('/login');
            return;
        }        
    });

    logic();
}