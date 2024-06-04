import styles from './editFlight.styles.css';
import { fetchApi } from "../../../helpers/fetchApi";
import { navigateTo } from "../../Router";

export function EditFightScene(){
    const pageContent = `
    <h1>Editar <span>vuelo</span></h1>
    <form>
        <label for="flight-number">Número de vuelo</label>
        <input type="text" id="flight-number" disabled>
        <label for="origin">Origen</label>
        <input type="text" id="origin" 
        disabled>
        <label for="destination">Destino</label>
        <input type="text" id="destination"  
        disabled>
        <label for="departure-date">Fecha y hora de salida</label>
        <input type="datetime-local" id="departure-date" required>
        <label for="arrival-date">Fecha y hora de llegada</label>
        <input type="datetime-local" id="arrival-date" required>
        <label for="capacity">Capacidad</label>
        <input type="number" id="capacity" required>
        <button type="submit">Guardar cambios</button>
        <button id="return-button" class=${styles.returnButton}>Volver</button>
    </form>   
    `
    const logic = async () => {
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

        //Add values to inputs
        const flightId = localStorage.getItem('flight-id');
        const flight = await fetchApi(`http://localhost:3000/flights/${flightId}`, {
            method: 'GET'
        })
        $flightNumber.value = flight.number;
        $origin.value = flight.origin;
        $destination.value = flight.destination;
        $departureDate.value = flight.departure;
        $arrivalDate.value = flight.arrival;
        $capacity.value = flight.capacity;

        //Event listener for the form
        $form[0].addEventListener('submit', async (event) => {
            event.preventDefault();
            if(confirm('¿Deseas guardar los cambios?')){
                await fetchApi(`http://localhost:3000/flights/${flightId}`, {
                    method:'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        number: $flightNumber.value,
                        origin: $origin.value,
                        destination: $destination.value,
                        departure: $departureDate.value,
                        arrival: $arrivalDate.value,
                        capacity: $capacity.value,
                    })
                })
                alert('Cambios guardados con éxito');
                navigateTo('/dashboard');
            }
        })
    }
    
    return {
        pageContent,
        logic
    }
}