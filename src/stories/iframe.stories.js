import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import VIframe from "../Iframe.vue";
import { withKnobs, text, array, number } from "@storybook/addon-knobs";
import { withInfo } from "storybook-addon-vue-info";

storiesOf("Vue Iframe", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    "iframe",
    () => ({
      components: { VIframe },
      template: `<v-iframe 
                  @loaded="loaded" 
                  @loadstart="loadstart" 
                  :body="body" 
                  :styles="styles"
                  :cssLinks="cssLinks" 
                  :script="script"
                />`,
      methods: {
        loaded: action("loaded"),
        loadstart: action("loadstart")
      },
      props: {
        body: {
          default: text(
            "body",
            `<div class="alert alert-primary">alert</div>\n` +
              `<p>Hello world</p>\n` +
              `<button onClick="clicked()">\n  <span>click <i class="fas fa-beer"></i></span>\n</button>`
          )
        },
        cssLinks: {
          default: () =>
            array("cssLinks", [
              "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
              "https://use.fontawesome.com/releases/v5.8.1/css/all.css"
            ])
        },
        styles: {
          default: text(
            "styles",
            `p {\n  ` +
              `background: green;\n  ` +
              `size: 25px;\n` +
              `}\n` +
              `span {\n  ` +
              `color: green;\n  ` +
              `size: 14px;\n` +
              `}`
          )
        },
        script: {
          default: text("script", 'function clicked(){alert("clicked")}')
        }
      }
    }),
    {
      knobs: {
        escapeHTML: false
      }
    }
  );
