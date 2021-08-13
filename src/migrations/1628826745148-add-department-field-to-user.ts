import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addDepartmentFieldToUser1628826745148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users', [
            new TableColumn({name: 'department', type: 'varchar'}),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('users', [
            new TableColumn({name: 'department', type: 'varchar'}),
        ])
    }

}
