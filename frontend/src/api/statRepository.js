import axios from "axios";

export class StatRepository {
    // url = 'http://localhost:8000';
    url = 'http://18.222.82.140:8000';
    config = {};

    //----------------------------COUNTRY----------------------------
    // get all the countries
    getCountries(params) {
        return new Promise((resolve, reject) => {
            if (params) {
                let config = this.config;
                config.params = params;
            }
            axios.get(`${this.url}/getit/countries`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert("catch error when getting countries");
                    reject();});
        });
    }

    // get a specific country
    getCountry(countryName) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getit/country?Country=${countryName}`, this.config)
                .then(x => resolve(x.data))
                .catch( e=> {
                    alert("could not get country "+countryName);
                    reject();
                });
        });
    }

    // get a specific country's ratings
    getCountryReviews(countryName) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getit/ratingscountry?Country=${countryName}`, this.config)
                .then(x => resolve(x.data))
                .catch( e=> {
                    alert("Could not get "+countryName+" ratings");
                    reject();
                });
        });
    }

    // get all cities in given country
    getCitiesOfCountry(countryName) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getit/allcities?Country=${countryName}`, this.config)
                .then(x => resolve(x.data))
                .catch( e=> {
                    alert("Could not get "+countryName+" ratings");
                    reject();
                });
        });
    }

    // update a country's case number
    updateCoCaseNum(countryName, caseNum) {
        var num = parseInt(caseNum);
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/putit/countryCaseNumber?country=${countryName}&caseNum=${caseNum}`, {num, countryName}, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        });
    }
    

    // update a country's death number
    updateCoDeathNum(countryName, deathNum) {
        var num = parseInt(deathNum);
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/putit/countryDeathNumber?country=${countryName}&deathNum=${deathNum}`, {num, countryName}, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        });
    }

    // update a country's alert level
    updateCoAlertLevel(countryName, alertLevel) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/putit/countryAlertLevel?country=${countryName}&alertLevel=${alertLevel}`, {alertLevel, countryName}, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        });
    }

    // update a country's alert description
    updateCoAlertDesc(countryName, alertDesc) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/putit/countryAlertDesc?country=${countryName}&alertDesc=${alertDesc}`, {alertDesc, countryName}, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        });
    }


    // update a country's image map
    updateCoImageMap(imageMapURL, country){
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/putit/imageMapURL?imageMapURL=${imageMapURL}&country=${country}`, {imageMapURL, country}, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        });
    }

    // update a country's disable status
    updateCoDisable(disabledStatus, country){
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/putit/disabledStatus?disabledStatus=${disabledStatus}&country=${country}`, {disabledStatus, country}, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        })
    }

    addCountry(country, population, caseNum, deathNum, alertLevel, alertDesc, disabledStatus, imageMap) {
        var disable;
        if(disabledStatus == true){
            disable = 1;
        }
        else{
            disable = 0;
        }
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/postit/countries?country=${country}&population=${population}&caseNum=${caseNum}
                &deathNum=${deathNum}&alertLevel=${alertLevel}&alertDesc=${alertDesc}&disabledStatus=${disable}
                &imageMap=${imageMap}`, 
                {country, population, caseNum, deathNum, alertLevel, alertDesc, disable, imageMap}, this.config)
                    .then(x => resolve(x.data))
                    .catch(e => {
                        alert(e);
                        reject();
                    }); 
        });
    }

    deleteCountry(countryName){
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/deleteit/Countries?countryName=${countryName}`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                }); 
        });
    }

    //----------------------------CITY----------------------------

    // get all the cities
    getCities(params) {
        return new Promise((resolve, reject) => {
            if (params) {
                let config = this.config;
                config.params = params;
            }
            axios.get(`${this.url}/getit/cities`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert("catch error when getting cities");
                    reject();});
        });
    }

    // get a specific city
    getCity(cityName) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getit/city?City=${cityName}`, this.config)
                .then(x => resolve(x.data))
                .catch( e=> {
                    alert("could not get city "+cityName);
                    reject();
                });
        });
    }

    // update a city's case number
    updateCiCaseNum(cityName, caseNum) {
        var num = parseInt(caseNum);
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/putit/cityCaseNum?city=${cityName}&caseNum=${caseNum}`, {num, cityName}, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        });
    }
    

    // update a city's death number
    updateCiDeathNum(cityName, deathNum) {
        var num = parseInt(deathNum);
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/putit/cityDeathNum?city=${cityName}&deathNum=${deathNum}`, {num, cityName}, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        });
    }

    addCity(city, country, caseNum, deathNum) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/postit/city?city=${city}&country=${country}&caseNum=${caseNum}
                &deathNum=${deathNum}`, 
                {city, country, caseNum, deathNum}, this.config)
                    .then(x => resolve(x.data))
                    .catch(e => {
                        alert("cannot add city");
                        reject();
                    }); 
        });
    }

    deleteCity(name){
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/deleteit/city?Name=${name}`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert("cannot add city");
                    reject();
                }); 
        });
    }

    //----------------------------RATING----------------------------

    // add new rating
    addRating(rating, comment, user, numup, numdown, country) {
        var up = parseInt(numup);
        var down = parseInt(numdown);
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/postit/rating/?rating=${rating}&comment=${comment}&user=${user}&numup=${numup}&numdown=${numdown}&${country}`,
                {rating, comment, user, up, down, country}, this.config)
                    .then(x => resolve(x.data))
                    .catch(e => {
                        alert("cannot add review");
                        reject();
                    }); 
        });
    }

    // delete a rating
    deleteRating(id) {
        return new Promise((resolve, reject)=> {
            axios.delete(`${this.url}/deleteit/rating?ID=${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert("cannot delete review");
                    reject();
                });
        })
    }

    numUpIncrement(id) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/putit/incrementNumUp?ID=${id}`, id, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        });
    }

    numDownIncrement(id) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/putit/incrementNumDown?ID=${id}`, id, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e);
                    reject();
                });
        });
    }
}