import { addClass, removeClass } from "./helpers";

let mouseOverHandler = function(event) {
  let span = event.target.parentNode.getElementsByTagName("SPAN")[0];
  addClass(span, "tooltip-show");
};

let mouseOutHandler = function(event) {
  let span = event.target.parentNode.getElementsByTagName("SPAN")[0];
  removeClass(span, "tooltip-show");
};

/* To make a PLUGIN work we have to export an Object that NEEDS to have an 'install' method where we pass as
first argument the 'Vue' INSTANCE */
export default {
  install(Vue) {
    Vue.directive("tooltip", {
      bind(el, bindings) {
        let span = document.createElement("SPAN");
        let text = document.createTextNode(
          `Seats available: ${bindings.value.seats}`
        );
        span.appendChild(text);
        addClass(span, "tooltip");
        el.appendChild(span);
        /* the 'getElementsByTagName' returns a COLLECTION of ALL the 'div' elements, for this reason we use the 
        '[0]' to ONLY grab the FIRST element of the Collection */
        let div = el.getElementsByTagName("DIV")[0];
        div.addEventListener("mouseover", mouseOverHandler);
        div.addEventListener("mouseout", mouseOutHandler);
        div.addEventListener("touchstart", mouseOverHandler);
        div.addEventListener("touchend", mouseOutHandler);
      },
      /* Here we're using the 'unbind' HOOK Function to REMOVE our two 'mouseOverHandler' and 'mouseOutHandler' 
      Events when our 'MovieItem' Components gets REMOVED from the DOM, in this way we save precious memory in our 
      Computer by NOT having unused Events hanging around doing nothing */
      unbind(el) {
        let div = el.getElementsByTagName("DIV")[0];
        div.removeEventListener("mouseover", mouseOverHandler);
        div.removeEventListener("mouseout", mouseOutHandler);
        div.removeEventListener("touchstart", mouseOverHandler);
        div.removeEventListener("touchend", mouseOutHandler);
      }
    });
  }
};
