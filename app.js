var countryDiv = document.getElementById("country");
var flightDiv = document.getElementById("flightInfo");
var goodBtn = document.getElementById("likeBtn");
var badBtn = document.getElementById("dislikeBtn");
var arrAfri = [
  "CAI-sky",
  "LOS-sky",
  "CMN-sky",
  "DUR-sky"
  // "ACC-sky",
  // "NBOA-sky",
  // "DKRA-sky",
  // "EBB-sky"
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
var outBound = "";
var fromLoc = "";
var toLoc = "";
var inBound = "";
var likeCount=document.getElementById("likes");
var disCount=document.getElementById("dislikes");

$(document).ready(function() {
  class Carousel {
    constructor(element) {
    this.board = element;

    // add first two cards programmatically
    this.push();
    this.push();

    // handle gestures
    this.handle();
  }

  handle() {
    // list all cards
    this.cards = this.board.querySelectorAll(".card");

    // get top card
    this.topCard = this.cards[this.cards.length - 1];

    // get next card
    this.nextCard = this.cards[this.cards.length - 2];

    // if at least one card is present
    if (this.cards.length > 0) {
      // set default top card position and scale
      this.topCard.style.transform =
        "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)";

      // destroy previous Hammer instance, if present
      if (this.hammer) this.hammer.destroy();

      // listen for tap and pan gestures on top card
      this.hammer = new Hammer(this.topCard);
      this.hammer.add(new Hammer.Tap());
      this.hammer.add(
        new Hammer.Pan({ position: Hammer.position_ALL, threshold: 0 })
      );

      // pass events data to custom callbacks
      this.hammer.on("tap", e => {
        this.onTap(e);
      });
      this.hammer.on("pan", e => {
        this.onPan(e);
      });
    }
  }

  onTap(e) {
    // get finger position on top card
    let propX =
      (e.center.x - e.target.getBoundingClientRect().left) /
      e.target.clientWidth;

    // get degree of Y rotation (+/-15 degrees)
    let rotateY = 15 * (propX < 0.05 ? -1 : 1);

    // change the transition property
    this.topCard.style.transition = "transform 100ms ease-out";

    // rotate
    this.topCard.style.transform =
      "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(" +
      rotateY +
      "deg) scale(1)";

    // wait transition end
    setTimeout(() => {
      // reset transform properties
      this.topCard.style.transform =
        "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)";
    }, 100);
  }

  onPan(e) {
    if (!this.isPanning) {
      this.isPanning = true;

      // remove transition properties
      this.topCard.style.transition = null;
      if (this.nextCard) this.nextCard.style.transition = null;

      // get top card coordinates in pixels
      let style = window.getComputedStyle(this.topCard);
      let mx = style.transform.match(/^matrix\((.+)\)$/);
      this.startPosX = mx ? parseFloat(mx[1].split(", ")[4]) : 0;
      this.startPosY = mx ? parseFloat(mx[1].split(", ")[5]) : 0;

      // get top card bounds
      let bounds = this.topCard.getBoundingClientRect();

      // get finger position on top card, top (1) or bottom (-1)
      this.isDraggingFrom =
        e.center.y - bounds.top > this.topCard.clientHeight / 2 ? -1 : 1;
    }

    // calculate new coordinates
    let posX = e.deltaX + this.startPosX;
    let posY = e.deltaY + this.startPosY;

    // get ratio between swiped pixels and the axes
    let propX = e.deltaX / this.board.clientWidth;
    let propY = e.deltaY / this.board.clientHeight;

    // get swipe direction, left (-1) or right (1)
    let dirX = e.deltaX < 0 ? -1 : 1;

    // calculate rotation, between 0 and +/- 45 deg
    let deg = this.isDraggingFrom * dirX * Math.abs(propX) * 45;

    // calculate scale ratio, between 95 and 100 %
    let scale = (95 + 5 * Math.abs(propX)) / 100;

    // move top card
    this.topCard.style.transform =
      "translateX(" +
      posX +
      "px) translateY(" +
      posY +
      "px) rotate(" +
      deg +
      "deg) rotateY(0deg) scale(1)";

    // scale next card
    if (this.nextCard)
      this.nextCard.style.transform =
        "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(" +
        scale +
        ")";

    if (e.isFinal) {
      this.isPanning = false;

      let successful = false;

      // set back transition properties
      this.topCard.style.transition = "transform 200ms ease-out";
      if (this.nextCard)
        this.nextCard.style.transition = "transform 100ms linear";

      // check threshold
      if (propX > 0.25 && e.direction == Hammer.DIRECTION_RIGHT) {
        successful = true;
        document.getElementById("likes").innerHTML = likeCount++;
        // get right border position
        posX = this.board.clientWidth;
      } else if (propX < -0.25 && e.direction == Hammer.DIRECTION_LEFT) {
        successful = true;
        document.getElementById("dislikes").innerHTML = disCount++;
        // get left border position
        posX = -(this.board.clientWidth + this.topCard.clientWidth);
      } else if (propY < -0.25 && e.direction == Hammer.DIRECTION_UP) {
        successful = true;
        // get top border position
        posY = -(this.board.clientHeight + this.topCard.clientHeight);
      }

      if (successful) {
        // throw card in the chosen direction
        this.topCard.style.transform =
          "translateX(" +
          posX +
          "px) translateY(" +
          posY +
          "px) rotate(" +
          deg +
          "deg)";

        // wait transition end
        setTimeout(() => {
          // remove swiped card
          this.board.removeChild(this.topCard);
          // add new card
          this.push();
          // handle gestures on new top card
          this.handle();
        }, 200);
      } else {
        // reset cards position
        this.topCard.style.transform =
          "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)";
        if (this.nextCard)
          this.nextCard.style.transform =
            "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(0.95)";
      }
    }
  }

  push() {
    let card = document.createElement("div");
    var newContent = document.createTextNode(JSON.stringify(arrKeys[0])); 
    card.appendChild(newContent);
    card.classList.add("card");
    card.setAttribute("id","travInfo");
    $('#movie-view').text(JSON.stringify(newContent));
    
    card.style.backgroundImage =
      "url('https://picsum.photos/320/320/?random=" +
      Math.round(Math.random() * 1000000) +
      "')";
    if (this.board.firstChild) {
      this.board.insertBefore(card, this.board.firstChild);
    } else {
      this.board.append(card);
    }
  }
}
let board = document.querySelector("#board");
let carousel = new Carousel(board);
// end swipe functionality //
  // create unique session ID to pull flight data
  function createSession(outbound, inbound, tolocation, fromlocation, index) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",
      "method": "POST",
      "headers": {
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "2abdcd6419msh8f3bf70becc33fdp1c08cfjsn573940caba1d",
        "content-type": "application/x-www-form-urlencoded"
      },
      "data": {
        "inboundDate": inbound,
        "children": "0",
        "infants": "0",
        "country": "US",
        "currency": "USD",
        "locale": "en-US",
        "originPlace": fromlocation,
        "destinationPlace": tolocation,
        "outboundDate": outbound,
        "adults": "1"
      }
    };
    $.ajax(settings).then(function(data, status, xhr) {
      var locId = xhr.getResponseHeader("location");
      var locConcat = locId.substr(locId.length - 36);
      pullFlightData(locConcat);
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
      // loadJSON(settings,gotData();
     $.ajax(settings).done(function(response, xhr) {
      setTimeout(function(){console.log(arrKeys); arrKeys.push(response); console.log(arrKeys);},15000);
     });
  }
  // Switches to Three screen
  function showSecThree() {
    document.getElementById("section1").style.display = "none";
    document.getElementById("section3").style.display = "block";
  }
  // Switches to Fourth screen
  function showSecFour() {
    document.getElementById("section3").style.display = "none";
    document.getElementById("section4").style.display = "block";
    setTimeout(function(){ document.getElementById("section4").style.display = "none";
    document.getElementById("section5").style.display = "block"; }, 15000);
  }
  function createMovieRow(flightData) {
      // Create and save a reference to new empty table row
      var optionTr = $('<tr>');

      // Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
      var titleTd = $(`<td>${movie.Title}</td>`);
      var yearTd = $(`<td>${movie.Year}</td>`);
      var actorTd = $(`<td>${movie.Actors}</td>`);
      var posterTd = $(`<td><img src="${movie.Poster}" style="height:160px;width:90px;"></td>`);

      // Append the td elements to the new table row
      movieTr.append(titleTd);
      movieTr.append(yearTd);
      movieTr.append(actorTd);
      movieTr.append(posterTd);

      return movieTr;
    }


  $("#section1_btn").on("click", function(event) {
    event.preventDefault();
    outBound = $("#dateofbirth").val();
    console.log(outBound);
    fromLoc = $("#outBound").val();
    console.log(fromLoc);

    if (fromLoc == "" || outBound == "") {
      alert("Please Answer All Inputs");
    } else {
      showSecThree();
    }
  });
  $("#text_value").on("click", function(event) {
    event.preventDefault();
    toLoc = $("#inBound").val();
    console.log(toLoc);
    inBound = $("#dateofbirthtwo").val();
    console.log(inBound);
    if (toLoc == 0 || outBound == "") {
      alert("Please Answer All Inputs");
    } else if ((toLoc = "Africa")) {
      for (var i = 0; i < arrAfri.length; i++) {
        showSecFour();
        createSession(outBound, inBound, arrAfri[i], fromLoc, i);
      }
    } else if ((toLoc = "Asia")) {
        for (var i = 0; i < arrAsia.length; i++) {
          showSecFour();
          createSession(outBound, inBound, arrAsia[i], fromLoc, i);
        }
    } else if ((toLoc = "Europe")) {
      for (var i = 0; i < arrEuro.length; i++) {
        showSecFour();
        createSession(outBound, inBound, arrEuro[i], fromLoc, i);
        }
    } else if ((toLoc = "North America")) {
      for (var i = 0; i < arrNorAm.length; i++) {
        showSecFour();
        createSession(outBound, inBound, arrNorAm[i], fromLoc, i);
        }
    } else if ((toLoc = "South America")) {
      for (var i = 0; i < arrSouAm.length; i++) {
        showSecFour();
        createSession(outBound, inBound, arrSouAm[i], fromLoc, i);
      }
    }
  });
});
