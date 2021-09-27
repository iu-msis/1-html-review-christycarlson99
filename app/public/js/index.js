const app = {
  data() {
    return {
      "person": {
        name: {},
        dob: {},
        picture: {},
        location: {}
      },
    }
  },

  // computed: {
  //   prettyBirthday() {
  //     return this.person.dob.date;
  //   }
  // },

  methods: {
    refreshPage(){
      window.location.reload();
    },
    
    fetchUserData() {
      fetch('https://randomuser.me/api/')
      .then(response => response.json()) //response is parameter =>
      .then((parsedJson) => {
        console.log(parsedJson); //checks data - debugger lite
        this.person = parsedJson.results[0]
        this.dob = this.person.dob.date[5] + this.person.dob.date[6] + this.person.dob.date[7] + this.person.dob.date[8] + this.person.dob.date[9] + this.person.dob.date[4] +this.person.dob.date[0] + this.person.dob.date[1] +this.person.dob.date[2] +this.person.dob.date[3]
      })
      .catch(err => {
        console.error(err)
      })

    }

  },

  created() {
    this.fetchUserData();
  }

  
}

Vue.createApp(app).mount('#results');

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

// Resources : https://stackoverflow.com/questions/62975890/how-to-reload-refresh-a-webpage-in-vue-js-after-a-certain-event-or-a-button-is-c