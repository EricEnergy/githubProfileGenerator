const axios = require('axios');
const inquirer = require('inquirer');
const pdf = require('html-pdf');

function writeToPDF(html) {
  const options = { format: 'Letter' };
  pdf.create(html, options).toFile('./resume.pdf', (err) => {
    if (err) throw err;
  });
} 

function buildHTML(response) {
  const {
    name, 
    login, 
    location, 
    avatar_url, 
    bio
  } = response.data;

  const html =  
  `
    <html>
      <body>
        <h1>${name} | <span>${login}</span></h1>
        <h2>${location}</h2>
        <img width="50" height="50" src="${avatar_url}" />
        <p>${bio}</p>
      </body>
    </html>
  `;
  writeToPDF(html);
}

inquirer.prompt({
  message: "Enter you GitHub username",
  name: "username"
}).then(function({ username }) {
  const url = `https://api.github.com/users/${username}`;
  axios.get(url).then(buildHTML);
});
