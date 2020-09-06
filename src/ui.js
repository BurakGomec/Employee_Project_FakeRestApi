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
      <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td></tr>`;
    


  }

  toogleUpdateButton(target,id){
    let element = id-1;
    if(this.updateButton.style.display === "none"){
        this.updateButton.style.display = "block";
        this.addEmployeeInfoInputs(target);
        this.nameInput.style.backgroundColor="#FFEBCD";
        this.departmentInput.style.backgroundColor="#FFEBCD";
        this.salaryInput.style.backgroundColor="#FFEBCD";
        for(let i=0;i<=3;i++){
          this.employeelist.children[element].children[i].style.backgroundColor="#008000";
        }
       
        
    }
    else{
        this.updateButton.style.display = "none";
        this.clearAllInputs();
        this.nameInput.style.backgroundColor="#FFFFFF";
        this.departmentInput.style.backgroundColor="#FFFFFF";
        this.salaryInput.style.backgroundColor="#FFFFFF";
        for(let i=0;i<=3;i++){
          this.employeelist.children[element].children[i].style.backgroundColor="rgb(33, 37, 41)";
        }
    }
  }
  deleteEmployeeFromUI(element) {
    element.remove();
  }

  addEmployeeInfoInputs(target){
    const children = target.children;
    this.nameInput.value = children[0].textContent;
    this.departmentInput.value = children[1].textContent;
    this.salaryInput.value = children[2].textContent;
  }

  updateEmployeeOnUI(employee,parent){
    parent.innerHTML =`<tr>                                  
    <td>${employee.name}</td>
    <td>${employee.department}</td>
    <td>${employee.salary}</td>
    <td>${employee.id}</td>
    <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
    <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td></tr>
    `

    this.clearAllInputs();


  }



}