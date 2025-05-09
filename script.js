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

const getChefBirthday = async (id) => {

    let objRicetta, userId;

    try{
        //recuper l'intera ricetta
        const responseRicetta = await fetch(`https://dummyjson.com/recipes/${id}`) 
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
        return dateOfBirth;
    }catch(error){
        throw new Error ("Non riesco a recuperare le info dello chef con userId" + id)
        //il finally in questo caso è necessario in quanto nella funzione  è presente un return.
    }finally{
        console.log("Operazione completata")
    }

}

getChefBirthday(3)
  .then(dateOfBirth => console.log(dateOfBirth))
  .catch(error => console.error("Errore:", error.message));
 