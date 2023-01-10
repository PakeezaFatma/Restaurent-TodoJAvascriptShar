function saveToLocalStorage(event)
{
   
    event.preventDefault();
    const price = document.getElementById('amount').value;
    const dish = document.getElementById('dish').value;
    const table = document.getElementById('table').value;
    console.log(table)
   
    const obj={
        price,
        dish,
        table
        
    }
    
   axios.post("https://crudcrud.com/api/4c60b8a35b844e12a658a968951bd76f/order",obj)
   .then((response) =>{
    console.log(response);
   }) 
   .catch((err) =>{
    console.log(err);
   })
   showNewOrderOnScreen(obj)
}


   function showNewOrderOnScreen(order){
    document.getElementById('amount').value ='';
    document.getElementById('dish').value ='';
    document.getElementById('table').value='';
    
    
    // const parentNode= document.getElementById('listofOrder1');



    if(`${order.table}` === "table1")
    {

        var parentNode= document.getElementById('listofOrder1'); 
    }
    else if(`${order.table}` === "table2"){
        var parentNode= document.getElementById('listofOrder2'); 
    }
    else{
        var parentNode= document.getElementById('listofOrder3');
    }
    const childHTML =`<li class="inputs" textDecoration="none" id=${order._id}>Price: ${order.price} - Dish: ${order.dish} - TableNo: ${order.table}
    <button class="todo-btn" onclick=deleteOrder('${order._id}')> Delete Order </button>   

    </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;

}
window.addEventListener("DOMContentLoaded" ,()=>{
    axios.get("https://crudcrud.com/api/4c60b8a35b844e12a658a968951bd76f/order")
    .then((response) =>{
        console.log(response);
        for(var i=0;i<response.data.length;i++){
            showNewOrderOnScreen(response.data[i]);
        }
    })
    .catch((error) =>{
        console.log(error);
    })
})
function deleteOrder(orderId){
    axios.delete(`https://crudcrud.com/api/4c60b8a35b844e12a658a968951bd76f/order/${orderId}`)
    .then((response) =>{
        removeOrderFromScreen(orderId)
    })
    .catch((err) =>{
        console.log(err)
    })
}

function removeOrderFromScreen(orderId){
    const parentNode = document.getElementById('listofOrder1');
    const childNodeToBeDeleted = document.getElementById(orderId);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
