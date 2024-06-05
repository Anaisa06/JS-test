import { fetchApi } from '../../../helpers/fetchApi';
import { navigateTo } from '../../Router';
import styles from './register.styles.css'

export function RegisterScene(){
    const root = document.getElementById('root');
    root.innerHTML = `
    <h1>Flight <span>Booking</span></h1> 
    <form>
        <label for="name">Nombre</label>
        <input type="text" placeholder="Nombre" id="name" required>
        <label for="email">Email</label>
        <input type="email" placeholder="usuario@dominio.com" id="email" required>
        <label for="birthdate">Fecha de nacimiento</label>
        <input type="date" id="birthdate" required>
        <label for="password">Contraseña</label>
        <input type="password" id="password" required>
        <button type="submit">Registrarse</button>       
    </form>
    `
    const $form = document.getElementsByTagName('form')[0];
    const $name = $form.querySelector('input[type="text"');
    const $email = $form.querySelector('input[type="email"');
    const $password = $form.querySelector('input[type="password"');
    const $birthdate = $form.querySelector('input[type="date"');

    const emailValidator = (email) => {
        if(email.includes('@') && email.includes('.')){
            return true;
        }
    }

    const createUser = async () => {
        if(emailValidator($email.value)){
            const newUser = fetchApi('http://localhost:3000/users',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: $name.value,
                    email: $email.value,
                    birthdate: $birthdate.value,
                    password: $password.value,
                    roleId: 2
                })
            })

            alert('Usuario creado con éxito');
            navigateTo('/login');
        } else {
            alert('Email inválido');
        }
    }

    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        createUser();
    })
}