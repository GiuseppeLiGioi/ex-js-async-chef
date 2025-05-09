/*
In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:

Recuperare la ricetta da https://dummyjson.com/recipes/{id}
Estrarre la proprietà userId dalla ricetta
Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
Restituire la data di nascita dello chef


Note del docente

Scrivi la funzione getChefBirthday(id), che deve:
Essere asincrona (async).
Utilizzare await per chiamare le API.
Restituire una Promise con la data di nascita dello chef.
Gestire gli errori con try/catch


Esempio di utilizzo:


getChefBirthday(1)
  .then(birthday => console.log("Data di nascita dello chef:", birthday))
  .catch(error => console.error("Errore:", error.message));
*/

/*🎯 Bonus 1
Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.

Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.
 */

/*🎯 Bonus 2
Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno.
 */

const getChefBirthday = async (id) => {

    let objRicetta, userId;

    try{
        //recuper l'intera ricetta
        const responseRicetta = await fetch(`https://dummyjson.com/recipes/${id}`) 
        //parte Bonus 1, ho aggiunto un if per verificare che la response fossen corretta, in caso contrario stampo un errore.
        //L'errore generato bloccherà il flusso del mio codice, in modo da non generare errori a cascata.
        if(!responseRicetta.ok){
            throw new Error ("Non reisco a recuperare la ricetta con id" + id);
        }
         objRicetta = await responseRicetta.json();
         console.log(objRicetta)
         //recuper l'userID.
         userId = objRicetta.userId;
         
    }catch(error){

       throw new Error ("Non reisco a recuperare la ricetta con id" + id);
      //il finally in questo caso è superficiale in quanto nella funzione non è presente nessun return.
    }finally{
        console.log("operazione completata")
    }


    let infoChef;
    let dateOfBirth = new Date();

    try{
        const responseChef = await fetch(`https://dummyjson.com/users/${userId}`)
        infoChef = await responseChef.json();
        //console.log(infoChef)
        dateOfBirth = infoChef.birthDate; 
        const formattedDateOfBirth = dayjs(dateOfBirth).format("DD/MM/YY");
        return formattedDateOfBirth;
    }catch(error){
        throw new Error ("Non riesco a recuperare le info dello chef con userId" + id)
        //il finally in questo caso è necessario in quanto nella funzione  è presente un return.
    }finally{
        console.log("Operazione completata")
    }

}

getChefBirthday(3)
  .then(formattedDateOfBirth => console.log(formattedDateOfBirth))
  .catch(error => console.error("Errore:", error.message));

