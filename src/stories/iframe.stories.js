import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import VIframe from "../Iframe.vue";
import { StyleRule } from "../style/StyleRule";
import { StyleRules } from "../style/StyleRules";
import { withKnobs, text, object , number } from "@storybook/addon-knobs";
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
  })
  .add("style", () => ({
    components: { VIframe },
    template: '<v-iframe :body="body" :styles="styles"/>',
    props: {
      body: {
        default: text(
          "body",
          '<p>Hello world</p><span>ele<span>'
        )
      },
      styles: {
        default: text(
          "styles",
          `p {\n  `
          +`background: green;\n  `
          +`font: 25px;\n`
          +`}\n`
          +`span {\n  `
          +`color: green;\n  `
          +`font: 14px;\n`
          +`}`
        )
          
      }
    }
  }), {
    knobs: {
      escapeHTML: false
    }
  });
