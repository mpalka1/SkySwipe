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

var outBound = "2019-11-01";
// $("#outBound").val();
var fromLoc = "CHIA-sky";
var toLoc = "Africa";
// $("#toLoc").val();
var inBound = "2019-12-01";
// $("#inBound").val();

$(document).ready(function() {
  // swipe functionality //
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
          // get right border position
          posX = this.board.clientWidth;
        } else if (propX < -0.25 && e.direction == Hammer.DIRECTION_LEFT) {
          successful = true;
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

      card.classList.add("card");

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
    $.ajax(settings).done(function(response) {
      arrKeys.push(response);
      console.log(arrKeys);
    });
  }
  // creates the html connection for the flights to display
  function renderChoices(index) {
    flightDiv.innerHTML = "";
    for (i = 0; i < questions[index].choices.length; i++) {
      var choiceBtn = document.createElement("button");
      choiceBtn.textContent = questions[index].choices[i];
      choicesDiv.appendChild(choiceBtn);
    }
  }
  function move() {
    document.getElementById("myProgress").style.display = "block";
    var i = 0;
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar");
      var width = 1;
      var id = setInterval(frame, 30);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
        }
      }
      setTimeout(function() {
        document.getElementById("myProgress").style.display = "none";
        document.getElementById("fltOps").style.display = "block";
      }, 3000);
    }
  }

  function showSecThree() {
    document.getElementById("section1").style.display = "none";
    document.getElementById("section3").style.display = "block";
  }
  function showSecFour() {
    document.getElementById("section3").style.display = "none";
    document.getElementById("section4").style.display = "block";
  }

  $("#section1_btn").on("click", function(event) {
    event.preventDefault();
    outBound = "2019-11-01";
    // $("#outBound").val();
    fromLoc = "CHIA-sky";
    // $("#fromLoc").val();
    if (fromLoc == "" || outBound == "") {
      alert("Please Answer All Inputs");
    } else {
      showSecThree();
    }
  });
  $("#text_value").on("click", function(event) {
    event.preventDefault();
    toLoc = "Africa";
    // $("#toLoc").val();
    inBound = "2019-12-01";
    // $("#inBound").val();
    if (toLoc == "" || outBound == "") {
      alert("Please Answer All Inputs");
    } else if ((toLoc = "Africa")) {
      for (var i = 0; i < arrAfri.length; i++) {
        showSecFour();
        createSession(outBound, inBound, arrAfri[i], fromLoc, i);
        move();
      }
    }
  });

  //   if (toLoc == "" || outBound == "") {
  //     alert("Please Answer All Inputs");
  //   } else if(toLoc="Africa"){
  //     for (var i = 0; i < arrAfri.length; i++){
  //       createSession(outBound, inBound, arrAfri[i], fromLoc,i);
  //       move();

  //     }
  //   }else if(toLoc="Asia"){
  //       for (var i = 0; i < arrAsia.length; i++){
  //         createSession(outBound, inBound, arrAsia[i], fromLoc);
  //       }
  //       pullFlightData(arrKeys);
  //   }else if(toLoc="Europe"){
  //     for (var i = 0; i < arrEuro.length; i++){
  //       createSession(outBound, inBound, arrEuro[i], fromLoc);
  //     }
  //     pullFlightData(arrKeys);
  //   }else if(toLoc="North America"){
  //     for (var i = 0; i < arrNorAm.length; i++){
  //       createSession(outBound, inBound, arrNorAm[i], fromLoc);
  //     }
  //     pullFlightData(arrKeys);
  //   }else if(toLoc="South America"){
  //     for (var i = 0; i < arrSouAm.length; i++){
  //       createSession(outBound, inBound, arrSouAm[i], fromLoc);
  //     }
  //     pullFlightData(arrKeys);
  //   }
  // });
  // $("#text_reset").on("click", function(event) {
  //   for (var i = 0; i < arrAfri.length; i++){
  //     pullFlightData(arrKeys[i]);
  //   }
  // });
});
