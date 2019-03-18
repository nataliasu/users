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

fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(users => {
        //filling usersList
        for (let i = 0; i < users.length; i++) {
            usersList.push({
                name: users[i].name,
                email: users[i].email,
                companyUri: users[i].uris && users[i].uris.company,
                companyNumber: users[i].uris.company && users[i].uris.company.substring(11)
            });
        }

        fetch('http://localhost:3000/companies')
            .then(response => response.json())
            .then(companies => {
                //filling companiesList
                for (let i = 0; i < companies.length; i++) {
                    companiesList.push({
                        name: companies[i].name,
                        uri: companies[i].uri,
                        users: []
                    });
                }
            })

            .then(() => {
                //pushing usersList into companiesList.users
                for (let i = 0; i < usersList.length; i++) {
                    const userIndex = usersList[i].companyNumber;
                    const userName = usersList[i].name;
                    companiesList[userIndex].users.push(userName);
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
            })
            //        console.log(companiesList);
            .then(() => {
                let tableText = table;
                //adding input into table
                for (let i = 0; i < companiesList.length; i++) {
                    tableText +=
                        `<tr class="table-light">
                        <td>${i}</td>
                        <td>${companiesList[i].name}</td>
                        <td>${companiesList[i].uri}</td>
                        </tr>`;

                }
                tableText += ending;
                document.getElementById('table').innerHTML = tableText;
            });
    });
