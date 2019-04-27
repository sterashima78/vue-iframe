import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import VIframe from "../Iframe.vue";

storiesOf("Vue Iframe", module).add("plain", () => ({
  components: { VIframe },
  template: '<v-iframe @loaded="loaded" @loadstart="loadstart" />',
  methods: {
    loaded: action("loaded"),
    loadstart: action("loadstart")
  }
}));