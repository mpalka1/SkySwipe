const newLocal =
  "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-GB/?query=";

$(document).ready(function() {
  // database & variables

  // events
  $("#text_value").on("click", function(event) {
    event.preventDefault();
    var fromLoc = $("#fromLoc").val();
    var toLoc = $("#toLoc").val();
    var outBound = $("#outBound").val();
    var inBound = $("#inBound").val();

    if (fromLoc == "" || toLoc == "" || outBound == "" || inBound == "") {
      alert("Please provide all Inputs");
    } else {
      var location = $("#location-name").val();
      var fromLocSettings = {
        async: true,
        crossDomain: true,
        url: newLocal + fromLoc,
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key": "2abdcd6419msh8f3bf70becc33fdp1c08cfjsn573940caba1d"
        }
      };
      var toLocSettings = {
        async: true,
        crossDomain: true,
        url: newLocal + toLoc,
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key": "2abdcd6419msh8f3bf70becc33fdp1c08cfjsn573940caba1d"
        }
      };
      var priceSettings = {
        async: true,
        crossDomain: true,
        // "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2019-11-11?inboundpartialdate=2019-12-01"
        url:
          "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/CHIA-sky/LOND-sky/2019-11-11?inboundpartialdate=2019-12-01",
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key": "2abdcd6419msh8f3bf70becc33fdp1c08cfjsn573940caba1d"
        }
      };
      console.log(
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" +
          fromLoc +
          "/" +
          toLoc +
          "/" +
          outBound +
          "?inboundpartialdate=" +
          inBound
      );
      $.ajax(toLocSettings).done(function(response) {
        console.log(response);
      });
      $.ajax(fromLocSettings).done(function(response) {
        console.log(response);
      });
      $.ajax(priceSettings).done(function(response) {
        // cream filling
        console.log(response);
      });
    }
    // append data to HTML
  });
});
