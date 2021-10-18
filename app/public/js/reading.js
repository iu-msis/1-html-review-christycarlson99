const app1 = {
  data() {
    return {
      books: [],
      bookForm: {},
      selectedBook: null,

    }
  },
  computed: {},
  methods: {
      fetchBookData(b) {
        fetch('/api/book/')
        .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.books = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      },
      postNewBook(evt) {       
        console.log("Posting:", this.bookForm);
        // alert("Posting!");

        fetch('api/book/create.php', {
            method:'POST',
            body: JSON.stringify(this.bookForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;
            
            // reset the form
            this.bookForm = {};
          });
      }
      
  },
  created() {
      this.fetchBookData();
  }

}

Vue.createApp(app1).mount('#readingResults');

// Resources : https://stackoverflow.com/questions/62975890/how-to-reload-refresh-a-webpage-in-vue-js-after-a-certain-event-or-a-button-is-c