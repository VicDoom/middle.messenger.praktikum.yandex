import { expect } from "chai";
import { Block, IProps } from "./Block";

interface ITestProps extends IProps {
  text?: string,
}

type TTestRefs = {}

type BlockType<P extends ITestProps, R extends {}> = Block<P, R>;

describe("Block", () => {
  let PageClass: BlockType<ITestProps, TTestRefs>;
  // let PageClass: Block<ITestProps, TTestRefs>;

  before(() => {
    class Page extends Block<ITestProps, TTestRefs> {
      constructor(props: ITestProps) {
        super({
          ...props,
        });
      }

      protected render(): string {
        return `<div>
          <span id="test-text">{{text}}</span>
          <button>{{text-button}}</button>
        </div>`
      }
    };

    // @ts-ignore
    PageClass = Page;
    const page = new PageClass();
  });

  it("Create component with state from constructor", () => {
    const text = "Hello"
    const pageComponent = new PageClass({ text });

    const spanText = pageComponent.element?.querySelector("#test-text")?.innerHTML;

    expect(spanText).to.be.eq(text);
  })
});
