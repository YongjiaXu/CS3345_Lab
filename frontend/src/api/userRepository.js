import axios from "axios";

export class UserRepository {
    // url = 'http://localhost:8000';
    url = 'http://18.222.82.140:8000';
    config = {};

    // get all the users
    getUsers(params) {
        return new Promise((resolve, reject) => {
            if (params) {
                let config = this.config;
                config.params = params;
            }
            axios.get(`${this.url}/getit/users`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert("catch error when getting users");
                    reject();});
        });
    }


    // get specific user
    getUser(username) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getit/user?Username=${username}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert("User does not exist!.");
                reject();
            });
        });
    }

    // add a new user
    addUser(username, password, homeCountry, userPerms) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/postit/user?username=${username}&password=${password}&homeCountry=${homeCountry}&userPerms=${userPerms}`,
                {username, password, homeCountry, userPerms}, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();});
        })
    }

    // get the list of reviews
    getRatings() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getit/ratings`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert("catch error when getting ratings");
                    reject();});
        });
    }

    // update username
    updateUsername(usernameNew, usernameOld, passwordOld, permsOld, countryOld) {
        return new Promise((resolve, reject) => {
            console.log(usernameNew + usernameOld);
            axios.put(`${this.url}/putit/username?usernameNew=${usernameNew}&usernameOld=${usernameOld}&passwordOld=${passwordOld}
            &permsOld=${permsOld}&countryOld=${countryOld}`, {usernameNew, usernameOld, passwordOld, permsOld, countryOld}, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        })
    }

    // update password
    updatePwdByName(password, username){
        return new Promise((resolve, reject)=> {
            axios.put(`${this.url}/putit/password?passwordNew=${password}&usernameOld=${username}`, {password, username}, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        })
    }

    // update home country
    updateHomeCountry(countryNew, username) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/putit/homecountry?countryNew=${countryNew}&username=${username}`, {countryNew, username}, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        });
    }

    // update user perms
    updateUserPerms(permsNew, username) {
        var perms;
        if(permsNew == true){
            perms = 1;
        }
        else{
            perms = 0;
        }
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/putit/userperms?permsNew=${perms}&username=${username}`, {perms, username}, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        })
    }
    
    // delete user
    deleteUser(username){
        console.log(username);
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/deleteit/user?usernameOld=${username}`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        })
    }
}