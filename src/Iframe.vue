<template>
  <iframe frameBorder="0"/>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { debounce } from "typescript-debounce-decorator";
import { Optional } from "typescript-optional";
import { StyleRules } from "@/style/StyleRules";

@Component
export default class VIframe extends Vue {
  @Prop({ type: String, default: "" })
  private body!: string;

  @Prop({ type: Object, default: ()=> StyleRules.of([]) })
  private styles!: StyleRules;

  private iframe(): HTMLIFrameElement {
    return this.$el as HTMLIFrameElement;
  }

  private window(): Optional<Window> {
    return Optional.ofNullable(this.iframe().contentWindow);
  }

  private document(): Optional<Document> {
    return this.window().map(w => w.document);
  }

  private head(): Optional<HTMLHeadElement> {
    return this.document().map(d => d.head);
  }

  private bodyElement(): Optional<HTMLElement> {
    return this.document().map(d => d.body);
  }

  private mounted() {
    this.reload();
  }

  /**
   * relaod iframe
   */
  @debounce(500, { leading: false })
  private reload() {
    this.$emit("loadstart");
    if (!this.window().isPresent()) return this.delayReload();
    this.iframe().onload = () => {
      this.updateBody()
      this.updateStyles()
      this.$emit("loaded");
    };
    this.window().get().location.reload();
  }

  /**
   * reload iframe after 100 msec
   */
  private delayReload() {
    return setTimeout(() => {
      this.reload();
    }, 100);
  }

  private createStyle(rules: StyleRules): HTMLStyleElement {
    const ele = document.createElement("style");
    ele.innerHTML = rules.toString()
    console.log(ele, rules.toString())
    return ele;
  }

  @Watch("body")
  private updateBody(){
    this.bodyElement().ifPresent(body => body.innerHTML = this.body);
  }

  @Watch("styles")
  private updateStyles(){
    console.log("update style", this.styles)
    this.head().ifPresent(head => head.appendChild(this.createStyle(this.styles)));
  }
}
</script>

<style scoped>
iframe {
  height: 100%;
  width: 100%;
}
</style>
