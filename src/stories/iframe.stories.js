import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import VIframe from "../Iframe.vue";
import { withKnobs, text, object , number } from "@storybook/addon-knobs";
import { withInfo } from 'storybook-addon-vue-info'

storiesOf("Vue Iframe", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add("iframe", () => ({
    components: { VIframe },
    template: '<v-iframe :body="body" :styles="styles" :script="script"/>',
    props: {
      body: {
        default: text(
          "body",
          '<p>Hello world</p><span>ele</span><button onClick="clicked()">click</button>'
        )
      },
      styles: {
        default: text(
          "styles",
          `p {\n  `
          +`background: green;\n  `
          +`size: 25px;\n`
          +`}\n`
          +`span {\n  `
          +`color: green;\n  `
          +`size: 14px;\n`
          +`}`
        )
      },
      script: {
        default: text("script",'function clicked(){alert("clicked")}')
      },
    }
  }), {
    knobs: {
      escapeHTML: false
    }
  })
  ;
