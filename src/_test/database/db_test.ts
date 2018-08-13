import { expect } from 'chai';
import { pool } from '../../database/db';

describe('Database', function() {
    it ('Pool is created', function() {
        expect(pool).to.exist;
    });
});