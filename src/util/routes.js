import Overview from "../components/Overview.vue";
import Detail from "../components/Detail.vue";

export default [
  // Routes are defined inside Objects
  { path: "/", component: Overview, name: "home" },
  { path: "/movie/:id", component: Detail, name: "movie" },
  /* This '*' route below is a "catch all route", pretty much when we visit ANY route that is not '/' OR '/movie'
  we will be REDIRECTED to the 'home', so the '/' root. This is pretty much how we can create a 404 page */
  { path: "*", redirect: { name: "home" } }
];
