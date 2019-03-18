//import './styles/styles.scss';

fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(response => {
        console.log(response)
    })
