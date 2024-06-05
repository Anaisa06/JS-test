import { fetchApi } from '../../../helpers/fetchApi';
import { navigateTo } from '../../Router';
import styles from './login.styles.css';

export function LoginScene (){
    const root = document.getElementById('root');
    root.innerHTML = `
    <h1>Flight <span>Booking</span></h1>   
    <form class=${styles.form}>
        <input type="email" placeholder="username@domain.com" required>
        <input type="password" placeholder="password" required>
        <div class=${styles.buttonContainer}>
            <button type="submit">Ingresar</button>
            <button id="register-button" class=${styles.registerButton} type="button">Registrarse</button>
        </div>
    </form>
    `
    const $form = document.getElementsByTagName('form')[0];
    const $email = $form.querySelector('input[type="email"');
    const $password = $form.querySelector('input[type="password"');
    const $registerButton = document.getElementById('register-button');

    $registerButton.addEventListener('click', () => {
        navigateTo('/register');
    })

    const userAuth = async () => {
        const user = await fetchApi(`http://localhost:3000/users?email=${$email.value}`, {
            method: 'GET'
        });
        
        if (user[0]){
            if(user[0].password === $password.value){
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem('token', token);
                localStorage.setItem('user-id', user[0].id);
                localStorage.setItem('role', user[0].roleId)
                alert('Bienvenida/o '+ user[0].name);
                navigateTo('/dashboard');
                return;
            } else {
                alert('Usuario o contraseña incorrectos');
                return;
            }
        }  else {
            alert('Usuario o contraseña incorrectos');
            return;
        }
    }

    $form.addEventListener('submit', (event) => {
        event.preventDefault();               
        userAuth();
    })
}