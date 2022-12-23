const inpM = document.querySelector('#inpwinput');
const buttonM = document.querySelector('#inpwbtn');
const listM = document.querySelector('#listM');
const listInput = document.querySelector('.item');
let spisok = localStorage.getItem('DataStr') ? JSON.parse(localStorage.getItem('DataStr')) : []
console.log(spisok);

function Task(desc,checked){
    this.desccr=desc;
    this.complete=false;
}
function vyvod(x,index){
    return `
    <div class="item ${(x.complete)? 'checked' : ''} itm${index}">
        <p>${x.desccr}</p><p><input onclick="completeTask(${index})" type="checkbox" ${(x.complete)? 'checked' : ''}>
        <button onclick="deleteTask(${index})">delete</button></p>
    </div>
    `
}

const updateLocal = () =>{
    localStorage.setItem('DataStr',JSON.stringify(spisok))
}
buttonM.addEventListener("click",()=>{
    spisok.unshift(new Task(inpM.value,inpM.checked));
    inpM.value='';
    localStorage.clear()
    updateLocal();
    getList();
})
const filterTask = () => {
    const activeTask = spisok.length && spisok.filter(item => item.complete == false);
    const completedTask = spisok.length && spisok.filter(item => item.complete == true);
    spisok = [...activeTask, ...completedTask]
}

const completeTask = index =>{
    spisok[index].complete = !spisok[index].complete;
    getList()
    updateLocal()
}
const deleteTask = index =>{
    document.querySelector('.itm'+index).classList.add('delitem');
    setTimeout(()=>{
        // удаляем с индекса index 1 элемент
        spisok.splice(index,1)
        getList()
        updateLocal()
    },500)
}
const getList = () =>{
    listM.innerHTML='';
    if(spisok.length>0){
        filterTask()
        spisok.map((val,index)=>{
            listM.innerHTML+=vyvod(val,index)
        })
    }
}
getList()
