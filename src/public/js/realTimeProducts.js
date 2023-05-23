const form = document.getElementById('saveProduct');

form.addEventListener('submit' , (evt)=>{
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};

    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/products/',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-type':'application/json'
        }
    }).then(result=>result.json())
    .then(json=>console.log(json));
})