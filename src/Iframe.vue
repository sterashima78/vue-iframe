<template>
  <iframe />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { debounce } from "typescript-debounce-decorator";
@Component
export default class VIframe extends Vue {
  private iframe: HTMLIFrameElement = document.createElement("iframe");
  private mounted() {
    this.reload();
  }

  /**
   * relaod iframe
   */
  @debounce(500, { leading: false })
  private reload() {
    this.$emit("loadstart");
    const ele: HTMLIFrameElement | null = this.$el as HTMLIFrameElement;
    if (ele == null) {
      return this.delayReload();
    }
    if (ele.contentWindow == null) {
      return this.delayReload();
    }
    ele.onload = () => {
      this.$emit("loaded");
    };
    ele.contentWindow.location.reload();
  }

  /**
   * reload iframe after 100 msec
   */
  private delayReload() {
    return setTimeout(() => {
      this.reload();
    }, 100);
  }
}
</script>

<style scoped>
iframe {
  height: 100%;
  width: 100%;
}
</style>
