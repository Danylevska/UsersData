const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const cityInput = document.querySelector("#city");
const createButton = document.querySelector("#create");
const usersSection = document.querySelector("#users-section");
const searchInput = document.querySelector("#search");
const sortingByNameCheckbox = document.querySelector("#sort-by-name");
const sortingByAgeCheckbox = document.querySelector("#sort-by-age");
const paginationSection = document.querySelector('#pagination');

let users = [
{ name: "Igor", age: 23, city: "Kyiv"},
  { name: "Alex", age: 18, city: "Kyiv"},
  { name: "Oleg", age: 20, city: "Kyiv"},
  { name: "Vasya", age: 23, city: "Kyiv"},
  { name: "Masha", age: 18, city: "Kyiv"},
  { name: "Danya", age: 20, city: "Kyiv"},
  { name: "Olya", age: 23, city: "Kyiv"},
  { name: "Sonya", age: 18, city: "Kyiv"},
  { name: "Tanya", age: 20, city: "Kyiv"},
  { name: "Sonya", age: 18, city: "Kyiv"},
  { name: "Sonya", age: 18, city: "Kyiv"},
];

let changingUser = undefined;
let paginationPageNumber = 0;

renderUsers();

const deleteUser = (indexOfUser) => {
  users = users.filter((el, i) => i !== indexOfUser);

  renderUsers();
};

const editUser = (indexOfUser) => {
changingUser = {data: users[indexOfUser], index: indexOfUser};
createButton.textContent = "Save changes";
nameInput.value = changingUser.data.name;
ageInput.value = changingUser.data.age;
cityInput.value = changingUser.data.city;
};

function renderPagination (usersQuantity) {
   paginationSection.innerHTML = "";
     
    for (let i = 0; i < usersQuantity / 3; i++) {
const button = document.createElement('button');
button.textContent = i;

button.onclick = () => {
    paginationPageNumber = i;
    const groupedUsers = groupElementsOfArray(users, 3);

    renderUsers();
}
paginationSection.appendChild(button);
    }

};


const sortingNames = { 
    names: () => {
        const usersCopy = [...users];
        usersCopy.sort((user1, user2) => user1.name.localeCompare(user2.name))
        console.log(usersCopy);
        renderUsers(usersCopy);
    } 
      
}

const sortingAges = { 
    ages: () => {
        const usersCopy = [...users];
        usersCopy.sort((user1, user2) => Number(user1.age) - Number(user2.age));
        console.log(usersCopy);
        renderUsers(usersCopy);
    } 
      
};


function renderUsers(usersToRender = groupElementsOfArray(users, 3)[paginationPageNumber]) {
  renderPagination(users.length);
  usersSection.innerHTML = "";

  const usersContent = usersToRender.map(
    (user) => `<div class="user-card">
        <div class="user-card1">
        <span>${user.name}</span>
        <span>${user.city}</span>
        <span>${user.age}</span>
        <button class="delete-user-button">Delete User</button>
        </div>
        <div class="user-card2">
        <button class="edit-user-button">Edit</button>
        <div>
    </div>`
  );

  usersContent.forEach((userLayout) => {
    usersSection.innerHTML += userLayout;
  });

  const deleteButtons = [...document.querySelectorAll(".delete-user-button")];
  deleteButtons.forEach((button, i) => {
    button.onclick = () => deleteUser(i);
  });

  const editButtons = [...document.querySelectorAll(".edit-user-button")];
  editButtons.forEach((button, i) => {
    button.onclick = () => editUser(i);
  });
}


createButton.onclick = () => {
  const name = nameInput.value;
  const age = +ageInput.value;
  const city = cityInput.value;

if(!name || !age || !city) {
    return alert("Please, fill all information")
}

  if (changingUser) {
    
    users[changingUser.index] = {
        name: name,
        age: age,
        city: city
    };

    changingUser = undefined;
    createButton.textContent = "Create User";

  } else {
    const user = { name: name, age: age, city: city };
    users.push(user);
  }

  nameInput.value = "";
  ageInput.value = "";
  cityInput.value = "";

  renderUsers();
};


searchInput.oninput = (event) => {
    if(!event.target.value) return renderUsers ();
    
  const usersToRender = users.filter(({ name, age, city }) =>
    [name, age.toString(), city].some((element) =>
      element.includes(event.target.value)
    )
  );

  renderUsers(usersToRender);
};



sortingByNameCheckbox.onchange = (event) => {
    if (event.target.checked) {
        sortingNames.names();
        sortingByAgeCheckbox.checked = false; 
    } else {
        renderUsers();
    }
}

sortingByAgeCheckbox.onchange = (event) => {
    if (event.target.checked) {
        sortingAges.ages();
        sortingByNameCheckbox.checked = false; 
    } else {
        renderUsers();
    }
}

function groupElementsOfArray ( arr, oneSetQuantity)  {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr.slice(i * oneSetQuantity, (i + 1) * oneSetQuantity))
    }
    return result.filter((arr) => arr.length > 0);
}
