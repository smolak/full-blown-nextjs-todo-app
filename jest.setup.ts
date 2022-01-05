// jest.setup.ts
import "@testing-library/jest-dom";
// @ts-ignore
import * as matchers from "jest-extended";

expect.extend(matchers);
