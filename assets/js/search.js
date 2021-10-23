/**
 * Search
 *
 */
 //(function() {
    function displaySearchResults(results, store) {
      var searchResults = document.getElementById('search-results');
      var appendString =  '';

      if (results.length) { // Are there any results?

        for (var i = 0; i < results.length; i++) {  // Iterate over the results
          var item = store[results[i].ref];
          var formattedUrl = item.url.split(item.url.split(item.category)[1])[0];      

          let str = formattedUrl;
          let formatted = str.replace("/seed-support/", "/seed-support/app/");
          // console.log(formatted);

          var result= '<div class="col-12 results">' +
          '    <div class="pt-4 border-bottom"> ' +
          '      <a class="d-block h4 text-black" href="' + formatted + '.html'+  '">' + item.title + '</a> ' +
          '      <p class="page-description mt-1 w-75 text-muted"> ' +
                 item.content.substring(0, 150).trim() +
          '     </p> ' +
          '   </div> ' +
          ' </div> ';
          
          appendString += result;
        }
  
      } else {
          var noResults = '<ul class="search-results">' +
          '<li class="no-result">' +
          '  <h4>Oh, no! Your search did not match any documents...</h4>' +
          '  <ul class="suggestions"> ' +
          '    <li>Make sure that all words are spelled correctly.</li> ' +
          '    <li>Try more general keywords.</li> ' +
          '    <li>Try fewer keywords.</li> ' +
          '  </ul>' +
          '</li>' +
          '</ul>';
          appendString += noResults;
      }

      searchResults.innerHTML = appendString;

    }

    function setSearchQuery() {
        sessionStorage.searchQuery = document.getElementById('navbar-search-input').value;
        console.log(sessionStorage);
    }
  
    // function getQueryVariable(variable) {
    //   var query = window.location.search.substring(1);
    //   var vars = query.split('&');
  
    //   for (var i = 0; i < vars.length; i++) {
    //     var pair = vars[i].split('=');
  
    //     if (pair[0] === variable) {
    //       return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
    //     }
    //   }
    // }
  
    //$('#navbar-search-icon').on('click', getQueryVariable('query'));

    function search() {
        var query = sessionStorage.searchQuery; //document.getElementById('navbar-search-input').value;
        var searchTerm = decodeURIComponent(query.replace(/\+/g, '%20'));
  
        if (searchTerm) {
        //  d.setAttribute("value", searchTerm);
      
          // Initalize lunr with the fields it will be searching on. I've given title
          // a boost of 10 to indicate matches on this field are more important.
          var idx = lunr(function () {
            this.field('id');
            this.field('title', { boost: 10 });
            this.field('category', { boost: 2 });
            this.field('content');
          });
      
      
      
          for (var key in window.store) { // Add the data to lunr
            idx.add({
              'id': key,
              'title': window.store[key].title,
              'category': window.store[key].category,
              'content': window.store[key].content
            });
      
            var results = idx.search(searchTerm); // Get lunr to perform a search
            displaySearchResults(results, window.store); // We'll write this in the next section
          }
        }
    }
    
    
  //})();