//Create object
function Register (serviceName,serviceTelephone,serviceAdress,servicePack){
   this.serviceName = serviceName;
   this.serviceTelephone = serviceTelephone;
   this.serviceAdress = serviceAdress;
   this.servicePack = servicePack;
}

//Create UI
function UI (){}

//Add event listeners
document.getElementById('form-register').addEventListener('submit',function(e){
    const    serviceName = document.getElementById('serviceName').value,
             serviceTelephone = document.getElementById('serviceTelephone').value,
             serviceAdress = document.getElementById('serviceAdress').value,
             servicePack = document.getElementById('servicePack').value

        e.preventDefault();    
    });