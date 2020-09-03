export class UI{
    //Es6---not using function word--
    constructor(){
        this.employeelist = document.getElementById("employees");
        this.updateButton = document.getElementById("update");
        this.nameInput = document.getElementById("name");
        this.departmentInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");
    }

  addAllEmployeeUI(employees){
    let result="";
      employees.forEach(function(employee){
        result += `<tr>
                                            
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>${employee.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
    </tr>`;
      });
      this.employeelist.innerHTML = result;
    }


  clearAllInputs(){
    this.nameInput.value = "";
    this.departmentInput.value = "";
    this.salaryInput.value = "";
    }
 
  addNewEmployeeUI(employee){
    this.employeelist.innerHTML += `<tr>
                                            
    <td>${employee.name}</td>
    <td>${employee.department}</td>
    <td>${employee.salary}</td>
    <td>${employee.id}</td>
    <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
    <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
</tr>`;

  }



}