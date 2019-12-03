// hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");


// create questions to ask user 


async function init() {
    const usersAnswers = await inquirer.prompt([{
        message: "Enter your GitHub username:",
        name: "username"
        },
    {
        type: "list",
        message: "What is your preferred color?",
        name: "contact",
        choices: ["green", "blue", "pink", "red"]
    }]);
    let username = usersAnswers.username;
    let colorTheme = usersAnswers.contact;
    
    try {
        const response = await axios(`https://api.github.com/users/${username}`);
        let userInfo = {
            image: response.data.avatar_url,
            name: response.data.name,
            location: response.data.location,
            profile: response.data.html_url,
            blog: response.data.blog,
            bio: response.data.bio,
            publicrepos: response.data.public_repos,
            followers: response.data.followers,
            following: response.data.following,
        }
        var userStars = await axios(`https://api.github.com/users/${username}/starred`);
        for (var i = 0; i < userstars.data.length; i++){
            var totalStars = totalStars + userStars.data[1].stargazers_count};

        var stars = totalStars;
        fs.writeFile("user.json", JSON.stringify(stars, null, 2), function(err){
            if(err){ throw err}
        })
        console.log(colorTheme);
        console.log(stars);
    } catch (error) {
        throw error;
    }
}

init()