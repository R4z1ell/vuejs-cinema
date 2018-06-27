import Vue from "vue";
import "./style.scss";

import VueResource from "vue-resource";
/* Here below we're pretty much making the 'vue-resource' Library an instance method of our MAIN Vue.js Object(the
'new Vue' we have below essentially) */
Vue.use(VueResource);

import moment from "moment-timezone";
// With this code below we're overriding the DEFAULT timezone;
moment.tz.setDefault("UTC");
/* The 'defineProperty' is a method that allow us to ADD a property to an existing Object, and the Object to whom
we want to add this property is 'Vue.prototype' that is the Object from whom Vue Components are CREATED. The second
argument we pass in this 'defineProperty' method is the NAME we want to give to this property we're creating(the $
sign before 'moment' is just a CONVENTION), and finally the THIRD argument is what we want the property to BE and 
we're going to set a GET function. EVERY Components will have access to the '$root' instance. We're doing all of 
this to make the 'moment' library available to ALL our Components pretty much */
Object.defineProperty(Vue.prototype, "$moment", {
  get() {
    return this.$root.moment;
  }
});

import { checkFilter, setDay } from "./util/bus";
const bus = new Vue();
/* So now after creating this new '$bus' property EVERY Component can access it. Remember that the ADVANTAGE of 
using 'Object.defineProperty' is that we CAN'T overwrite the value of this '$bus' property we just created for
example like this 'Vue.prototype.$bus = "overwriting this"' becauseby DEFAULT the 'writeable' is set to FALSE */
Object.defineProperty(Vue.prototype, "$bus", {
  get() {
    return this.$root.bus;
  }
});

import VueRouter from "vue-router";
Vue.use(VueRouter);

import routes from "./util/routes";
const router = new VueRouter({ routes });

// This 'Tooltip' below is a CUSTOM PLUGIN we create
import Tooltip from "./util/tooltip";
// That thanks to this code below is now available to ANY Components
Vue.use(Tooltip);

new Vue({
  el: "#app",
  data: {
    /* These below are our two FILTERS that will contain the CHECKED options, we have the 'genre' Filter Array which
    will cantain the CHECKED genre of the movies(so Comedy, our Horror and so on) and then we've the 'time' Filter
    Array that will filter the movies based on the time the user select. So when the user CHECK on those options 
    inside the browser they will be ADDED or REMOVED from their respective Array, if the option was not checked and
    the user CLICK on it, it will be ADDED to the respective Array, otherwise if it was already checked and the user
    click AGAIN on it, it will be REMOVED from his respective Filter Array */
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment(), // When we don't add any string moment will give us the CURRENT time(the time is INSIDE an Object)
    bus
  },
  created() {
    this.$http.get("/api").then(response => {
      this.movies = response.data;
    });
    /* Now to LISTEN to an Event we simply use the '$on' method where the FIRST property we pass is the NAME of 
    the Event we want to Listen(so the 'check-filter' event coming from the 'CheckFilter' Component) and the second
    property is the 'checkFilter' CALLBACK where the 'this' bind refers to the 'created' lifecycle hook */
    this.$bus.$on("check-filter", checkFilter.bind(this));
    this.$bus.$on("set-day", setDay.bind(this));
  },
  router
});
