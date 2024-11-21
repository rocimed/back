import { MigrationInterface, QueryRunner } from "typeorm";

export class FifthMigration1732137911893 implements MigrationInterface {
    name = 'FifthMigration1732137911893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Bebida" ("idBebida" int NOT NULL IDENTITY(1,1), "nombreBebida" varchar(100) NOT NULL, "precioBebida" float NOT NULL, "stock" int NOT NULL, "url" varchar(max) NOT NULL, CONSTRAINT "PK_9d98daf6d3e7b5666be8526f865" PRIMARY KEY ("idBebida"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9d98daf6d3e7b5666be8526f86" ON "Bebida" ("idBebida") `);
        await queryRunner.query(`CREATE TABLE "DetalleComanda" ("idDetalleComanda" int NOT NULL IDENTITY(1,1), "cantidad" float NOT NULL, "precio" float NOT NULL, "estatusDetalle" int NOT NULL, "fkIdComanda" int NOT NULL, "fkIdBebida" int NOT NULL, CONSTRAINT "PK_60717195e9972b6d5278d773ad8" PRIMARY KEY ("idDetalleComanda"))`);
        await queryRunner.query(`CREATE INDEX "IDX_60717195e9972b6d5278d773ad" ON "DetalleComanda" ("idDetalleComanda") `);
        await queryRunner.query(`CREATE TABLE "Comanda" ("idComanda" int NOT NULL IDENTITY(1,1), "fechaComanda" date NOT NULL, "estatusComanda" int NOT NULL, "total" float NOT NULL, "metodoPago" varchar(100) NOT NULL, "fkIdMesa" int NOT NULL, CONSTRAINT "PK_43d00d14dfb2790cedca35dc3e1" PRIMARY KEY ("idComanda"))`);
        await queryRunner.query(`CREATE INDEX "IDX_43d00d14dfb2790cedca35dc3e" ON "Comanda" ("idComanda") `);
        await queryRunner.query(`CREATE TABLE "Mesas" ("idMesa" int NOT NULL IDENTITY(1,1), "nombreMesa" varchar(100) NOT NULL, "estatusMesa" int NOT NULL, "fkIdUsuario" int NOT NULL, CONSTRAINT "PK_5ab18ee227bf07628282d7dfdc6" PRIMARY KEY ("idMesa"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5ab18ee227bf07628282d7dfdc" ON "Mesas" ("idMesa") `);
        await queryRunner.query(`CREATE TABLE "Usuarios" ("idUsuario" int NOT NULL IDENTITY(1,1), "nombreUsuario" varchar(100) NOT NULL, "apellidoPat" varchar(100) NOT NULL, "apellidoMat" varchar(100) NOT NULL, "contrasena" varchar(300) NOT NULL, "rol" int NOT NULL, CONSTRAINT "PK_4f49fd4960add50a9231ce14bab" PRIMARY KEY ("idUsuario"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4f49fd4960add50a9231ce14ba" ON "Usuarios" ("idUsuario") `);
        await queryRunner.query(`ALTER TABLE "DetalleComanda" ADD CONSTRAINT "FK_a32ad95f106f6908200324f0c5e" FOREIGN KEY ("fkIdComanda") REFERENCES "Comanda"("idComanda") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "DetalleComanda" ADD CONSTRAINT "FK_14fb5ca102635cb4b9e89b783ea" FOREIGN KEY ("fkIdBebida") REFERENCES "Bebida"("idBebida") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comanda" ADD CONSTRAINT "FK_6035040913eccfbac24d698eafe" FOREIGN KEY ("fkIdMesa") REFERENCES "Mesas"("idMesa") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Mesas" ADD CONSTRAINT "FK_d6b835ca3ea4ca98d31b8e8eccb" FOREIGN KEY ("fkIdUsuario") REFERENCES "Usuarios"("idUsuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Mesas" DROP CONSTRAINT "FK_d6b835ca3ea4ca98d31b8e8eccb"`);
        await queryRunner.query(`ALTER TABLE "Comanda" DROP CONSTRAINT "FK_6035040913eccfbac24d698eafe"`);
        await queryRunner.query(`ALTER TABLE "DetalleComanda" DROP CONSTRAINT "FK_14fb5ca102635cb4b9e89b783ea"`);
        await queryRunner.query(`ALTER TABLE "DetalleComanda" DROP CONSTRAINT "FK_a32ad95f106f6908200324f0c5e"`);
        await queryRunner.query(`DROP INDEX "IDX_4f49fd4960add50a9231ce14ba" ON "Usuarios"`);
        await queryRunner.query(`DROP TABLE "Usuarios"`);
        await queryRunner.query(`DROP INDEX "IDX_5ab18ee227bf07628282d7dfdc" ON "Mesas"`);
        await queryRunner.query(`DROP TABLE "Mesas"`);
        await queryRunner.query(`DROP INDEX "IDX_43d00d14dfb2790cedca35dc3e" ON "Comanda"`);
        await queryRunner.query(`DROP TABLE "Comanda"`);
        await queryRunner.query(`DROP INDEX "IDX_60717195e9972b6d5278d773ad" ON "DetalleComanda"`);
        await queryRunner.query(`DROP TABLE "DetalleComanda"`);
        await queryRunner.query(`DROP INDEX "IDX_9d98daf6d3e7b5666be8526f86" ON "Bebida"`);
        await queryRunner.query(`DROP TABLE "Bebida"`);
    }

}
