// You can import your modules
// import index from '../src/index'
import { expect } from 'chai'

// import nock from "nock";
// // Requiring our app implementation
// import myProbotApp from "../src";
// import { Probot } from "probot";
// import { expect } from "chai";
// // Requiring our fixtures
// import payload from "./fixtures/issues.opened.json";
// const issueCreatedBody = { body: "Thanks for opening this issue!" };
// const fs = require("fs");
// const path = require("path");

// nock.disableNetConnect();

// describe("My Probot app", () => {
//   let probot: any;
//   let mockCert: string;

//   before((done: Function) => {
//     fs.readFile(
//       path.join(__dirname, "fixtures/mock-cert.pem"),
//       (err: Error, cert: string) => {
//         if (err) return done(err);
//         mockCert = cert;
//         done();
//       }
//     );
//   });

//   beforeEach(() => {
//     probot = new Probot({ id: 123, cert: mockCert });
//     // Load our app into probot
//     probot.load(myProbotApp);
//   });

//   it("creates a comment when an issue is opened", async done => {
//     // Test that we correctly return a test token
//     nock("https://api.github.com")
//       .post("/app/installations/2/access_tokens")
//       .reply(200, { token: "test" });

//     // // Test that a comment is posted
//     nock("https://api.github.com")
//       .post("/repos/hiimbex/testing-things/issues/1/comments", (body: any) => {
//         done(expect(body).to.eql(issueCreatedBody));
//         return true;
//       })
//       .reply(200);

//     // Receive a webhook event
//     await probot.receive({ name: "issues", payload });
//   });
// });

describe('github-app', () => {
  it('works', () => {
    expect(true).to.equal(true)
  })
})
// For more information about testing with Jest see:
// https://facebook.github.io/jest/

// For more information about using TypeScript in your tests, Jest recommends:
// https://github.com/kulshekhar/ts-jest

// For more information about testing with Nock see:
// https://github.com/nock/nock
