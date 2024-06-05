import { fetchApi } from '../../../helpers/fetchApi';
import { navigateTo } from '../../Router';
import styles from './newFlight.styles.css';

export function NewFlightScene(){
    const pageContent = `
    <h1>Nuevo <span>vuelo</span></h1>
    <form>
        <label for="flight-number">Número de vuelo</label>
        <input type="text" id="flight-number" maxlength="20" placeholder="AAF1" required>
        <label for="origin">Origen</label>
        <input type="text" id="origin" maxlength="50" 
        placeholder="Ciudad" required>
        <label for="destination">Destino</label>
        <input type="text" id="destination" maxlength="50" 
        placeholder="Ciudad" required>
        <label for="departure-date">Fecha y hora de salida</label>
        <input type="datetime-local" id="departure-date" required>
        <label for="arrival-date">Fecha y hora de llegada</label>
        <input type="datetime-local" id="arrival-date" required>
        <label for="capacity">Capacidad</label>
        <input type="number" id="capacity" min="1" max="500" required>
        <button type="submit">Crear vuelo</button> 
        <button id="return-button" class=${styles.returnButton}>Volver</button>
    
    </form>
    
`
    
    const logic = () => {

        const $form = document.getElementsByTagName('form');
        const $flightNumber = document.getElementById('flight-number');
        const $origin = document.getElementById('origin');
        const $destination = document.getElementById('destination');
        const $departureDate = document.getElementById('departure-date');
        const $arrivalDate = document.getElementById('arrival-date');
        const $capacity = document.getElementById('capacity');
        const $returnButton = document.getElementById('return-button');
        
        //Create event listener to return button
        $returnButton.addEventListener('click', () => {
            navigateTo('/dashboard');
        })

        //Create event listener to form
        $form[0].addEventListener('submit', async (event) => {
            event.preventDefault();
            if(confirm('¿Deseas guardar el vuelo?')){
                await fetchApi('http://localhost:3000/flights', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        number: $flightNumber.value,
                        origin: $origin.value.toUpperCase(),
                        destination: $destination.value.toUpperCase(),
                        departure: $departureDate.value,
                        arrival: $arrivalDate.value,
                        capacity: $capacity.value,
                    })
                })
                alert('Vuelo creado con éxito');
                if(!confirm('¿Deseas crear otro vuelo?')){
                    navigateTo('/dashboard');
                }
            }
        })       
    }
    return {
        pageContent,
        logic
    }
}