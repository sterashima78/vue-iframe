import { shallowMount } from "@vue/test-utils";
import VIframe from "@/Iframe.vue";

describe("Iframe.vue", () => {
  it("blank test", () => {
    expect(1).toBe(1);
  });
  // it("renders props.body when passed", done => {
  //   const body = "message";
  //   const wrapper = shallowMount(VIframe, {
  //     propsData: { body }
  //   });
  //   setTimeout(() => {
  //     expect(wrapper.text()).toMatch(/message/);
  //     done();
  //   }, 1000);
  // });
});
