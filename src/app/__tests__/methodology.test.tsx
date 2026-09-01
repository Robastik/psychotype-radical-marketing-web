import { redirect } from "next/navigation";
import Methodology from "../methodology/page";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Methodology Page", () => {
  it("redirects to /guide", () => {
    Methodology();
    expect(redirect).toHaveBeenCalledWith("/guide");
  });
});
