// TODO Step 7 import { Component } from "../../../utils/component";
// TODO Step 7 import template from  "./card.component.html"

(function () {
  // TODO Step 7 remove this closure

  /* class CardComponent constructor */
  class CardComponent {
    constructor(id) {
      // is this card flipped ?
      this._flipped = false;

      // has the matching card has been discovered already ?
      this.matched = false;

      this._id = id;

      this._imageElt = this.getElement().querySelector(".card-wrapper");
      // TODO Step 7: Update the path for images with 'src/app/components/game/card/assets/card***'
      this._imageElt.querySelector("img.front-face").src =
      `./card/assets/card-${this._id}.png`;
      this._imageElt.querySelector("img.back-face").src =
        "./card/assets/back.png";
    }

    getElement() {
      if (!this._elt) {
        this._elt = document
          .getElementById("card-template")
          .content.cloneNode(true).firstElementChild;
      }
    return this._elt;
    }

    flip() {
      this._imageElt.classList.toggle("flip");
      this._flipped = !this._flipped;
    }

    equals(card) {
      return card._id === this._id;
    }

    get flipped() {
      return this._flipped;
    }

  }

  // put component in global scope, to be runnable right from the HTML.
  // TODO Step 7 export CardComponent
  window.CardComponent = CardComponent;
})();


