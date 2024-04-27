import pg from "pg";

export class PostgresUserDao {
    db = new pg.Pool({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT as number | undefined,
    });

    async createUsersTable() {
        await this.db.query(`create table users
        (
            user_id       integer primary key,
            password_hash varchar(100) not null
        );
        `);
    }

    async dropTables() {
        await this.db.query(`drop table if exists users;`);
    }

    close() {
        this.db.end();
    }

    #rowToUser(row) {
        return { userId: row.user_id, passwordHash: row.password_hash };
    }

    async getById(userId) {
        const { rows } = await this.db.query(
            `select user_id, password_hash
       from users
       where user_id = $1`,
            [userId]
        );
        return rows.map(this.#rowToUser)[0] || null;
    }

    async save(user) {
        await this.db.query(
            `insert into users (user_id, password_hash)
       values ($1, $2)
       on conflict (user_id) do update
           set password_hash = excluded.password_hash`,
            [user.userId, user.passwordHash]
        );
    }
}


export class PasswordService {
    users: PostgresUserDao;

    constructor(userDao: PostgresUserDao) {
        this.users = userDao;
    }

    async changePassword(userId, oldPassword, newPassword, hasher) {
        const user = await this.users.getById(userId);
        if (!hasher.verifySync(user.passwordHash, oldPassword)) {
            throw new Error("wrong old password");
        }
        user.passwordHash = hasher.hashSync(newPassword);
        await this.users.save(user);
    }
}

