var countryDiv = document.getElementById('country');
var flightDiv = document.getElementById('flightInfo');
var goodBtn = document.getElementById('likeBtn');
var badBtn = document.getElementById('dislikeBtn');
var arrAfri = ["CAI-sky","LOS-sky","CMN-sky","DUR-sky",
  // "ACC-sky",
  // "NBOA-sky",
  // "DKRA-sky",
  // "EBB-sky"
];
var arrAsia = ["HKGA-sky","SINS-sky","BKKT-sky","MFMA-sky","SZX-sky","KULM-sky","DXBA-sky","SELA-sky","HKT-sky","CAN-sky"];
var arrEuro = ["LOND-sky","PARI-sky","ISTA-sky","BCN-sky","ROME-sky","MILA-sky","PRG-sky","VIE-sky","DUB-sky","AMS-sky"];
var arrNorAm = ["LASA-sky","LAX-sky","ORLB-sky","NYCA-sky","CHIA-sky","WASA-sky","ATLA-sky","SANA-sky","HOUA-sky","DFWA-sky","PHILA-sky","BOS-sky","DENA-sky"];
var arrSouAm = ["BUEA-sky","CUZ-sky","RIOA-sky","MDZ-sky","BRC-sky","CTG-sky","SCL-sky","VI-sky","BOG-sky"];
var arrKeys = [];


$(document).ready(function() {
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
    });
  }

  // pull flight data object for each ID
  function pullFlightData(str) {
      var settings = {
        async: true,
        crossDomain: true,
        url:
          "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/" +
          str +
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
// creates the html connection for the flights to display
  function renderChoices(index) {
    flightDiv.innerHTML = '';
    for(i = 0; i < questions[index].choices.length; i++) {
        var choiceBtn = document.createElement('button');
        choiceBtn.textContent = questions[index].choices[i];
        choicesDiv.appendChild(choiceBtn);
    };
}
function move() {
  document.getElementById("myProgress").style.display="block";
  var i = 0;
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 80);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
    setTimeout(function(){
      document.getElementById("myProgress").style.display="none";
      document.getElementById("fltOps").style.display="block";
    }, 8000);
  }
}

  $("#text_value").on("click", function(event) {
    event.preventDefault();
    var fromLoc = "CHIA-sky";
    // $("#fromLoc").val();
    var toLoc = "Africa";
    // $("#toLoc").val();
    var outBound = "2019-11-01";
    // $("#outBound").val();
    var inBound = "2019-12-01";
    // $("#inBound").val();
    
    if (fromLoc == "" || toLoc == "" || outBound == "" || inBound == "") {
      alert("Please Answer All Inputs");
    } else if(toLoc="Africa"){
      for (var i = 0; i < arrAfri.length; i++){
        createSession(outBound, inBound, arrAfri[i], fromLoc);
        move();
        pullFlightData(arrKeys[i]);

      }
    }else if(toLoc="Asia"){
        for (var i = 0; i < arrAsia.length; i++){
          createSession(outBound, inBound, arrAsia[i], fromLoc);
        }
        pullFlightData(arrKeys);
    }else if(toLoc="Europe"){
      for (var i = 0; i < arrEuro.length; i++){
        createSession(outBound, inBound, arrEuro[i], fromLoc);
      }
      pullFlightData(arrKeys);
    }else if(toLoc="North America"){
      for (var i = 0; i < arrNorAm.length; i++){
        createSession(outBound, inBound, arrNorAm[i], fromLoc);
      }
      pullFlightData(arrKeys);
    }else if(toLoc="South America"){
      for (var i = 0; i < arrSouAm.length; i++){
        createSession(outBound, inBound, arrSouAm[i], fromLoc);
      }
      pullFlightData(arrKeys);
    }
  });
  $("#text_reset").on("click", function(event) {
    for (var i = 0; i < arrAfri.length; i++){
      pullFlightData(arrKeys[i]);
    }
  });
});
