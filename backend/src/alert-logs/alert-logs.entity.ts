import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AlertType } from '../types';
import { Product } from 'src/products/product.entity';

@Entity()
export class AlertLog {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: true})
    productId!: number;

    @ManyToOne(() => Product, { onDelete: 'SET NULL' })
    product!: Product;

    @Column({ type: 'enum', enum: AlertType })
    alertType!: AlertType;

    @Column()
    stockAtAlert!: number;

    @Column()
    reorderLevelAtAlert!: number;

    @CreateDateColumn()
    triggeredAt!: Date;
}