<template>
    <div v-bind:class="{ 'check-filter': true, active: checked }" v-on:click="checkFilter">
        <span class="checkbox"></span>              
        <span class="check-filter-title">{{ title }}</span>
    </div>
</template>
<script>
export default {
  data() {
    return {
      checked: false
    };
  },
  props: ["title", "category"],
  /* When we click on the 'checkbox' OR on the 'title' we're going to fire the 'checkFilter' method that
  will TOGGLE the value of the 'checked' data we've created above(that by default is set to 'false'). Then 
  inside the 'v-bind' directive we've assigned the 'active' css class(that we have inside our 'style.scss' 
  file) to the 'checked' data so that when we CLICK we TOGGLE this 'active' class ON and OFF and the style 
  can of the checkbox can be added or removed inside the browser */
  methods: {
    checkFilter() {
      this.checked = !this.checked;
      /* By using 'this.$emit' we can create CUSTOM EVENTS, and this is the way we can pass props from a 
      child component to his PARENT Component. The FIRST property inside the '$emit' must ALWAYS be the 
      name of the 'Custom Event' itself(in our case is called 'check-filter') and then we can add an 
      arbitrary number of arguments to it(that is the payload pretty much, so the actual 'data' that we
      want to pass to the parent Component). By using the '$bus'(that we've created in the main.js file) we 
      can now pass data between ANY Component, no matter their hierarchy in the "Component Tree", so all we
      have to do now is to CREATE an "Listener"(an 'Event Listener') inside the Root instance */
      this.$bus.$emit("check-filter", this.category, this.title, this.checked);
    }
  }
};
</script>

