import{Request} from "./request";
import{UI} from "./ui";

const add = document.getElementById("add");
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");
const filter = document.getElementById("filter");
const clearall = document.getElementById("clear-all");


const request = new Request("http://localhost:3000/employees");
const ui = new UI();
eventListeners();

let updateState=null;

function eventListeners(){
    
    document.addEventListener("DOMContentLoaded",getAllEmployees);
    //document.addEventListener("submit",addNewEmployee);
    employeesList.addEventListener("click",UpdateOrDelete);
    updateEmployeeButton.addEventListener("click",updateEmployee);
    //filter.addEventListener("onchange",filterMethod);
    clearall.addEventListener("click",clearAllEmployees);
    add.addEventListener("click",addNewEmployee);
    document.getElementById("filter").onchange = function(){
        console.log(filter.textContent);
     };
 
}

function clearAllEmployees(){
    let count = employeesList.childNodes.length;
    console.log(count);
    for(let i=0;i<=count;i++){
        request.delete(i).
        then(message =>{

            console.log(message)

        } )
        .catch(error => console.log(error));
    }
    getAllEmployees();
}

function filterMethod(){
    console.log("deneme");
    console.log(filter.textContent);
}



function addNewEmployee(e){
const name = nameInput.value.trim();
const department= departmentInput.value.trim();
const salary = salaryInput.value.trim();
if(name === "" || department === "" || salary === ""){
    alert("Tum alanlari doldurunuz");
}
else{
    let data={
        name:name,
        department:department,
        salary:Number(salary)};
    
        request.post(data).then(employee =>{
            getAllEmployees();
            //ui.addNewEmployeeUI(employee);
        })
        .catch(err => console.log(err));
        
        ui.clearAllInputs();
        getAllEmployees();
}

    e.preventDefault();

}


function getAllEmployees(){
    request.get()
    .then(employees => {
        ui.addAllEmployeeUI(employees);
    })
    .catch(err => console.log(err));
}


function UpdateOrDelete(e){
    if(e.target.id === "delete-employee"){
        deleteEmployee(e.target);
    }
    else if(e.target.id === "update-employee"){
        
        updateEmployeeController(e.target.parentElement.parentElement);

    }
}

function deleteEmployee(employeeTarget){
    const id = employeeTarget.parentElement.previousElementSibling.previousElementSibling.textContent;
    request.delete(id)
    .then(getAllEmployees()
    )
    .catch(err => console.log(err));
   // ui.deleteEmployeeUI(employeeTarget.parentElement.parentElement);
}

function updateEmployeeController(employeeTarget){
    ui.toogleUpdateButton(employeeTarget,employeeTarget.children[3].textContent);
    if(updateState === null){
        updateState={
            updateId: employeeTarget.children[3].textContent,
            updateParent : employeeTarget
        }
    }
    else{
        updateState = null;
    }   

    
}

function updateEmployee(){
    if(updateState){
        const data={name:nameInput.value.trim(),department:departmentInput.value.trim(),
        salary:salaryInput.value.trim()};

        request.put(updateState.updateId,data)
        .then( updatedEmployee =>{
            ui.updateEmployeeOnUI(updatedEmployee,updateState.updateParent);
            updateState=null;
        })
        .catch(err => console.log(err));
   
    }
    // const deneme = document.getElementById("update-employee");
    // deneme.style.display="block";

}

function AllUpdateEmployee(e){
    const namee = nameInput.value.trim();
    const departmentt= departmentInput.value.trim();
    const salaryy = salaryInput.value.trim();

    const data= {name:namee,
    department:departmentt,
    salary:Number(salaryy)};

    

}


// request.put(1,data)
// .then(employee => console.log(employee))
// .catch(err => console.log(err));

//request.put(1,data);

