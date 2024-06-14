async function createNewUser(user) {
    try {
        const response = await fetch("/api/admin", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Ошибка при создании нового пользователя');
        }
    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}

async function addNewUserFrom() {

    const newUserForm = document.getElementById("formNewUser");
    newUserForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const firstName = document.getElementById("Firstname").value.trim();
        const lastName = document.getElementById("Lastname").value.trim();
        const age = document.getElementById("age").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const rolesSelected = document.getElementById("setListRole");
        const roles = Array.from(rolesSelected.selectedOptions)
            .filter(option => option.selected)
            .map(option => option.value);
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            username: email,
            password: password,
            roles: roles
        };
        await createNewUser(newUser);
        newUserForm.reset();
        document.querySelector('button#home-tab').click();
        await adminShowAllUsers()
    });
}


addNewUserFrom();