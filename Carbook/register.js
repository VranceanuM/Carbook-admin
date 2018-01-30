//Create object
class Register {
    constructor(serviceName,serviceTelephone,serviceAdress,servicePack,comments){
        this.serviceName = serviceName;
        this.serviceTelephone = serviceTelephone;
        this.serviceAdress = serviceAdress;
        this.servicePack = servicePack;
        this.comments = comments;
    }
}

//Create UI
class UI{
    addClientToList(register){
        const list = document.getElementById('register-list');
        //Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
        <td>${register.serviceName}</td>
        <td>${register.serviceTelephone}</td>
        <td>${register.serviceAdress}</td>
        <td>${register.servicePack}</td>
        <td>${register.comments}</td>
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
    const form = document.querySelector('#form-register');
    //Insert alert
    container.insertBefore(div,form);
    //Dissepear after 3 sec
    setTimeout(function (){
    document.querySelector('.alert').remove();
    },3000);
    }
   clearFields(register){
    document.getElementById('serviceName').value = '';
    document.getElementById('serviceTelephone').value = '';
    document.getElementById('serviceAdress').value = '';
    document.getElementById('servicePack').value = '';
    document.getElementById('comments').value = '';
   }
   deleteClient(target){
    if(target.className === 'material-icons'){
        target.parentElement.parentElement.parentElement.remove();
    }
   }
}

//Add event listeners
document.getElementById('form-register').addEventListener('submit',function(e){
    const    serviceName = document.getElementById('serviceName').value,
             serviceTelephone = document.getElementById('serviceTelephone').value,
             serviceAdress = document.getElementById('serviceAdress').value,
             servicePack = document.getElementById('servicePack').value,
             comments = document.getElementById('comments').value
     //Instantiate Register Service
    const register = new Register (serviceName,serviceTelephone,serviceAdress,servicePack,comments);
    //Instantiate UI
    const ui = new UI();
    //Add clients
    if (serviceName === '' ||serviceTelephone === '' || serviceAdress === '' ||servicePack === '' ||comments === '') {
        ui.showAlert('Please fill the fields','error')
    } else {
        ui.addClientToList(register);  
         //Clear fields
        ui.clearFields(register);
        //Show succes
        ui.showAlert('Client Added!', 'success');
    }

        e.preventDefault();    
    });
    //EventListeners for delete clients
document.getElementById('register-list').addEventListener('click',function(e){
    //Instantiate UI
   const ui = new UI();
   
   ui.deleteClient(e.target);  
   
   //Show messege
   ui.showAlert('Client Removed!', 'success');
    e.preventDefault();
});