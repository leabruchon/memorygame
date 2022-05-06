import { parseUrl } from "../../utils/utils";
import { Component } from "../../utils/component";
import { CardComponent } from "./card/card.component";
import template from "./game.component.html";

let environment = {
  api: {
    host: "http://localhost:8081",
  },
};

export class GameComponent extends Component {
  constructor(){
    super("game");
    // gather parameters from URL
    let params = parseUrl();
    // save player name & game ize
    this._name = params.name;
    this._size = parseInt(params.size) || 9;
    this._flippedCard = null;
    this._matchedPairs = 0;
  }

  getTemplate() {
    return template;
  }

  async init(){
    // fetch the cards configuration from the server
    const config = await this.fetchConfig()
      .then((config) => {

        this._config = config;

        // create a card out of the config
        this._cards = []; 
        this._config.ids.map((id) => this._cards.push(new CardComponent(id)))
        this._boardElement = document.querySelector(".cards");
        this._cards.forEach((element)=>{

          let card = element;
          this._boardElement.appendChild(element.getElement());
          card.getElement().addEventListener(
            "click",() => {
              this._flipCard(element);
            }
          ); 
        })
        this.start();
      }
    );
  }

  start(){
    this._startTime = Date.now();
    let seconds = 0;

    document.querySelector("nav .navbar-title").textContent =
      `Player:${this._name}. Elapsed time:${seconds++}`;

    this._timer = setInterval(
      () => {
        document.querySelector("nav .navbar-title").textContent =
          `Player:${this._name}. Elapsed time:${seconds++}`;
      },
      1000
    );
  }

  async fetchConfig() {
    return fetch(`${environment.api.host}/board?size=${this.  _size}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((error) => console.log("Error while fetching   config: ", error));
  }

  gotoScore() {
    const timeElapsedInSeconds = Math.floor(
      (Date.now() - this._startTime) / 1000
    );
    setTimeout(() => window.location.hash = `score?name=${this._name}&size=${this._size}'&time=${timeElapsedInSeconds}`, 750);
  }

   _flipCard(card){
    if (this._busy) {
      return;
    }
  
    if (card.flipped) {
      return;
    }
  
    // flip the card
    card.flip();
  
    // if flipped first card of the pair
    if (!this._flippedCard) {
      // keep this card flipped, and wait for the second card of the pair
      this._flippedCard = card;
    } else {
      // second card of the pair flipped...
      // if cards are the same
      if (card.equals(this._flippedCard)) {
        this._flippedCard.matched = true;
        card.matched = true;
        this._matchedPairs += 1;
        // reset flipped card for the next turn.
        this._flippedCard = null;
  
        if (this._matchedPairs === this._size) {
          this.gotoScore();
        }
      } else {
        this._busy = true;
        // cards did not match
        // wait a short amount of time before hiding both cards
        setTimeout(
          () => {
            // hide the cards
            this._flippedCard.flip();
            card.flip();
            this._busy = false;
            // reset flipped card for the next turn.
            this._flippedCard = null;
          },
          500
        );
      }
    }
  }
}