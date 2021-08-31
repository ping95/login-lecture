"use strict"

const e = require("express");
const fs = require("fs").promises;

class UserStorage {
    static #getUserInfo() {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users);
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }

    static getUsers(...fields) {
        fs.readFile("./src/databases/users.json", (err, data) => {
            if (err) throw err;
            const users = JSON.parse(data);
            const newUsers = fields.reduce((newUsers, field) => {
                if (users.hasOwnProperty(field)) {
                    newUsers[field] = users[field];
                }
                return newUsers;
            }, {});
            return newUsers;
        });
    };

    static getUserInfo(id) {
        fs.readFile("./src/databases/users.json")
            .then((data) => {
                return this.#getUserInfo(data, id);
            })
            .catch(console.error);
    }

    static save(userinfo) {
        fs.readFile("./src/databases/users.json", (err, data) => {
            if (err) throw err;
            const users = JSON.parse(data);
            users.id.push(userinfo.id);
            users.name.push(userinfo.name);
            users.psword.push(userinfo.psword);
            return { success: true };
        });
    }
}

module.exports = UserStorage;