import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import VIframe from "../Iframe.vue";
import { withKnobs, text, array } from "@storybook/addon-knobs";
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
                  :scriptsSrc="scriptsSrc" 
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
            `<div class="alert alert-primary">alert\n  ` +
              `<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>\n` +
              `</div>\n` +
              `<p>Hello world</p>\n` +
              `<button id="btn">\n  <span>click <i class="fas fa-beer"></i></span>\n</button>`
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
        scriptsSrc: {
          default: () =>
            array("scriptSrc", [
              "https://code.jquery.com/jquery-3.3.1.slim.min.js",
              "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            ])
        },
        script: {
          default: text(
            "script",
            '$("#btn").click(function(){alert("clicked")})'
          )
        }
      }
    }),
    {
      knobs: {
        escapeHTML: false
      }
    }
  )
  .add("live Editor", () => ({
    components: { VIframe },
    template: `
      <div style="display: flex;height:100%;wdith:100%;justify-content:space-between">
        <section style="width: 50%;height:100%">
          <div style="width:95%;height:150px;">
            <p style="margin: 1px 0px;">body</p>
            <textarea v-model="body" style="width:100%;height:120px;" />
          </div>
          <div style="width:95%;">
            <p style="margin: 1px 0px;">External CSS Link (comma separated)</p>
            <input type="text" style="width:100%" v-model="links"/>
          </div>
          <div style="width:95%;height:150px;">
            <p style="margin: 1px 0px;">style</p>
            <textarea v-model="styles" style="width:100%;height:120px;"/>
          </div>
          <div style="width:95%;">
            <p style="margin: 1px 0px;">External Script Src (comma separated)</p>
            <input type="text" style="width:100%" v-model="src"/>
          </div>
          <div style="width:95%;height:150px;">
            <p style="margin: 1px 0px;">script</p>
            <textarea v-model="script" style="width:100%;height:120px;"/>
          </div>
        </section>
        <section style="width: 50%;height:100%">
          <v-iframe 
            :body="body" 
            :styles="styles"
            :cssLinks="cssLinks" 
            :scriptsSrc="scriptsSrc" 
            :script="script"
          />
        </section>
      </div>`,
    data() {
      return {
        body:
          `<div class="alert alert-primary">alert\n  ` +
          `<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>\n` +
          `</div>\n` +
          `<p>Hello world</p>\n` +
          `<button id="btn">\n  <span>click <i class="fas fa-beer"></i></span>\n</button>`,
        styles:
          `p {\n  ` +
          `background: green;\n  ` +
          `size: 25px;\n` +
          `}\n` +
          `span {\n  ` +
          `color: green;\n  ` +
          `size: 14px;\n` +
          `}`,
        script: '$("#btn").click(function(){alert("clicked")})',
        src:
          "https://code.jquery.com/jquery-3.3.1.slim.min.js,https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
        links:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css,https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      };
    },
    computed: {
      scriptsSrc() {
        return this.src.split(",");
      },
      cssLinks() {
        return this.links.split(",");
      }
    }
  }));
