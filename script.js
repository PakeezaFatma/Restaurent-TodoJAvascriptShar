function print(){
    console.log("Hi")
}
print();
function saveToLocalStorage(event)
{
   
    event.preventDefault();
    const price = document.getElementById('amount').value;
    const dish = document.getElementById('dish').value;
    const table = document.getElementById('table').value;
    console.log("in function");
    const obj={
        price,
        dish,
        table
        
    }
    console.log("error");
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
    if(localStorage.getItem(order.table)!== null)
    {
        removeOrderFromScreen(order.table)
    }
    const parentNode= document.getElementById('listofOrder1,listofOrder2,listofOrder3');
    const childHTML =`<li id=${order._id}>${order.price} - ${order.dish} - ${order.table}
    <button onclick=deleteOrder('${order._id}')> Delete Order </button>   

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
    const parentNode = document.getElementById('listofOrder1,listofOrder2,listofOrder3');
    const childNodeToBeDeleted = document.getElementById(orderId);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
