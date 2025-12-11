/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Migration1765332588699 {
    name = 'Migration1765332588699'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`chat_id\` int NOT NULL, \`sender_id\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`isRead\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chats\` (\`id\` int NOT NULL AUTO_INCREMENT, \`item_id\` int NOT NULL, \`user1_id\` varchar(255) NOT NULL, \`user2_id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`student_id\` \`student_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_3b934e62fb52bac909e0ddf5422\``);
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_a3cb147daf5e5970d7f553b1a0b\``);
        await queryRunner.query(`ALTER TABLE \`items\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`items\` CHANGE \`location_id\` \`location_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_01fe9039225797dbb2f43f6c074\``);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`itemId\` \`itemId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`locations\` CHANGE \`lon\` \`lon\` decimal(10,6) NULL`);
        await queryRunner.query(`ALTER TABLE \`locations\` CHANGE \`lat\` \`lat\` decimal(10,6) NULL`);
        await queryRunner.query(`ALTER TABLE \`locations\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_3b934e62fb52bac909e0ddf5422\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_a3cb147daf5e5970d7f553b1a0b\` FOREIGN KEY (\`location_id\`) REFERENCES \`locations\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_01fe9039225797dbb2f43f6c074\` FOREIGN KEY (\`itemId\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_7540635fef1922f0b156b9ef74f\` FOREIGN KEY (\`chat_id\`) REFERENCES \`chats\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_22133395bd13b970ccd0c34ab22\` FOREIGN KEY (\`sender_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chats\` ADD CONSTRAINT \`FK_81e85a5a9e8dd70b806dd32b6a5\` FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chats\` ADD CONSTRAINT \`FK_05b8003b6a5c6a9b16cb31fea2a\` FOREIGN KEY (\`user1_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chats\` ADD CONSTRAINT \`FK_a14c79d67133bb0df4a71807a74\` FOREIGN KEY (\`user2_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`chats\` DROP FOREIGN KEY \`FK_a14c79d67133bb0df4a71807a74\``);
        await queryRunner.query(`ALTER TABLE \`chats\` DROP FOREIGN KEY \`FK_05b8003b6a5c6a9b16cb31fea2a\``);
        await queryRunner.query(`ALTER TABLE \`chats\` DROP FOREIGN KEY \`FK_81e85a5a9e8dd70b806dd32b6a5\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_22133395bd13b970ccd0c34ab22\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_7540635fef1922f0b156b9ef74f\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_01fe9039225797dbb2f43f6c074\``);
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_a3cb147daf5e5970d7f553b1a0b\``);
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_3b934e62fb52bac909e0ddf5422\``);
        await queryRunner.query(`ALTER TABLE \`locations\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`locations\` CHANGE \`lat\` \`lat\` decimal(10,6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`locations\` CHANGE \`lon\` \`lon\` decimal(10,6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`itemId\` \`itemId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_01fe9039225797dbb2f43f6c074\` FOREIGN KEY (\`itemId\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`items\` CHANGE \`location_id\` \`location_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`items\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_a3cb147daf5e5970d7f553b1a0b\` FOREIGN KEY (\`location_id\`) REFERENCES \`locations\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_3b934e62fb52bac909e0ddf5422\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`student_id\` \`student_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`chats\``);
        await queryRunner.query(`DROP TABLE \`messages\``);
    }
}
