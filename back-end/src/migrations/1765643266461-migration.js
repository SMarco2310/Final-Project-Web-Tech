/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Migration1765643266461 {
    name = 'Migration1765643266461'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`bio\` \`bio\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_3b934e62fb52bac909e0ddf5422\``);
        await queryRunner.query(`ALTER TABLE \`items\` CHANGE \`location\` \`location\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`items\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_01fe9039225797dbb2f43f6c074\``);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`itemId\` \`itemId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`chats\` DROP FOREIGN KEY \`FK_81e85a5a9e8dd70b806dd32b6a5\``);
        await queryRunner.query(`ALTER TABLE \`chats\` CHANGE \`item_id\` \`item_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_3b934e62fb52bac909e0ddf5422\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_01fe9039225797dbb2f43f6c074\` FOREIGN KEY (\`itemId\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chats\` ADD CONSTRAINT \`FK_81e85a5a9e8dd70b806dd32b6a5\` FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`chats\` DROP FOREIGN KEY \`FK_81e85a5a9e8dd70b806dd32b6a5\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_01fe9039225797dbb2f43f6c074\``);
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_3b934e62fb52bac909e0ddf5422\``);
        await queryRunner.query(`ALTER TABLE \`chats\` CHANGE \`item_id\` \`item_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`chats\` ADD CONSTRAINT \`FK_81e85a5a9e8dd70b806dd32b6a5\` FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`itemId\` \`itemId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_01fe9039225797dbb2f43f6c074\` FOREIGN KEY (\`itemId\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`items\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`items\` CHANGE \`location\` \`location\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_3b934e62fb52bac909e0ddf5422\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`bio\` \`bio\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT 'NULL'`);
    }
}
