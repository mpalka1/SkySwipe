const newLocal =
  "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-GB/?query=";
var arrAfri = [
  "NBA-sky",
  "DPT-sky",
  "CAI-sky",
  "LOS-sky",
  "CMN-sky",
  "DUR-sky",
  "ACC-sky",
  "NBOA-sky",
  "DKRA-sky",
  "EBB-sky"
];
var arrAsia = [
  "HKGA-sky",
  "SINS-sky",
  "BKKT-sky",
  "MFMA-sky",
  "SZX-sky",
  "KULM-sky",
  "DXBA-sky",
  "SELA-sky",
  "HKT-sky",
  "CAN-sky"
];
var arrEuro = [
  "LOND-sky",
  "PARI-sky",
  "ISTA-sky",
  "BCN-sky",
  "ROME-sky",
  "MILA-sky",
  "PRG-sky",
  "VIE-sky",
  "DUB-sky",
  "AMS-sky"
];
var arrNorAm = [
  "LASA-sky",
  "LAX-sky",
  "ORLB-sky",
  "NYCA-sky",
  "CHIA-sky",
  "WASA-sky",
  "ATLA-sky",
  "SANA-sky",
  "HOUA-sky",
  "DFWA-sky",
  "PHILA-sky",
  "BOS-sky",
  "DENA-sky"
];
var arrSouAm = [
  "BUEA-sky",
  "CUZ-sky",
  "RIOA-sky",
  "MDZ-sky",
  "BRC-sky",
  "CTG-sky",
  "SCL-sky",
  "VI-sky",
  "BOG-sky"
];
var arrKeys = [];
$(document).ready(function() {
  // database & variables
  // create unique session ID to pull flight data
  function createSession(outbound, inbound, tolocation, fromlocation) {
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",
      method: "POST",
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "2abdcd6419msh8f3bf70becc33fdp1c08cfjsn573940caba1d",
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        inboundDate: inbound,
        cabinClass: "business",
        children: "0",
        infants: "0",
        country: "US",
        currency: "USD",
        locale: "en-US",
        originPlace: fromlocation,
        destinationPlace: tolocation,
        outboundDate: outbound,
        adults: "1"
      }
    };
    $.ajax(settings).then(function(data, status, xhr) {
      var locId = xhr.getResponseHeader("location");
      var locConcat = locId.substr(locId.length - 36);
      arrKeys.push(locConcat);
      for (var i = 0; i < arrKeys.length; i++) {
        console.log(arrKeys[i]);
      }
    });
  }
  // pull flight data object for each ID
  function pullFlightData(arr) {
    for (var i = 0; i < arr.length; i++) {
      var settings = {
        async: true,
        crossDomain: true,
        url:
          "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/" +
          arr[i] +
          "?pageIndex=0&pageSize=10",
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key": "2abdcd6419msh8f3bf70becc33fdp1c08cfjsn573940caba1d"
        }
      };
      $.ajax(settings).done(function(response) {
        console.log(response);
      });
    }
  }
  $("#text_value").on("click", function(event) {
    event.preventDefault();
    var fromLoc = $("#fromLoc").val();
    var toLoc = $("#toLoc").val();
    var outBound = $("#outBound").val();
    var inBound = $("#inBound").val();
    if (fromLoc == "" || toLoc == "" || outBound == "" || inBound == "") {
      alert("Please Answer All Inputs");
    } else {
      createSession(outBound, inBound, toLoc, fromLoc);
      for (var i = 0; i < arrKeys.length; i++) {
        pullFlightData(arrKeys[i]);
      }
    }
  });
});
