import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    url: process.env.DATABASE_URL as string,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    },
    modelPaths: [`${__dirname}/models`]
});