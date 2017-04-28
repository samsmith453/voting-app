(function () {
    var profileId = document.querySelector('#profile-id') || null;
    var profileUsername = document.querySelector('#profile-username') || null;
    var profileRepos = document.querySelector('#profile-repos') || null;
    var displayName = document.querySelector('#display-name');
    var apiUrl = "https://myfccvotingapp.herokuapp.com" + '/api/:id';
    
    function updateHtmlElement (data, element, userProperty) {
        if(data[userProperty]) element.innerHTML = data[userProperty];
        else element.innerHTML = "You have no display name";
    }
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
         var userObject = JSON.parse(data);
        
      updateHtmlElement(userObject, displayName, 'displayName');

      if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');   
      }

      if (profileUsername !== null) {
         updateHtmlElement(userObject, profileUsername, 'username');   
      }

      if (profileRepos !== null) {
         updateHtmlElement(userObject, profileRepos, 'publicRepos');   
      }
    }));
})();