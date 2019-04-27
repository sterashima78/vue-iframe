import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import VIframe from "../Iframe.vue";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { withInfo } from 'storybook-addon-vue-info'

storiesOf("Vue Iframe", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add("plain", () => ({
    components: { VIframe },
    template: '<v-iframe @loaded="loaded" @loadstart="loadstart" />',
    methods: {
      loaded: action("loaded"),
      loadstart: action("loadstart")
    }
  }))
  .add("body", () => ({
    components: { VIframe },
    template: '<v-iframe :body="body"/>',
    props: {
      body: {
        default: text(
          "body",
          '<p style="size: 30px;background: blue;">Hello world</p>'
        )
      }
    }
  }), {
    knobs: {
      escapeHTML: false
    }
  });
