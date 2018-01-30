// Create object
class Client {
  constructor(firstName,telephone,carYear,carModel,problem){
    this.firstName = firstName;
    this.telephone = telephone;
    this.carYear = carYear;
    this.carModel = carModel;
    this.problem = problem;
  }
}
// Create UI
class UI {
    addClientToList(client){
        const list = document.getElementById('client-list');
        //Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
        <td>${client.firstName}</td>
        <td>${client.telephone}</td>
        <td>${client.carYear}</td>
        <td>${client.carModel}</td>
        <td>${client.problem}</td>
        <td><a href="#" class="delete"><i class="material-icons">clear</i></a></td>
        `
        list.appendChild(row);
    }
    showAlert(message, className){
    //Create Element
    const div = document.createElement('div');
    //Add class
    div.className = `alert ${className}`;
    //Add text node
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.row');
    //Get  form
    const form = document.querySelector('#form-client');
    //Insert alert
    container.insertBefore(div,form);
    //Dissepear after 3 sec
    setTimeout(function (){
        document.querySelector('.alert').remove();
    },3000);
    }
    deleteClient(target){
        if(target.className === 'material-icons'){
            target.parentElement.parentElement.parentElement.remove();
         }
    }
    clearFields(client){
        document.getElementById('firstName').value = '',
        document.getElementById('telephone').value = '',
        document.getElementById('carYear').value = '',
        document.getElementById('carModel').value = '',
        document.getElementById('problem').value = ''
    }
}
//Local Storage Class
class Store {
    static getClients(){
      let clients;
      if(localStorage.getItem('clients') === null){
        clients = [];
      } else {
          clients = JSON.parse(localStorage.getItem('clients'));
      }

      return clients;
    }
    static displayClients(){
        const clients = Store.getClients();

        clients.forEach(function(client){
                    const ui =new UI;

                    //add service to ui
                    ui.addClientToList(client);
                });
    }
    static addClient(client){
        const clients = Store.getClients();

        clients.push(client);

        localStorage.setItem('clients',JSON.stringify(clients));
    }
    static removeClient(problem){
        const clients = Store.getClients();
        clients.forEach(function(client,index){
                  if(client.problem === problem){
                    clients.splice(index,1);
                  }
                });
      localStorage.setItem('clients',JSON.stringify(clients));
    }
}
//EventListeners for adding clients
document.getElementById('form-client').addEventListener('submit' , function(e){
    //Get form value
   const firstName = document.getElementById('firstName').value,
         telephone = document.getElementById('telephone').value,
         carYear = document.getElementById('carYear').value,
         carModel = document.getElementById('carModel').value,
         problem = document.getElementById('problem').value
    //Instantiate Client
   const client = new Client (firstName,telephone,carYear,carModel,problem);
   //Instantiate UI
   const ui = new UI();
   //Validate
   if ( firstName === '' || telephone === '' || carYear === '' || carModel === '' || problem === ''  ){
       //err
    ui.showAlert('Please fill the fields','error');
   } else {
   //Add client to list
   ui.addClientToList(client);
   //Clear fields
   ui.clearFields(client);
   //add to local storage
   Store.addClient(client);
   //Show succes
   ui.showAlert('Client Added!', 'success');
   }

   e.preventDefault();
});
document.addEventListener('DOMContentLoaded',Store.displayClients);

//EventListeners for delete clients
document.getElementById('client-list').addEventListener('click',function(e){
     //Instantiate UI
    const ui = new UI();

    ui.deleteClient(e.target);
    //Removed from LS
    Store.removeClient(e.target.parentElement.parentElement.previousElementSibling.textContent);

    //Show messege
    ui.showAlert('Client Removed!', 'success');
     e.preventDefault();
});
