export async function fetchApi(url, options){
    try{
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error){
        console.log('Error en fetchApi: ' + error);
        alert('Algo salió mal');
    }      
}