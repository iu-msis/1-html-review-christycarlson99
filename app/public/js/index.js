const Person = {
    data() {
      return {
        "person": {},
        "offers": [
                {
                    "id": 1,
                    "name": "Jane Student",
                    "offer": 100000,
                    "bonus": 9000,
                    "company": "EY",
                    "offerDate": "2021-10-05"
                },
                {
                    "id": 2,
                    "name": "Jordan Student",
                    "offer": 87000,
                    "bonus": 3000,
                    "company": "IU",
                    "offerDate": "2021-09-25"
                }
            ]
        }
    },

    created() {
      fetch('https://randomuser.me/api/')
      .then(response => response.json()) //response is parameter =>
      .then((parsedJson) => {
        console.log(parsedJson); //checks data - debugger lite
        this.person = parsedJson.results[0]
      })
      .catch(err => {
        console.error(err)
      })

    }
  }
  
Vue.createApp(Person).mount('#result');

//created is an event hook - function called after vue application created 
//don't need to name function
//then is the promise object
//response returns the promise object
//this. refers to the current object 

//LONG WAY TO CREATE FUNCTION
// created() {
//   fetch('https://randomuser.me/api/')
//   .then(function(response){
//     response.json() 
//   }) 
//   .then(function (parseddJson) {

//   })
//   .catch(errFunc) 

// }