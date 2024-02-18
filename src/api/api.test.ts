import HTTPTransport from "./index";
import { 
  SinonFakeXMLHttpRequest, 
  SinonFakeXMLHttpRequestStatic, 
  useFakeXMLHttpRequest,
} from "sinon";
import { expect } from "chai";
import { API_HOST } from "../utils/constants";

describe("HTTPTransport", () => {
  let api: HTTPTransport;
  let XHR: SinonFakeXMLHttpRequestStatic;
  let fakeRequest: SinonFakeXMLHttpRequest | null;

  const apiEnd = "/mock";
  const apiMock = `${API_HOST}${apiEnd}`;

  const mockBody = { id: 0, name: "Name" };
  const mockFormData = new FormData();

  beforeEach(() => {
    api = new HTTPTransport(apiEnd);
    XHR = useFakeXMLHttpRequest();
    XHR.onCreate = (xhr) => { fakeRequest = xhr; };
  });

  afterEach(() => {
    XHR.restore();
    fakeRequest = null;
  });

  it("stringify object from GET request parameters", async () => {
    api.get("", { data: mockBody });
    const request = fakeRequest;

    const expectedURL = "?id=0&name=Name";

    expect(request.url).to.eq(`${apiMock}${expectedURL}`);
  });

  it("GET request", async () => {
    api.get("");
    const request = fakeRequest;

    expect(request.method).to.eq("GET");
  });

  it("POST request", async () => {
    api.post("", { data: mockBody });
    const request = fakeRequest;

    expect(request.url).to.eq(apiMock);
    expect(request.requestBody).to.eq(JSON.stringify(mockBody));
    expect(request.method).to.eq("POST");
  });

  it("PUT request", async () => {
    api.put("", { data: mockBody });
    const request = fakeRequest;

    expect(request.url).to.eq(apiMock);
    expect(request.requestBody).to.eq(JSON.stringify(mockBody));
    expect(request.method).to.eq("PUT");
  });

  it("PUT request Form Data", async () => {
    api.put("", { data: mockFormData, isFormData: true });
    const request = fakeRequest;

    expect(request.url).to.eq(apiMock);
    expect(request.requestBody).to.eq(mockFormData);
    expect(request.method).to.eq("PUT");
  });

  it("DELETE request", async () => {
    api.delete("", { data: mockBody });
    const request = fakeRequest;

    expect(request.url).to.eq(apiMock);
    expect(request.requestBody).to.eq(JSON.stringify(mockBody));
    expect(request.method).to.eq("DELETE");
  });
});
