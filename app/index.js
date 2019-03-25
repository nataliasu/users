import './styles/styles.scss';

let usersList = [];
let companiesList = [];

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
            index: i,
            name: companies[i].name,
            uri: companies[i].uri,
            users: [],
            usersAmount: []
        });
    }
    //pushing usersList into companiesList.users
    for (let i = 0; i < usersList.length; i++) {
        const userIndex = usersList[i].companyNumber;
        const userEmail = usersList[i].email;
        companiesList[userIndex].users.push(userEmail);
    }
    //pushing usersAmount into companiesList
    for(let i=0; i<companiesList.length; i++){
        const usersLength = companiesList[i].users;
        companiesList[i].usersAmount.push(usersLength.length);
    }
    // sorting the list
    companiesList.sort((a, b) => {
        const one = a.users.length;
        const two = b.users.length;
        if (one > two) {
            return 1;
        } else if (one < two) {
            return -1;
        }
        return 0;
    });
};

init();
//console.log(companiesList);

var $table = $('#table');
var $button = $('#button');
var $button2 = $('#button2');

$(function(){
    $table.bootstrapTable('load', companiesList);
    $button.click(function () {
        $table.bootstrapTable('showColumn', 'users')
    })
    $button2.click(function () {
        $table.bootstrapTable('hideColumn', 'users')
    })
});

