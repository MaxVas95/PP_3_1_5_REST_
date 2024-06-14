async function fillEditedUserPage(id) {
    const url = "api/admin/" + id
    let page = await fetch(url);

    if (page.ok) {
        let user = await page.json();
        const action = "edit";
        await showEditedUser(user, action);
    } else {
        alert(`Error, ${page.status}`)
    }
}

async function fillDeleteUserPage(id) {
    const url = "api/admin/" + id
    let page = await fetch(url);

    if (page.ok) {
        let user = await page.json();
        const action = "delete";
        await showEditedUser(user, action);
        await userDelete();
    } else {
        alert(`Error, ${page.status}`)
    }
    console.log();
}


async function showEditedUser(user, action) {

    const editIdInput = document.getElementById(action + 'Id');
    const editFirstNameInput = document.getElementById(action + 'FirstName');
    const editLastNameInput = document.getElementById(action + 'LastName');
    const editAgeInput = document.getElementById(action + 'Age');
    const editEmailInput = document.getElementById(action + 'Email');
    const editRoleSelect = document.getElementById(action + 'Role');

    editIdInput.value = user.id;
    editFirstNameInput.value = user.firstName;
    editLastNameInput.value = user.lastName;
    editAgeInput.value = user.age;
    editEmailInput.value = user.username;
    await fillRoles(action); // Вызываем функцию fillRoles() для заполнения списка ролей

    user.roles.forEach(role => {
        editRoleSelect.querySelectorAll('option').forEach(option => {
            if (option.value === role.authority) {
                option.selected = true; // Выбираем текущую роль пользователя
            }
        });
    });
}

async function fillRoles(action) {
    const urlRoles = '/api/admin/roles';
    let page = await fetch(urlRoles)
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById(action + 'Role');
            selectElement.innerHTML = '';
            data.forEach(role => {
                const option = document.createElement('option');
                option.value = role.role;
                option.text = role.role.substring(5);
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}