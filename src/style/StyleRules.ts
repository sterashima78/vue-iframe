import { StyleRule } from "./StyleRule";

export class StyleRules {
  private rules: StyleRule[] = [];
  private constructor(rules: StyleRule[]) {
    this.rules = rules;
  }
  public static of(rules: StyleRule[]): StyleRules {
    return new StyleRules(rules);
  }

  /**
   * toString
   */
  public toString() {
    return this.rules.map(r => r.toString()).join("\n");
  }
}
