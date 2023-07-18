import chai from "chai";
import mongoose from "mongoose";
import config from "../../src/config/config.js";
import { Session } from "./../../src/dao/db/session.dao.js";
import { SessionsMock } from "../mocks/sessions.mocks.js";

const expect = chai.expect;

const {
  mongo: { dbTestUrl },
} = config;

describe("Pruebas del módulo de sesiones", () => {
  before(function () {
    mongoose.connect(dbTestUrl);
    this.sessionDao = new Session();
    this.sessionMock = new SessionsMock();
  });
  beforeEach(function () {
    mongoose.connection.collections.sessions.drop();
  });

  it("El dao debe crear una sesión", async function () {
    const sessionMock = this.sessionMock.session();
    const result = await this.sessionDao.addSession(sessionMock);

    expect(result).to.be.an("object");
    expect(result).to.be.ok;
    expect(result).to.have.property("_id");
  });

  it("El dao debe autenticar un usuario", async function () {
    const username = "username";
    const password = "password";
    const session = await this.sessionDao.addSession({ username, password });
    const result = await this.sessionDao.authenticateUser(username, password);

    expect(result).to.be.ok;
    expect(result.username === username);
  });

  it("El dao debe desautenticar un usuario", async function () {
    const sessionId = 1;
    const deleteSession = await this.sessionDao.deleteSession(sessionId);

    expect(deleteSession).to.be.ok;
  });
});
