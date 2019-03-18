//import './styles/styles.scss';

window.onload = () => {
    fetch('http://localhost:3000/users')
        .then(response = > response.json())
        .then(response => {
            console.log(response)
        })
};
