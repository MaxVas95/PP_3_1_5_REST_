document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.getElementById('userUpdateButton');
    editButton.addEventListener('click', function (event) {
        saveEditedUser(event);
    })
})

async function saveEditedUser(event) {
    event.preventDefault();
    const editIdInput = document.getElementById('editId');
    const editFirstNameInput = document.getElementById('editFirstName');
    const editLastNameInput = document.getElementById('editLastName');
    const editAgeInput = document.getElementById('editAge');
    const editEmailInput = document.getElementById('editEmail');
    const editPassword = document.getElementById('editPassword');
    const editRolesSelected = document.getElementById("editRole");
    const editRoles = Array.from(editRolesSelected.selectedOptions)
        .filter(option => option.selected)
        .map(option => option.value);

    const editedUser = {
        id: editIdInput.value,
        firstName: editFirstNameInput.value,
        lastName: editLastNameInput.value,
        age: editAgeInput.value,
        username: editEmailInput.value,
        password: editPassword.value,
        roles: editRoles
    };
    const url = "api/admin/update";
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUser)
    };

    const response = await fetch(url, options);
    if (response.ok) {
        document.getElementById("updateClose").click();
        adminShowAllUsers();
    } else {
        console.error('Failed to update user:', response.status);
    }



}
async function userDelete() {
    const deleteMod = document.getElementById("delete-form")
    deleteMod.addEventListener("submit", remove)

    function remove(addEvent) {
        addEvent.preventDefault()
        const deleteId = document.getElementById('deleteId');
        let urlDel = "api/admin/" + deleteId.value;
        let method = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(urlDel, method).then(() => {
            document.getElementById("deleteClose").click();
            adminShowAllUsers()
        })
    }
}