import { Product } from "src/products/product.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 80})
    name!: string;

    @Column({nullable: true})
    parentId!: number|null;

    @ManyToOne((type)=>Category, (category)=>category.children, {onDelete:"CASCADE"})
    @JoinColumn({name:'parentId'})
    parent!: Category | null;

    @OneToMany(()=> Category, (category)=>category.parent)
    children!: Category[] |null;   
    
    @OneToMany(() => Product, (product) => product.category)
    products!: Product[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}