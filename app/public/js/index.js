const app = {
  data() {
    return {
      students: [],
      selectedStudent: null,
      offers: [],
      offerForm: {},
      books: [],
      bookForm: {},
      selectedBook: null,
    }
  },
  computed: {},
  methods: {
      selectStudent(s) {
          if (s == this.selectedStudent) {
              return;
          }
          this.selectedStudent = s;
          this.offers = [];
          this.fetchOfferData(this.selectedStudent);
      },
      fetchStudentData() {
          fetch('/api/student/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.students = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      },
      selectBook(b) {
        if (b == this.selectedBook) {
            return;
        }
        this.selectedBook = b;
        this.books = [];
        this.fetchBookData(this.selectedBook);
    },

      fetchBookData(b) {
        console.log("Fetching book data for ", b);
        fetch('/api/book/?book=' + b.id)
        .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.books = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
          .catch( (error) => {
              console.error(error);
          });
      },
      postNewBook(evt) {
        this.bookForm.id = this.selectedBook.id;        
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
      },
      fetchOfferData(s) {
          console.log("Fetching offer data for ", s);
          fetch('/api/offer/?student=' + s.id)
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.offers = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
          .catch( (error) => {
              console.error(error);
          });
      },
      postNewOffer(evt) {
        this.offerForm.studentId = this.selectedStudent.id;        
        console.log("Posting:", this.offerForm);
        // alert("Posting!");

        fetch('api/offer/create.php', {
            method:'POST',
            body: JSON.stringify(this.offerForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.offers = json;
            
            // reset the form
            this.offerForm = {};
          });
      }
      
  },
  created() {

      this.fetchStudentData();
      this.fetchBookData();
  }

}

Vue.createApp(app).mount('#results');

// Resources : https://stackoverflow.com/questions/62975890/how-to-reload-refresh-a-webpage-in-vue-js-after-a-certain-event-or-a-button-is-c