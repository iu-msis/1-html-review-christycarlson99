const app1 = {
  data() {
    return {
      books: [],
      bookForm: {},
      selectedBook: null

    }
  },
  computed: {},
  methods: {
      fetchBookData(b) {
        fetch('/api/book/index.php')
        .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.books = responseJson;
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
      postNewBook(evt) {     
        console.log("Creating:", this.bookForm);

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
      postBook(evt){

        if(this.selectedBook){
          this.postEditBook(evt);
        }
        else{
          this.postNewBook(evt);
        }
      },
      postEditBook(evt){
        this.bookForm.id = this.selectedBook.id;
        this.bookForm.id = this.selectedBook.id;        
        console.log("Editing:", this.bookForm);
        // alert("Posting!");

        fetch('api/book/update.php', {
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
            this.handleResetEdit = {};
          })
          .catch( err => {
            alert("Something went wrong.");
          });
      },
      postDeleteBook(o) {  
        if ( !confirm("Are you sure you want to delete the book from " + o.author + "?") ) {
            return;
        }  
        
        console.log("Delete!", o);

        fetch('api/book/delete.php', {
            method:'POST',
            body: JSON.stringify(o),
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
            this.handleResetEdit();
          });
      },
      handleEditBook(book) {
        this.selectedBook = book;
        this.bookForm = Object.assign({}, this.selectedBook);
      },
      handleResetEdit() {
          this.selectedBook = null;
          this.bookForm = {};
      }
  },
  created() {
      this.fetchBookData();
  }

}

Vue.createApp(app1).mount('#readingResults');

// Resources : https://stackoverflow.com/questions/62975890/how-to-reload-refresh-a-webpage-in-vue-js-after-a-certain-event-or-a-button-is-c