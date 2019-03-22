import './styles/styles.scss';

let usersList = [];
let companiesList = [];

const table =
    `<table id="companiesTable" class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Index</th>
                <th scope="col">Company Name</th>
                <th scope="col">URI</th>
            </tr>
        </thead>
        <tbody>`;

const ending =
    `   </tbody>
    </table>`

const init = async () => {
    const response = await fetch('http://localhost:3000/users')
    const users = await response.json();
    for (let i = 0; i < users.length; i++) {
        usersList.push({
            name: users[i].name,
            email: users[i].email,
            companyUri: users[i].uris && users[i].uris.company,
            companyNumber: users[i].uris.company && users[i].uris.company.substring(11)
        });
    }
    const res = await fetch('http://localhost:3000/companies');
    const companies = await res.json();
    for (let i = 0; i < companies.length; i++) {
        companiesList.push({
            name: companies[i].name,
            uri: companies[i].uri,
            users: []
        });
    }
    //pushing usersList into companiesList.users
    for (let i = 0; i < usersList.length; i++) {
        const userIndex = usersList[i].companyNumber;
        const userEmail = usersList[i].email;
        companiesList[userIndex].users.push(userEmail);
    }
    // sorting the list
    companiesList.sort((a, b) => {
        const one = a.users.length;
        const two = b.users.length;
        if (one > two) {
            return -1;
        } else if (one < two) {
            return 1;
        }
        return 0;
    });
    //        console.log(companiesList);
    let tableText = table;
    //adding input into table
    for (let i = 0; i < companiesList.length; i++) {
        tableText +=
            `<tr class="table-light">
                <td>${i}</td>
                <td>${companiesList[i].name}</td>
                <td>${companiesList[i].uri}</td>
            </tr>`;
        if (companiesList[i].users.length) {
            tableText +=
                `<tr>
                    <th scope="col">User index</th>
                    <th scope="col" colspan="2">Email</th>
                </tr>`

            for (let j = 0; j < companiesList[i].users.length; j++) {
                let row = `${j+1}`;
                tableText +=
                    `<tr id=${row}" class="table-info">
                            <td>${row}</td>
                            <td colspan="2">${companiesList[i].users[j]}</td>
                        </tr>`
            }

        }
    }

    tableText += ending;
    document.getElementById('table').innerHTML = tableText;
}

init();
