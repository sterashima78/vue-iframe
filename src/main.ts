import { PluginObject } from "vue";
import { Vue } from "vue-property-decorator";
import iframe from "./Iframe.vue";

const VueIframe: PluginObject<any> = {
  install(vue: typeof Vue, _) {
    vue.component("v-iframe", iframe);
  }
};
export const VIframe = iframe;
export default VueIframe;
