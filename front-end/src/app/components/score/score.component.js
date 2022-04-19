// TODO Step 6 import { parseUrl } from '../../utils/utils.js';
// TODO Step 7 import { Component } from "../../utils/component";
// TODO Step 7 import template from "./score.component.html"

(function() {      // TODO Step 6 remove this closure

    /* class ScoreComponent constructor */
    class ScoreComponent {
        constructor(){
            let params = parseUrl();
            this.name = params.name;
            this.size = parseInt(params.size);
            this.time = parseInt(params.time);
        }
        
        init(){
            document.getElementById('name').innerText = this.name;
            document.getElementById('size').innerText = this.size;
            document.getElementById('time').innerText = this.time;
        }
    }

    // TODO Step 7 implement getTemplate() {}

    // TODO Step 6: Move this method to utils.js
    function parseUrl() {
        let url = window.location;
        let query = url.href.split('?')[1] || '';
        let delimiter = '&';
        let result = {};

        let parts = query
            .split(delimiter);
        // TODO Step 3.3: Use Array.map() & Array.reduce()
        return parts.map((items)=>{
            return items.split("=")
          }).reduce((result,kv)=>{
            result[kv[0]] = kv[1]
            return result
          },{});

    }

    // put component in global scope, to be runnable right from the HTML.
    // TODO Step 7 export ScoreComponent
    window.ScoreComponent = ScoreComponent;
})();
