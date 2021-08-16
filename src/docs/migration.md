## Migration
Migrations are stored as files in the src/migrations directory, one for each migration class. The name of the file is of the form YYYYMMDDHHMMSS_create_articles_table.rb

Reference: https://typeorm.io/#/migrations

### 1.1 Creating a Standalone Migration
Run Command
```
yarn migration:create -n create_article_table
```
will create a standalone migrate file in src/migrations folder has format like below to interact with database:
```
import {MigrationInterface, QueryRunner} from "typeorm";

export class createArticleTable1628924518162 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}

```
### 1.2 Running Migrations
```
yarn migration:run
```
This command will execute all up function in src/migrations folder

### 1.2 Revert Migrations
```
yarn migration:revert
```
This command will execute all down function in src/migrations folder

## Folder and Structure


## Database
Connect with database. Add config below to .env file
```
DB_TYPE=postgres
DB_USERNAME=postgres
DB_PASSWORD=f2740c23-01ca-451c-a7ca-473a94caff18
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=postgres
DB_SYNC=true
```

#### Example
Config for PostgreSQL
```
DB_TYPE=postgres
DB_USERNAME=postgres
DB_PASSWORD=postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=postgres
DB_SYNC=true
```

Config for MySQL
```
DB_TYPE=mariadb
DB_USERNAME=root
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=nest_database
DB_SYNC=true
```
