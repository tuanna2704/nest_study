import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addTimestampColumnToUserTable1629015378068
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({ name: 'createdAt', type: 'datetime' }),
      new TableColumn({ name: 'updatedAt', type: 'datetime' }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      new TableColumn({ name: 'createdAt', type: 'datetime' }),
      new TableColumn({ name: 'updatedAt', type: 'datetime' }),
    ]);
  }
}
