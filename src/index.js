import{Request} from "./request";
import{UI} from "./ui";


const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");

const request = new Request("http://localhost:3000/employees");
const ui = new UI();
eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded",getAllEmployees);
    document.addEventListener("submit",addNewEmployee);
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





// request.put(1,data)
// .then(employee => console.log(employee))
// .catch(err => console.log(err));

//request.put(1,data);

// request.delete(2).then(message => console.log(message))
// .catch(error => console.log(error));