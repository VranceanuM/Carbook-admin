//Create object
class  Service{
    constructor(serviceName,serviceTelephone,comment) {
        this.serviceName = serviceName;
        this.serviceTelephone = serviceTelephone;
        this.comment = comment;
     }
    }

//Create UI
class  UI {
    addServiceToList(service){
        const list = document.getElementById('service-list');
        //Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
         <td>${service.serviceName}</td>
         <td>${service.serviceTelephone}</td>
         <td>${service.comment}</td>
         <td><a href="#" class="delete"><i class="material-icons">clear</i></a></td>
        `
        list.appendChild(row);
    }
    showAlert(message,className){
    //Create Element
    const div = document.createElement('div');
    //Add Class
    div.className = `alert ${className}`;
    //Add text node
    div.appendChild(document.createTextNode(message));
    //Get the parent
    const container = document.querySelector('.container');
    //Get the Form
    const form = document.querySelector('.service-form');
    //Insert alert
    container.insertBefore(div,form);
        //Dissepear after 3 sec
    setTimeout(function(){
    document.querySelector('.alert').remove()
        },3000);
    }
    deleteService(target){
        if (target.className === 'material-icons'){
            target.parentElement.parentElement.parentElement.remove();
     }
    }
    clearFields(service){
        document.getElementById('serviceName').value = '',
        document.getElementById('serviceTelephone').value = '',
        document.getElementById('comment').value = ''
    }
}

class Store {
    static getService(){
      let services;
      if(localStorage.getItem('services') === null){
        services = [];
      } else {
          services = JSON.parse(localStorage.getItem('services'));
      }

      return services;
    }
    static displayService(){
        const services = Store.getService();

        services.forEach(function(service){
            const ui =new UI;

            //add service to ui
            ui.addServiceToList(service);
        });
    }
    static addService(service){
        const services = Store.getService();

        services.push(service);

        localStorage.setItem('services',JSON.stringify(services));
    }
    static removeClient(comment){
       const services = Store.getService();
       services.forEach(function(service,index){
         if(service.comment === comment){
           services.splice(index,1)
         }
       });
       localStorage.setItem('services',JSON.stringify(services));
    }
}
document.addEventListener('DOMContentLoaded',Store.displayService);
//Local Storage Class

//EventListeners for adding services
document.getElementById('service-form').addEventListener('submit',function(e){

    const serviceName = document.getElementById('serviceName').value,
          serviceTelephone = document.getElementById('serviceTelephone').value,
          comment = document.getElementById('comment').value
   //initiate new UI
   const ui = new UI ();
   //Initiate Service
   const service = new Service (serviceName,serviceTelephone,comment);

    //Validate
    if (serviceName === '',serviceTelephone === '',serviceName === ''){
        ui.showAlert('Please fill the fields','error');
    }else {
        //Add service to field
        ui.addServiceToList(service);
        //Add to LS
        Store.addService(service);
        //Clear Fields
        ui.clearFields(service);
        //Show succes
        ui.showAlert('Service Added!' , 'success');
    }


   e.preventDefault();
});
//EventListeners for delete services
    document.getElementById('service-list').addEventListener('click',function(e){
   //Instantiate UI
   const ui = new UI ();
   //Remove from JS
   Store.removeClient(e.target.parentElement.parentElement.previousElementSibling.textContent);

   ui.deleteService(e.target);
  //show alert
   ui.showAlert('Service Deleted','success');
   e.preventDefault();
});
