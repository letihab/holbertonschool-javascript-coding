#!/usr/bin/node
//computes the number of tasks completed by user id.

const request = require('request');

const apiUrl = process.argv[2];

if (!apiUrl) {
    console.error("Usage: node 6-completed_tasks.js <api_url>");
    process.exit(1);
}

request(apiUrl, (error, response, body) => {
    if (error) {
        console.error(error);
    } else if (response.statusCode === 200) {
        const todos = JSON.parse(body);

        // Filter completed tasks
        const completedTasks = todos.filter(task => task.completed);

        // Count completed tasks for each user
        const completedTasksByUser = completedTasks.reduce((result, task) => {
            const userId = task.userId.toString();
            result[userId] = (result[userId] || 0) + 1;
            return result;
        }, {});

        console.log(completedTasksByUser);
    } else {
        console.error(`Error: ${response.statusCode}`);
    }
});
