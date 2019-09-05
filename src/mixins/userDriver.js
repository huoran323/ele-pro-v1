import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import steps from "./guide";

export default {
  data() {
    return {
      driver: null
    };
  },
  mounted() {
    this.driver = new Driver({});
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps);
      this.driver.start();
    }
  }
};
