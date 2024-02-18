import { expect } from "chai";
import { Block, IProps } from "./Block";
import sinon, { restore } from "sinon";
import connect from "../utils/connect";
import { Store } from "./Store";

interface ITestProps extends IProps {
  text?: string,
  error?: string,
};

type TTestRefs = {};

type BlockType<P extends ITestProps, R extends {}, E extends HTMLElement> = Block<P, R, E>;

describe("Block", () => {
  let PageClass: new (...args: any) => BlockType<ITestProps, TTestRefs, HTMLElement>;

  before(() => {
    class Page extends Block<ITestProps, TTestRefs> {
      constructor(props: ITestProps) {
        super({
          ...props,
        });
      }

      protected render(): string {
        return `<div>
          <span id="text">{{text}}</span>
          <button>{{text-button}}</button>
          <span id="error">{{error}}</span>
        </div>`
      }
    };

    PageClass = Page;
  });

  afterEach(() => {
    restore();
  });

  it("Create component with state from constructor", () => {
    const text = "Hello";
    const pageComponent = new PageClass({ text });

    const spanText = pageComponent.element?.querySelector("#text")?.innerHTML;

    expect(spanText).to.be.eq(text);
  });

  it("Create component with changed state", () => {
    const updateText = "New Text";

    const pageComponent = new PageClass({ text: "Text" });
    pageComponent.setProps({ text: updateText });

    const spanText = pageComponent.element?.querySelector("#text")?.innerHTML;

    expect(spanText).to.be.eq(updateText);
  });

  it("Add events to created component", () => {
    const handlerClick = sinon.stub();

    const pageComponent = new PageClass({ events: {
      click: handlerClick,
    } });

    const event = new MouseEvent("click");
    pageComponent.element?.dispatchEvent(event);

    expect(handlerClick.calledOnce).to.be.true;
  });

  it("Call CDM method after component appeared in DOM", () => {
    const clock = sinon.useFakeTimers();
    const pageComponent = new PageClass();

    const spyCDM = sinon.spy(pageComponent, "componentDidMount");

    const element = pageComponent.getContent();
    document.body.append(element!);
    clock.next();

    expect(spyCDM.calledOnce).to.be.true;
  });

  it("Call CWU method after component unmounted from DOM", () => {
    const clock = sinon.useFakeTimers();
    const pageComponent = new PageClass();

    const spyCDU = sinon.spy(pageComponent, "componentWillUnmount");

    const element = pageComponent.getContent();
    document.body.append(element!);

    document.body.removeChild(element!);
    clock.next();

    expect(spyCDU.calledOnce).to.be.true;
  });

  it("Rerender component after Store change", () => {
    window.store = new Store<any>({});
    const ConnectedPage = connect(({ error }) => ({ error }))(PageClass);

    const pageWithError = new ConnectedPage({});
    
    const error = pageWithError.element?.querySelector("#error")?.innerHTML;
    expect(error).to.be.eq("");

    const errorText = "Error!";
    window.store.set({ error: errorText });

    const updatedError = pageWithError.element?.querySelector("#error")?.innerHTML;
    expect(updatedError).to.be.eq(errorText);;
  });
});
