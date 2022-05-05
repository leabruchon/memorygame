import { parseUrl } from "./app/utils/utils";
import "bootstrap/dist/css/bootstrap.css";
import "./app/styles/style.scss";

import { Router } from "./app/utils/router";
import { GameComponent } from "./app/components/game/game.component";

import { WelcomeComponent } from "./app/components/welcome/welcome.component"; 
import { ScoreComponent } from "./app/components/score/score.component";  

const parameters = parseUrl();
const outlet = document.querySelector("#content-outlet");

const router = new Router(outlet)
  .register("", WelcomeComponent) 
  .register("game", GameComponent)
  .register("score", ScoreComponent); 

document
  .querySelector("body")
  .appendChild(document.createTextNode(JSON.stringify(parameters)));