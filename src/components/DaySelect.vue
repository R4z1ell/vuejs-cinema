<template>
    <div id="day-select">
       <ul class="days">
           <li 
             v-bind:class="{ day: true, active: isActive(day)}" 
             v-for="(day, index) in days" 
             v-on:click="selectDay(day)" 
             :key='index'
           >
            {{ formatDay(day) }}
           </li>
           <li class="day-selector">
               <span class="dec" v-on:click="changeDay(-1)"></span>
               <span class="inc" v-on:click="changeDay(1)"></span>
           </li>
       </ul>
    </div>
</template>
<script>
export default {
  /* This 'selected' is the PROP we're passing down to this 'DaySelect' Component from the 'Overview' parent 
  Component through the 'v-bind:selected="day"' that we have in the 'day-select' element inside the 'template' 
  tag */
  props: ["selected"],
  data() {
    return {
      /* This 'days' will be an Array containing 7 'moment' Objects where the FIRST element will start from the
      CURRENT day(that's why we used 'moment()' passing nothing inside) and then ADDING 1 day to EACH consecutive
      element */
      days: [0, 1, 2, 3, 4, 5, 6].map(num => this.$moment().add(num, "days"))
    };
  },
  methods: {
    formatDay(raw) {
      if (raw.isSame(this.$moment(), "day")) {
        return "Today";
      } else {
        return raw.format("ddd DD/MM");
      }
    },
    isActive(day) {
      return day.isSame(this.selected, "day");
    },
    selectDay(day) {
      /* Here we're using the GLOBAL '$bus' EVENT to pass this 'set-day' CUSTOM EVENT that contains as PAYLOAD the
      'day' moment Object for the SELECTED day in the "Selector Bar" on the Browser */
      this.$bus.$emit("set-day", day);
    },
    changeDay(change) {
      /* The 'this.selected' below refers to the PROP we've receiving from the 'Overview' Parent Component and it's 
      equal to a 'moment' Object with the CURRENT day. Then we're using the 'add' moment method to ADD or SUBTRACT 
      a day(the 'change' value is 1 or -1 because THAT is what we're using INSIDE the 'template' tag above for the 
      'changeDay' Function) from the 'selected' day(so the CURRENT day) */
      let newDay = this.$moment(this.selected).add(change, "days");
      /* This 'this.day' here below refers to the 'days' ARRAY we've ABOVE inside the 'data', so the Array that 
      contains the 7 'moment' Objects. Then we're FINDING(with the 'find' method) the 'day'(so the single 'day'
      element inside the 'days' Array) that is EQUAL to the 'newDay' created above. IF they're equal then we're
      going to execute the 'this.selectDay(newDay)' */
      if (this.days.find(day => newDay.isSame(day, "day"))) {
        this.selectDay(newDay);
      }
    }
  }
};
</script>
