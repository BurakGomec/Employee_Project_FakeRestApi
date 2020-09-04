export class Request {
    constructor(url){
        this.url=url;
    }
    async get(){
       const response = await fetch(this.url);
       const responseData = await response.json();
       return responseData;

    }
    async post(data){
        const response=await fetch(this.url,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
        //  .then(response => response.json())
        //  .then(json => console.log(json));

           const responseData = await response.json();
           return responseData;
    }
    async put(id,data){
        //Varolan bir veriyi günceller
        const response=await fetch(this.url+"/"+id,{
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
        //  .then(response => response.json())
          //.then(json => console.log(json));
        const responseData = await response.json();
        return responseData;
    }
    async delete(id){
        
        const response=await fetch(this.url+"/"+id,{method: 'DELETE'});
         const responseData = await response.json();
         return id+" . veri basariyla silindi";
    };

    
}

  



