let users = [
  {
    id: "123456789",
    createdDate: "2021-01-06T00:00:00.000Z",
    status: "En validation",
    firstName: "Mohamed",
    lastName: "Taha",
    userName: "mtaha",
    registrationNumber: "2584",
  },
   {
    id: "987654321",
    createdDate: "2021-07-25T00:00:00.000Z",
    status: "Validé",
    firstName: "Hamid",
    lastName: "Orrich",
    userName: "horrich",
    registrationNumber: "1594",
  },
     {
    id: "852963741",
    createdDate: "2021-09-15T00:00:00.000Z",
    status: "Rejeté",
    firstName: "Rachid",
    lastName: "Mahidi",
    userName: "rmahidi",
    registrationNumber: "3576",
  }
]
getAll(users)

// --------------------------- aujourd'hui------------------
function today(){
  let tmp = new Date();
let month=tmp.getMonth()+1;
if(month<10){
  month="0"+month;
}
return tmp.getFullYear()+"-"+month+"-"+tmp.getDate();  
}
window.onload=document.getElementById("thisDate").value=today();



// -------------------Model -----------------------
var addBtn=document.querySelector('.modal-btn');
var model=document.querySelector('.model-bg');
var closeBtn=document.querySelector('#close');
var div=document.querySelector('.model');
var engBtn=document.querySelector('.eng-btn');
var alert=document.querySelector('.alert');
var msg=document.querySelector('.msg');
var btnDelet=document.getElementById("btnDelet");
addBtn.addEventListener('click',function(){
    model.classList.add('bg-active');
});
// Clicked icon close
closeBtn.addEventListener('click',function(){
    model.classList.remove('bg-active');
    
});
// Clicked outside model
window.addEventListener('click', function(e){   
  if (!div.contains(e.target)&&model.contains(e.target))model.classList.remove('bg-active');
});



// --------------------Alert----------------

function Alert(txt,color){
  alert.style="background:"+color+";";
  msg.innerHTML=txt;
  alert.classList.add("show");
  alert.classList.remove("hide");
  alert.classList.add("showAlert");
  setTimeout(function(){
  alert.classList.remove("show");
  alert.classList.add("hide");
  },5000);
}

// ----------------------- EnClick sur button  (Ajouter utilisateur) ---------------------

engBtn.addEventListener('click',function(){
  addUtilisateur(users);
});





// ---------------------- recevoir toutes les utilisateurs ------------------

function getAll(data){
  console.log(users.length)
  var table=document.querySelector('.table-data');
  var etat=document.querySelector('.etat')
  var classStatus=""
  table.innerHTML=""
  for(let i=0;i<data.length;i++){
    switch(data[i].status){
      case "Validé":classStatus="valide";break;
      case "En validation":classStatus="on-validation";break;
      case "Rejeté":classStatus="rejected ";break;
    }
    var row= `<tr>
             <th scope="row">${data[i].id}</th>
             <td>${data[i].createdDate}</td>
             <td><div class="etat ${classStatus}">
             <span>${data[i].status}</span>
             </div></td>
             <td>${data[i].firstName}</td>
             <td>${data[i].lastName}</td>
             <td>${data[i].userName}</td>
             <td class="col-sm-3">${data[i].registrationNumber}</td>
             <td class="col-sm-1"><i id="btnDelet" onclick="Remove(${data[i].id})" class="fa fa fa-trash fa-lg"></i></td>
             </tr>`;
      table.innerHTML+=row; 
          
  }
}
// ------------------ Ajouter une utilisateur --------------

function addUtilisateur(data){
  if(validateForm()){
    let util={
      id: Math.floor(Math.random() * 1000000000),
      createdDate: today(),
      status: document.querySelector("#status").value,
      firstName: document.querySelector("#nom").value,
      lastName: document.querySelector("#prenom").value,
      userName: document.querySelector("#nomComplet").value,
      registrationNumber: document.querySelector("#matricul").value,
    }
    data.push(util);
    Alert("L'utilisateur est enregistrer","#5BE881");
    document.forms[0].reset();
    model.classList.remove('bg-active');
    getAll(users);
  }
  else{
    Alert("Une champe et vide","#ffdb9b");
  }
  
}


// ----------------------- Validation formulaire ----------------
function validateForm() {
  nomV=document.querySelector("#nom").value
  preV=document.querySelector("#prenom").value
  useV=document.querySelector("#nomComplet").value
  matV=document.querySelector("#matricul").value
  if(nomV=='' || preV=='' || useV=='' || matV=='')return false;
  else return true;
}




// ---------------------------Supprimer une utilisateur----------
function Remove(ide){
  let user = users.find(users=>users.id == ide);
  users.splice(users.indexOf(user),1);
  Alert("utilisateur supprimer","red");
  getAll(users)
}