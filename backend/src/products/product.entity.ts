import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AmountUnit as Unit } from '../types';
import { Category } from '../category/category.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true, length: 50, nullable: false })
  sku!: string;

  @Column({length: 150, nullable: false})
  name!: string;

  @Column({nullable:true})
  description!: string;

  @Column({nullable: true})
  categoryId!: number;

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'SET NULL' })
  category!: Category | null;

  @Column({nullable:false})
  unit!: Unit

  @Column({type: "decimal", precision: 10, scale: 2, nullable: false})
  costPrice!: number

  @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
  sellingPrice!: number;

  @Column({nullable: false, default: 0})
  reorderLevel!: number

  @Column({default: true})
  isActive!: boolean
  
  @Column({default: 0})
  currentStock!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

}
