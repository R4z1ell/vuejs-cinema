<template>
    <div id="movie-list">
        <!-- If the 'filteredMovies.length' is ZERO that will evaluate to FALSE, if is not zero will evaluate to
        TRUE and is exactly in that case that the 'movie-item' Componente will show up -->
        <div v-if="filteredMovies.length">
          <movie-item v-for="(movie, index) in filteredMovies" v-bind:movie="movie.movie" :key='index'>
            <div class="movie-sessions">
                <!-- This 'v-tooltip' below is our CUSTOM DIRECTIVE -->
                <div 
                  class="session-time-wrapper  tooltip-wrapper" 
                  v-for="session in filteredSessions(movie.sessions)"
                  v-tooltip="{ seats: session.seats }"
                  v-bind:key="session.id"
                >
                    <div class="session-time">{{ formatSessionTime(session.time) }}</div>
                </div>
            </div>
          </movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
         {{ noResults }}
        </div>
        <div v-else class="no-results">
          Loading...
        </div>
    </div>
</template>
<script>
import genres from "../util/genres";
import times from "../util/times";
import MovieItem from "./MovieItem.vue";

export default {
  props: ["genre", "time", "movies", "day"],
  methods: {
    formatSessionTime(raw) {
      return this.$moment(raw).format("h:mm A");
    },
    filteredSessions(sessions) {
      return sessions.filter(this.sessionPassesTimeFilter);
    },
    moviePassesGenreFilter(movie) {
      /* If 'this.genre.length'(so the length of 'genre' Array) is equal to ZERO we'll have !0 that is equal to
      TRUE and in this case NOTHING will be displayed in the Browser, INSTEAD if the 'genre' Array's length is
      different from zero(so if it's at least 1) THEN we're going to display in the Browser those movies based
      on the 'genre' that was clicked by the user in the Filters */
      if (!this.genre.length) {
        return true;
      } else {
        // This 'movieGenres' below will be an ARRAY containing the 'Genre' of our movies
        let movieGenres = movie.movie.Genre.split(", ");
        let matched = true;
        this.genre.forEach(genre => {
          // This 'movieGenres.indexOf(genre)' will return -1 if movie is NOT inside the 'genre' Array
          if (movieGenres.indexOf(genre) === -1) {
            matched = false;
          }
        });
        return matched;
      }
    },
    sessionPassesTimeFilter(session) {
      /* 'this.day' is a 'moment' instance so we can use on it the 'isSame' method(coming from the 'moment' Library).
      Then we have to pass the 'session.time'(that is ONLY a string) inside the '$moment' to CONVERT that time 
      string into a 'moment' time. So with the WHOLE code we're saying that IF the 'session.time' is NOT the same 
      as the CURRENT day, we return FALSE */
      if (!this.day.isSame(this.$moment(session.time), "day")) {
        return false;
        /* Remember, 'this.time' refers to the ARRAY of time FILTERS we've created inside the 'data' of our ROOT 
      Vue.js Instance */
      } else if (this.time.length === 0 || this.time.length === 2) {
        return true;
        /* With this 'else if' statement we're saying that IF the 'after 6pm' filter is SELECTED(in the Browser), 
      we're CHECKING to see if the HOUR we're EXTRACTING from this particular 'session.time' is greater or equal
      than 18, which refers to the 18th hour, so 6pm */
      } else if (this.time[0] === times.AFTER_6PM) {
        return this.$moment(session.time).hour() >= 18;
      } else {
        // Here instead we're just checking if the 'hour' we extract is LESS than 18
        return this.$moment(session.time).hour() < 18;
      }
    }
  },
  computed: {
    filteredMovies() {
      return this.movies
        .filter(this.moviePassesGenreFilter)
        .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
    },
    noResults() {
      let times = this.time.join(", ");
      let genres = this.genre.join(", ");
      return `No results for  ${times}${
        times.length && genres.length ? ", " : ""
      } ${genres}`;
    }
  },
  components: {
    MovieItem
  }
};
</script>
