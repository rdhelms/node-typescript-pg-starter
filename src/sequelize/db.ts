import { Sequelize } from 'sequelize-typescript';

const DATABASE_URL = process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

export const sequelize = new Sequelize({
    url: DATABASE_URL as string,
    dialect: 'postgres',
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production'
    },
    modelPaths: [`${__dirname}/models`],
    logging: false
});
if (process.env.NODE_ENV !== 'test') {
    sequelize.authenticate();
    sequelize.sync();
}