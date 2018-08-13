import { expect } from 'chai';
import { router } from '../../controllers/index.controller';

describe('Index Controller', function() {
    it ('route handler for GET to index exists', function() {
        expect(router).to.exist;
    });
});