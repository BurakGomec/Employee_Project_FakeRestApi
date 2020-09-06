import{Request} from "./request";
import{UI} from "./ui";
import employeejson from "../fake-api/employee.json";

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
    employeesList.addEventListener("click",UpdateOrDelete);
    updateEmployeeButton.addEventListener("click",updateEmployee);
    filter.addEventListener("input",filterMethod);
    clearall.addEventListener("click",clearAllEmployees);
    add.addEventListener("click",addNewEmployee);
 
}

function clearAllEmployees(e){
    let count = employeesList.childNodes.length;
    for(let i=0;i<count;i++){
        request.delete(Number(employeesList.childNodes[i].children[3].textContent));
    }

    for(let i=0;i<count;i++){
        employeesList.firstChild.remove();
    }
     e.preventDefault();

}


function filterMethod(){
    let count = employeesList.childNodes.length;

    const lower=filter.value.toLowerCase();
    console.log(lower);


    for(let i=0;i<count;i++){
        if(lower == employeejson.employees[i].name.toLowerCase() || lower == employeejson.employees[i].department.toLowerCase() 
            ||lower == employeejson.employees[i].salary){
                console.log("Bulundu");

                
            }
    }
    

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
            ui.addNewEmployeeUI(employee);
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
    .then(
        ui.deleteEmployeeFromUI(employeeTarget.parentElement.parentElement)
        
        )
    .catch(err => console.log(err));

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
    nameInput.style.backgroundColor="#FFFFFF";
    departmentInput.style.backgroundColor="#FFFFFF";
    salaryInput.style.backgroundColor="#FFFFFF";
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
    updateEmployeeButton.style.display="none";

}


// request.put(1,data)
// .then(employee => console.log(employee))
// .catch(err => console.log(err));

//request.put(1,data);

