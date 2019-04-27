import { StyleRule } from "@/style/StyleRule";
describe("Styles", () => {
  it("toString", () => {
    const items = new Map<string, string>();
    items.set("background", "red");
    items.set("font", "10px");
    expect(StyleRule.of("body", items).toString()).toBe(
      `body {\nbackground: red;\nfont: 10px;\n}`
    );
  });
});
