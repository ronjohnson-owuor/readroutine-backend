import { MigrationInterface, QueryRunner } from "typeorm";

export class Userdata1732362142285 implements MigrationInterface {
    name = 'Userdata1732362142285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`userdetails\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`nickname\` varchar(255) NOT NULL, \`tier\` int NOT NULL, \`expiry_date\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`userdetails\``);
    }

}
