<template>
  <iframe />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { debounce } from "typescript-debounce-decorator";
import { Optional } from "typescript-optional";
@Component
export default class VIframe extends Vue {
  @Prop({ type: String, default: "" })
  private body!: string;

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

  @Watch("body")
  private updateBody(){
    this.bodyElement().ifPresent(body => body.innerHTML = this.body);
  }
}
</script>

<style scoped>
iframe {
  height: 100%;
  width: 100%;
}
</style>
