import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1725279044282 implements MigrationInterface {
    name = 'Auto1725279044282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" (
            "id" SERIAL NOT NULL, 
            "name" character varying(128) NOT NULL, 
            "first_name" character varying(128) NOT NULL, 
            "age" integer NOT NULL, 
            "boden" character varying(1) NOT NULL, 
            "probleme" boolean NOT NULL, 
            CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(`
            INSERT into "user" SELECT generate_series(1,10) AS id, 
            substr(md5(random()::text), 1, 128) AS name, 
            substr(md5(random()::text), 1, 128) AS first_name,
            trunc(random()*10*2+20) AS age,
            (array['m', 'w'])[floor(random() * 2 + 1)] AS boden,
            random() > 0.5 AS probleme
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
