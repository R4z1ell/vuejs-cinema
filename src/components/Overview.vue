<template>
    <div id="overview">
        <day-select v-bind:selected="day"></day-select>
        <div class="main">
            <!-- The FIRST 'genre' refers to the name of the props we've INSIDE the 'props' Array of this
            'movie-list' Component, instead the SECOND 'genre'(the one we've AFTER the equal sign) refers to
            the 'genre' Filter Array we've in our ROOT Component that happens to have the same name. Same exact
            thing is valid for the 'time' and 'movies' -->
            <movie-list v-bind:genre="genre" v-bind:time="time" v-bind:movies="movies" v-bind:day="day"></movie-list>
            <movie-filter></movie-filter>
        </div>
    </div>
</template>
<script>
import MovieList from "./MovieList.vue";
import MovieFilter from "./MovieFilter.vue";
import DaySelect from "./DaySelect.vue";

export default {
  props: ["genre", "time", "movies", "day"],
  components: {
    MovieList,
    MovieFilter,
    DaySelect
  }
};
</script>

