import { Component } from "../../../utils/component";
import "./card.component.scss";
import template from "./card.component.html";

export class CardComponent extends Component {
  constructor(id) {
    super("card");
    // is this card flipped ?
    this._flipped = false;

    // has the matching card has been discovered already ?
    this.matched = false;

    this._id = id;
    this._imageElt = super.getElement().querySelector(".card-wrapper");
    this._imageElt.querySelector("img.front-face").src =
      require(`./assets/card-${this._id}.png`);
    this._imageElt.querySelector("img.back-face").src =
      require("./assets/back.png");
  }

  getTemplate() {
    return template;
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