var cards = Array.from(document.querySelectorAll(".card"));
  var visibles = {
      start: 0,
      end: 1
  };
  var scrolled = false;
  var setVisibles = function (range) {
      for (var i = 0; i < cards.length; i++) {
          cards[i].classList.remove("fading", "f1", "f2", "f3", "bottom", "top");
      }
      var uppers, lowers;
      if (range.end !== cards.length) {
          lowers = cards.slice(range.end);
          for (var i = 0; i < lowers.length; i++) {
              lowers[i].classList.add("fading");
              lowers[i].classList.add("bottom");
              if (i < 2) {
                  lowers[i].classList.add("f".concat(i + 1));
              }
              else {
                  lowers[i].classList.add("f3");
              }
          }
      }
      if (range.start !== 0) {
          uppers = cards.slice(0, range.start);
          for (var i = 0; i < uppers.length; i++) {
              uppers[i].classList.add("fading");
              uppers[i].classList.add("top");
              if (i < uppers.length - 2) {
                  uppers[i].classList.add("f3");
              }
              else {
                  uppers[i].classList.add("f".concat(uppers.length - i));
              }
          }
      }
  };
  var scrollAction = function (event) {
      if (!scrolled) {
          var scrolledDown = event.deltaY > 0;
          if (scrolledDown) {
              if (visibles.end < cards.length) {
                  visibles.start += 1;
                  visibles.end += 1;
                  // console.log("Down");
                  setVisibles(visibles);
              }
          }
          else {
              if (visibles.start > 0) {
                  visibles.start -= 1;
                  visibles.end -= 1;
                  // console.log("Up");
                  setVisibles(visibles);
              }
          }
          scrolled = true;
          setTimeout(function () {
              scrolled = false;
          }, 500);
      }
  };
  setVisibles(visibles);