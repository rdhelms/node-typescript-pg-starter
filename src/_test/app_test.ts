import { expect } from 'chai';
import { server } from '../app';

describe('App', function() {
    it ('server starts and closes successfully', function() {
        expect(server.close()).to.be.ok;
    });
});