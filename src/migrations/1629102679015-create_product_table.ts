import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createProductTable1629102679015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar', isUnique: true },
          { name: 'price', type: 'int' },
          { name: 'isPublic', type: 'tinyInt', default: 1 },
          { name: 'content', type: 'text', isNullable: true },
          { name: 'user_id', type: 'int', isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('products');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey('products', foreignKey);
    await queryRunner.dropTable('products');
  }
}
