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
                    SELECT currentStock INTO @currentStock FROM product WHERE id = NEW.productId;
                    IF @currentStock < NEW.quantity THEN
                        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient stock for this movement';
                    END IF;
                    UPDATE product
                    SET currentStock = currentStock - NEW.quantity
                    WHERE id = NEW.productId;
                    SELECT currentStock, reorderLevel INTO @currentStock, @reorderLevel FROM product WHERE id = NEW.productId;
                    IF @currentStock = 0 THEN
                        INSERT INTO alert_log (productId, alertType, stockAtAlert, reorderLevelAtAlert)
                        VALUES (NEW.productId, IF(@currentStock = 0, 'STOCK_OUT', 'REORDER_LEVEL'), @currentStock, @reorderLevel);
                    ELSEIF @currentStock < @reorderLevel THEN
                        INSERT INTO alert_log (productId, alertType, stockAtAlert, reorderLevelAtAlert)
                        VALUES (NEW.productId, 'REORDER_LEVEL', @currentStock, @reorderLevel);
                    END IF;
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
