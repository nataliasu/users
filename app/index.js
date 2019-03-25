const usersList = [];
const companiesList = [];

const init = async () => {
    const container = document.getElementById('table-content');
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    for (let i = 0; i < users.length; i++) {
        usersList.push({
            name: users[i].name,
            email: users[i].email,
            companyUri: users[i].uris.company,
            companyNumber: users[i].uris.company.substring(11)
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
            usersAmount: 0
        });
    }

    //pushing usersList into companiesList.users
    for (let i = 0; i < usersList.length; i++) {
        const userIndex = usersList[i].companyNumber;
        const userEmail = usersList[i].email;
        const userName = usersList[i].name;

        companiesList[userIndex].users.push({
            email: userEmail,
            name: userName
        });
        companiesList[userIndex].usersAmount++;
    }

    // sorting the list
    companiesList.sort((a, b) => {
        return a.usersAmount - b.usersAmount;
    });

    // render all table
    let templateString = '';
    
    companiesList.forEach((company, index) => {
        templateString += getTemplate(company, index);
    });

    container.innerHTML = templateString;

    hookEvents();
};

const getTemplate = ({usersAmount, name, users}, index) => {
    let userTemplateString = '';
    users.forEach(({email, name}) => {
        userTemplateString += `<ul data-target-click="${index}" class="list-group">
                                    <li class="list-group-item list-group-item-dark">
                                        <div class="row">
                                            <div class="col-6">
                                                ${email}
                                            </div>
                                            <div class="col-6 text-right">
                                                ${name}
                                            </div>
                                        </div>
                                    </li>
                                </ul>`;
    });
    let rows = `<tr data-open-click="${index}"><td colspan="3">${userTemplateString}</td></tr>`;
    return `<tr>
               <td>${index}</td>
               <td>${usersAmount}</td>
               <td>${name}</td>
               ${usersAmount ? rows : ''}
            </tr>`
};

const hookEvents = () => {
    const openHandlers = document.querySelectorAll('[data-open-click]');
    const targets = document.querySelectorAll('[data-target-click]');
    // init
    targets.forEach(target => {
        target.classList.add('d-none');
    });

    // add event listener check onclick if class is added if not add if yes remove

    openHandlers.forEach(handler => {
        handler.addEventListener('click', () => {
            const handlerId = handler.getAttribute('data-open-click');
            const target = document.querySelector(`[data-target-click="${handlerId}"]`);

            if (target.classList.contains('d-none')) {
                target.classList.remove('d-none');
                return;
            }

            target.classList.add('d-none');
        })
    });
};

init();
