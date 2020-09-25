<template>
    <div>
        <div id="header">
            <div>
                <h1>Vue.js Calendar</h1>
            </div>
            <div>
                <current-month></current-month>
            </div>
        </div>
        <div id="day-bar">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
        </div>
        <div id="calendar">
            <div v-for="week in weeks" :key=week.id class="calendar-week">
                <calendar-day v-for="day in week" :key="day.id" :day="day"></calendar-day>
            </div>
        </div>
    </div>
</template>

<script>
import CalendarDay from "./CalendarDay.vue";
import CurrentMonth from "./CurrentMonth.vue";

export default {
    computed: {
        year() {
            return this.$store.state.currentYear;
        },
        month() {
            return this.$store.state.currentMonth;
        },
        days() {

            // Generate all days in current month
            let days = [];
            let currentDay = this.$moment(`${this.year}-${this.month}-1`, "YYYY-M-D");

            do {
                days.push(currentDay);
                currentDay = this.$moment(currentDay).add(1, "days");
            } while(currentDay.month() + 1 === this.month);

            // Add previous days to start
            const MONDAY = 1;
            currentDay = this.$moment(days[0]);
            while (currentDay.day() !== MONDAY) {
                currentDay = this.$moment(currentDay).subtract(1, "days");
                days.unshift(currentDay);
            }

            // Add following days to end
            const SUNDAY = 0;
            currentDay = this.$moment(days[days.length -1]);
            while(currentDay.day() !== SUNDAY) {
                currentDay = this.$moment(currentDay).add(1, "day");
                days.push(currentDay);
            }

            return days;
        },
        weeks() {
            let weeks = [];
            let week = [];

            for(let day of this.days) {
                week.push(day);
                if(week.length === 7) {
                    weeks.push(week);
                    week = [];
                }
            }

            return weeks;
        }
    },
    components: {
        CalendarDay,
        CurrentMonth
    }
}
</script>
