<template>
  <iframe frameBorder="0"/>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { debounce } from "typescript-debounce-decorator";
import { Optional } from "typescript-optional";

@Component
export default class VIframe extends Vue {
  @Prop({ type: String, default: "" })
  private body!: string;

  @Prop({ type: String, default: ""})
  private styles!: string;

  @Prop({ type: String, default: ""})
  private script!: string;

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
    this.iframe().onload = async () => {
      this.updateBody()
      this.addStyles()
      await this.addInlineScript()
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

  /**
   * Styles
   */

  private addStyles(){
    this.head().ifPresent(head => head.appendChild(this.createStyle(this.styles)));
  }

  private createStyle(rules: string): HTMLStyleElement {
    const ele = document.createElement("style");
    ele.innerHTML = rules
    return ele;
  }

  /**
   * Script
   */

  private addScript(){
    this.head().ifPresent(head => head.appendChild(this.createStyle(this.styles)));
  }
  
  public addInlineScript(): Promise<void> {
    return new Promise(resolve => {
      const script = this.createScript("");
      script.innerText = this.script;
      this.head().ifPresent(head => head.appendChild(script))
      script.onload = () => {
        resolve();
      };
    });
  }

  private createScript(src: string): HTMLScriptElement {
    const script = document.createElement("script");
    if (src !== "") {
      script.setAttribute("src", src);
    }
    return script;
  }

  @Watch("body")
  private updateBody(){
    this.bodyElement().ifPresent(body => body.innerHTML = this.body);
  }

  @Watch("styles")
  private updateStyles() {
    this.reload()
  }

  @Watch("script")
  private updateScript() {
    this.reload()
  }
  
}
</script>

<style scoped>
iframe {
  height: 100%;
  width: 100%;
}
</style>
