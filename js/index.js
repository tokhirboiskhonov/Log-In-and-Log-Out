const token = window.localStorage.getItem('token');

if(!token){
    window.location.replace('login.html')
}

const elUsersList = document.querySelector('.users__list');
const elUserTemplate = document.querySelector('.user__template').content;

function renderUsers(arr, node){
    node.innerHTML = null;

    const usersFragment = document.createDocumentFragment();

    arr.forEach((row) => {
        const userTemplete = elUserTemplate.cloneNode(true);

        userTemplete.querySelector('.user__avatar').src = row.avatar

        userTemplete.querySelector('.user__avatar').alt =
			row.first_name + ' ' + row.last_name + ' picture';

		userTemplete.querySelector('.user__fullname').textContent = row.first_name + ' ' + row.last_name;

		userTemplete.querySelector('.user__email').textContent = row.email;

		userTemplete.querySelector('.user__email').href = 'mailto:' + row.email;

		userTemplete.querySelector('.user__delete-button').dataset.userId = row.id;

        usersFragment.appendChild(userTemplete)
    });

    node.appendChild(usersFragment);
}

let users = [];

async function getUsers(){
    try{
        const response = await fetch('https://reqres.in/api/users?page=1');
        
        const data = await response.json();

        if(data){

            users = data.data;
            
            renderUsers(data.data, elUsersList)
        }
    }catch (err){
        console.error(err);
    }
}

elUsersList.addEventListener('click', (evt) => {
   const isDeleteBtn = evt.target.matches('.user__delete-button');

   if(isDeleteBtn){
       const { userId } = evt.target.dataset;

       const foundUserId = users.findIndex((row) => row.id == userId);


       fetch('https://reqres.in/api/users/' + foundUserId, {
			method: 'DELETE',
		}).then((response) => {
			if (response.status === 204) {
				users.splice(foundUserId, 1);

				renderUsers(users, elUsersList);
			}
		});
   }
});

btnLogOut.addEventListener('click', () => {
    window.localStorage
    .removeItem('token');

    window.location.replace('login.html');
})

getUsers()


