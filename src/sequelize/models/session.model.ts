import { Model, Table, Column, DataType } from 'sequelize-typescript';

export interface ISess {
    cookie: {
        originalMaxAge: number;
        expires: string;
        httpOnly: boolean;
        path: string;
    };
    passport: {
        user: number;
    };
}

@Table({
    tableName: 'session'
})
export default class Session extends Model<Session> {

    @Column
    sid!: string;

    @Column(DataType.JSON)
    sess!: ISess;

    @Column
    expire!: Date;
}