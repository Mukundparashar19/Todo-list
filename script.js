    const addBtn = document.getElementById('add')
    const btnText = addBtn.innerText;

    const searchBtn = document.getElementById('search')
    const recordsDisplay = document.getElementById('records')
    let usersArray = [];
    let edit_id = null;

// here we get our save obj in string form and then convert it in obj and store it in original array
let objStr = localStorage.getItem('users');
if (objStr) {
    usersArray = JSON.parse(objStr);
}

DisplayInfo();


    addBtn.onclick=()=>{
        const name = searchBtn.value;
        if(edit_id!=null){
            // edit
          usersArray.splice(edit_id,1,{'name':name});
          edit_id = null  
        }else{
            // insert
            usersArray.push({'name':name});
        }
  
  SaveInfo(usersArray);
  searchBtn.value = ''
 
  addBtn.innerText = btnText;
       }

    //    saving our array into local storage
    function SaveInfo(usersArray){
        let str = JSON.stringify(usersArray);
        localStorage.setItem('users',str);
        DisplayInfo();
    }

    function DisplayInfo(){
let statement = '';
usersArray.forEach((user,i) => {
    statement += ` <tr class="bg-gray-200 border-b  ">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        ${i+1}
    </th>
    <td class="px-6 py-4">
        ${user.name}
    </td>
    <td class="px-6 py-4">
      <div class="flex flex-row space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="text-blue-600 cursor-pointer hover:text-blue-800 " onclick='EditInfo(${i})' width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 18.08V19h.92l9.06-9.06l-.92-.92z" opacity="0.3"/><path fill="currentColor" d="M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83l3.75 3.75zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM5.92 19H5v-.92l9.06-9.06l.92.92z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="text-red-600 cursor-pointer hover:text-red-800 " onclick='DeleteInfo(${i})' width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1M6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"/></svg>

      </div>
    </td>
</tr>`;
});
recordsDisplay.innerHTML = statement;
    }



    function EditInfo(id){

        edit_id = id;
        searchBtn.value = usersArray[id].name
        addBtn.innerText = 'save Changes' 
    }

    function DeleteInfo(id){
    usersArray.splice(id,1);
    SaveInfo(usersArray);
   
    }