// status - 0 : signup
// status - 1 : signin
// status - 2 : edit

const signup = document.getElementById('signup')
const signin = document.getElementById('signin')
const deleteId = document.getElementById('delete')
const edit = document.getElementById('edit')

let result = document.getElementById('result')

// localStorage.removeItem('users')
let users = JSON.parse(localStorage.getItem('users')) || [];

signup.addEventListener('click', () => {
    const uname = document.getElementById('name').value
    const mail = document.getElementById('email').value
    const pwd = document.getElementById('password').value

    let dateTime = new Date()
    let month = dateTime.getMonth() + 1
    let userid = '' + dateTime.getFullYear() + month + dateTime.getDate() + dateTime.getHours() + dateTime.getMinutes() + dateTime.getSeconds()

    if (!validateInputs('signup')) return;
    const user = {
        id: userid,
        username: uname,
        email: mail,
        password: pwd,
        status: 0
    }

    const existUsers = users.some((e) => e.email === user.email)
    if (existUsers) {
        result.innerHTML = 'User Already Registered'
        return;
    } else {
        users.push(user);

        localStorage.setItem('users', JSON.stringify(users))
        result.innerHTML = 'User Registered Successfully'
        console.log('user registered')
    }
})

signin.addEventListener('click', () => {
    const mail = document.getElementById('email').value
    const pwd = document.getElementById('password').value

    if (!validateInputs('signin')) return;

    // checking that user is exist or not
    const user = users.find((e) => e.email === mail && e.password === pwd)
    if (user) {
        createTable()
    } else {
        result.innerHTML = 'Invalid User'
    }
})


function validateInputs(param) {
    const uname = document.getElementById('name').value.trim()
    const mail = document.getElementById('email').value.trim()
    const pwd = document.getElementById('password').value.trim()

    if (param === 'signup' && (!uname || !mail || !pwd)) {
        alert('All fields are required')
        return false;
    }
    if (param === 'signin' && (!mail || !pwd)) {
        alert('Please Enter Value')
        return false;
    }
    return true;
}

deleteId.addEventListener('click', () => {
    const uname = document.getElementById('name').value.trim()
    const mail = document.getElementById('email').value.trim()
    const pwd = document.getElementById('password').value.trim()

    const user = users.find((e) => e.email === mail && e.password === pwd)
    if (user) {
        let deleteUsers = users.filter((e, i, arr) => {
            return user.id !== e.id
        })
        console.log('delete id :: ', deleteUsers)
        localStorage.setItem('users', JSON.stringify(deleteUsers))
    }
    createTable()
    return "Delete successfully"
})

edit.addEventListener('click', () => {
    const mail = document.getElementById('email').value.trim()
    const pwd = document.getElementById('password').value.trim()

    const user = users.find((e) => e.email === mail && e.password === pwd)
    if (!user) {
        return alert('Invalid user')
    }
    let chgName = prompt("Enter your name")
    let chgMail = prompt("Enter your email")
    let chgPwd = prompt("Enter your password")

    users.map((e, i, arr) => {
        if (user.id === e.id) {
            e.username = chgName ? chgName : e.username;
            e.email = chgMail ? chgMail : e.email;
            e.password = chgPwd ? chgPwd : e.password;
        }
    })
    localStorage.setItem('users', JSON.stringify(users))
    console.log('edited successfully')
    createTable()
    return "Edited Successfully"
})

const clearInp = document.getElementById('clrinp')
clearInp.addEventListener('click', () => {
    let uname = document.getElementById('name').value
    let mail = document.getElementById('email').value
    let pwd = document.getElementById('password').value

    uname = '';
    console.log('name ', uname)
    mail = '';
    pwd = '';
    result.innerHTML = "Data Cleared Successfully"
})

function createTable() {
    let tableHtml = "<table class='table'>";

    // Add header row
    tableHtml += "<tr class='table'><th class='table'>ID</th><th class='table'>UserName</th><th class='table'>Email</th><th class='table'>Password</th></tr>";

    users.forEach(row => {
        tableHtml += `<tr>
                <td class='table'>${row.id}</td>
                <td class='table'>${row.username}</td>
                <td class='table'>${row.email}</td>
                <td class='table'>${row.password}</td>
            </tr>`;
    });
    tableHtml += "</table>";

    // Set table HTML inside div
    document.getElementById("table-container").innerHTML = tableHtml;
    // result.innerHTML = 'Login Successfully'
}