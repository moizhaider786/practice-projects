import { MigrationInterface, QueryRunner } from "typeorm";

export class StockMovementsTrigger1779798210632 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TRIGGER update_current_stock
            AFTER INSERT ON stock_movement
            FOR EACH ROW
            BEGIN
                IF NEW.type = 'IN' THEN
                    UPDATE product
                    SET currentStock = currentStock + NEW.quantity
                    WHERE id = NEW.productId;
                ELSEIF NEW.type = 'OUT' THEN
                    UPDATE product
                    SET currentStock = currentStock - NEW.quantity
                    WHERE id = NEW.productId;
                ELSE
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid movement type';
                END IF;
            END;
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER update_current_stock;
        `)
    }

}
