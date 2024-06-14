async function getUser(){
    let page = await fetch("/api/user");
    if(page.ok){
        let user = await page.json();
        showUser(user);
        await showUserEmailOnNavbar(user);
    }else {
        alert(`Error, ${page.status}`)
    }
}
function showUser(user) {
    let roleString = [];
    let roleAdmin = false;
    for (let role of user.roles){
        roleString.push(" "+ role.role.toString().substring(5))
        if (role.role.toString() === "ROLE_ADMIN") {
            roleAdmin = true;
        }
    }
    let people = roleAdmin ? document.getElementById("show-admin") : document.getElementById("show-user");

    people.insertAdjacentHTML("beforeend",
        `<tr>
        <td> ${user.id}</td>
        <td> ${user.firstName}</td>
        <td> ${user.lastName}</td>
        <td> ${user.age}</td>
        <td> ${user.username}</td>
        <td> ${roleString.join(", ")}</td>
    </tr>
        `);

}
getUser();
async function showUserEmailOnNavbar(user) {
    const currentUserNavbar = document.getElementById("user-nav-bar")
    const userName = user.username;
    let userRoles = [];
    for (let role of user.roles) {
        userRoles.push(" " + role.role.toString().substring(5))
    }
    currentUserNavbar.innerHTML = userName + " with roles: " + userRoles.join(", ");
}