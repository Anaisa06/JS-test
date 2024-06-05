import styles from './dashboard.scene.css';
import { fetchApi } from '../../../helpers/fetchApi';
import { navigateTo } from '../../Router';

export function DashboardScene(){
    const pageContent = `
    <h1>Vuelos <span>actuales</span></h1>
    <div id="main-container" class=${styles.container}>
        <div id="cards-container" class=${styles.cards}></div>
    </div>
    `;
    
    const logic = async () => {
        const $mainContainer = document.getElementById('main-container');
        const $cardsContainer = document.getElementById('cards-container');
        const userRole = (localStorage.getItem('role'))
        let $card;

        const flights = await fetchApi('http://localhost:3000/flights', {
            method: 'GET'
        })
        flights.forEach(flight => {
            $card = document.createElement('div');
            $card.classList.add(styles.card);
            $card.innerHTML = `
            <h3>${flight.origin} - ${flight.destination}</h3>
            <hr>
            <p>Salida: ${flight.departure}</p>
            <p>Llegada: ${flight.arrival}</p>
            <hr>
            <div>
                <p>Número: ${flight.number}</p>
                <p>Capacidad: ${flight.capacity}</p>
            </div>
            `;
            $cardsContainer.appendChild($card);

            //Check if user is admin 
            if(userRole === "1"){
                //Create buttons to edit and delete flight
                const $adminButtons = document.createElement('div')
                $adminButtons.classList.add(styles.adminButtons);
                $adminButtons.innerHTML = `
                <button id="edit-button" flight-id="${flight.id}" class=${styles.editButton}>Editar</button>
                <button id="delete-button" flight-id="${flight.id}" class=${styles.deleteButton}>Eliminar</button>
                `
                //Add buttons to card
                $card.appendChild($adminButtons);
                
            } else {
                //Create button to reserve flight
                const $userButton = document.createElement('div');
                $userButton.classList.add(styles.userButton);
                $userButton.innerHTML = `
                <button id="book-flight" flight-id="${flight.id}">Reservar</button>
                `
                //Add button to card
                $card.appendChild($userButton);
            }
        }) 
        //Add event listener to delete button
        $cardsContainer.addEventListener('click', async (e) => {
            if(e.target.id === 'delete-button'){
                //Get flight id
                const flightId = e.target.getAttribute('flight-id');
                if(confirm('¿Deseas eliminar el vuelo?')){
                    //Delete from db.json
                    await fetchApi(`http://localhost:3000/flights/${flightId}`, {
                        method: 'DELETE'
                    })
                    //Delete card
                    e.target.closest(`.${styles.card}`).remove();
                }
            }
        })
        //Add event listener to edit button
        $cardsContainer.addEventListener('click', async (e) => {
            if(e.target.id === 'edit-button'){
                //Get flight id
                const flightId = e.target.getAttribute('flight-id');
                //Save flight id in local storage
                localStorage.setItem('flight-id', flightId);
                //Navigate to edit path
                navigateTo(`/dashboard/flights/edit`);
            }
        })
        //Add event listener to book button
        $cardsContainer.addEventListener('click', async (e) => {
            if(e.target.id === 'book-flight'){
                if(confirm(`¿Deseas reservar este vuelo?`)){
                    //Get flight id
                    const flightId = e.target.getAttribute('flight-id');
                    //Get user id
                    const userId = localStorage.getItem('user-id');
                    //Create date
                    const date = new Date();
                    console.log(date)
                    //Create reservation
                    await fetchApi('http://localhost:3000/bookings', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            flightId,
                            userId,
                            date                          
                        })
                    })                 
                }             
            }
        })

        //Add create button for admin
        if(userRole === '1'){
            const $createButtonContainer = document.createElement('div');
            $createButtonContainer.classList.add(styles.createButtonContainer);
            $createButtonContainer.innerHTML = `
            <button id="create-button" class=${styles.createButton}>Crear vuelo</button>`

            //Add button to container
            $mainContainer.appendChild($createButtonContainer);
            const $createButton = document.getElementById('create-button');            
            //Add event listener
            $createButton.addEventListener('click', () => {
                navigateTo('/dashboard/flights/create');
            })
        }
    }
    return {
        pageContent,
        logic
    }
}