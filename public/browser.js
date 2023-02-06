const form=document.getElementById('form')
const inputField=document.getElementById('input')
//our list item (div) reference
const list=document.getElementById('list')
const refreshBtn=document.getElementById('refresh')
refreshBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.reload()
})
const generateElement=(x,y)=>{
return `
<div class="bg-slate-200 w-[80%] mx-auto p-2 flex justify-between items-center">
    <h3 class="item-text text-slate-500 font-medium">${y}</h3>
    <div class="class="flex justify-center gap-x-3">
        <button data-id=${x} class="delete p-1 rounded-sm bg-red-600 text-white">delete</button>
        <button data-id=${x} class="edit p-1 bg-emerald-500 text-white">edit</button>
    </div>
</div>
`
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    axios.post('/create',{text:inputField.value}).then((response)=>{
        list.insertAdjacentHTML("beforeend",generateElement(response.data,inputField.value))
    })
})
document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('edit')){
    const userTextInput=prompt('put your updated text')
    axios.post('/update',{text:userTextInput,_id:e.target.getAttribute("data-id")}).then(()=>{
        e.target.querySelector('.item-text').innerText=userTextInput
    })}
    if(e.target.classList.contains('delete')){
        if(confirm('you are sure !')){
        axios.post('/delete',{_id:e.target.getAttribute("data-id")}).then(()=>{
            console.log('success')
        })}
    }
})