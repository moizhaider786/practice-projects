import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { StockMovementType, StockMovementReason } from "../types";
import { Product } from "../products/product.entity";

@Entity()
export class StockMovement{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    productId!: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product!: Product;

    @Column({nullable: false})
    type!: StockMovementType;

    @Column({nullable: false})
    quantity!: number;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    unitPrice!: number;

    @Column()
    reason!: StockMovementReason;

    @Column()
    referenceNote?: string;

    @CreateDateColumn()
    movedAt!: Date;
}