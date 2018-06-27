/* And finally we're passing these arguments to the ROOT Component. So we've passed data from the 'check-filter'
Component to his Parent 'movie-filter' Component and THEN from 'movie-filter' to the ROOT Component. We've done
all of this because we need those information to POPULATE our two FILTERS Array we've created above('genre' and
'time'). */
function checkFilter(category, title, checked) {
  if (checked) {
    /* IF the 'checked' argument is TRUE we're going to push the 'title'(that is pretty much one of the string
    we've inside the 'genres' Object we're importing above, so 'Animation', 'Crime', 'Comedy' and so on) inside
    the 'genre' Filter Array(the 'category' here below refers to the FIRST argument we've passed all the way up
    from the 'check-filter' Component through the CUSTOM EVENT, and there the second argument we've assigned was 
    'genre', so the code 'this[category]' is equal to 'genre', so the empty array we've created above) */
    this[category].push(title);
  } else {
    /* Instead if the 'checked' value is FALSE, this means that we want to UNCHECK that particular filter, so
    we're going to REMOVE it from the 'genre' Array Filter above with the 'splice' method */
    let index = this[category].indexOf(title);
    // This 'index > -1' means that the index is PRESENT in the Array, in that case we're going to remove it
    if (index > -1) {
      this[category].splice(index, 1);
    }
  }
}

function setDay(day) {
  // With the 'this.day' here below we're refering DIRECTLY to the 'day' we've store ABOVE in the 'data' section
  this.day = day;
}

export { checkFilter, setDay };
