export class StyleRule {
  private selector: string = "";
  private declarations: Map<string, string> = new Map<string, string>();
  private constructor(selector: string, declarations: Map<string, string>) {
    this.selector = selector;
    this.declarations = declarations;
  }
  public static of(
    selector: string,
    declarations: Map<string, string>
  ): StyleRule {
    if (!selector) throw new Error("selector is required");
    if (declarations.size == 0) throw new Error("declarations is required");
    return new StyleRule(selector, declarations);
  }

  public add(property: string, value: string) {
    if (!property) throw new Error("property is required");
    if (!value) throw new Error("value is required");
    const newDeclarations = this.clone();
    newDeclarations.set(property, value);
    return StyleRule.of(this.selector, newDeclarations);
  }

  public delete(property: string = "") {
    return this.clone(property);
  }

  public toString(): string {
    const style: string = Array.from(this.declarations.keys())
      .map((k: string) => `${k}: ${this.declarations.get(k)};`)
      .join("\n");
    return `${this.selector} {\n${style}\n}`;
  }

  private clone(ignoreProp = "") {
    const newDeclarations = new Map<string, string>();
    this.declarations.forEach((k, v) => {
      if (ignoreProp == k) return;
      newDeclarations.set(k, v);
    });
    return newDeclarations;
  }
}
