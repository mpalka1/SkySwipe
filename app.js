$(document).ready(function(){
    // database & variables


    // events


    // init
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=Stockholm",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "2abdcd6419msh8f3bf70becc33fdp1c08cfjsn573940caba1d"
        }
    }

    $.ajax(settings).done(function (response) {
        // cream filling
        console.log(response);

        // parse data


        // append data to HTML


    });

});