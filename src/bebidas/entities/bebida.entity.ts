import { DetalleComandaEntity } from "@drink/detalle-comanda/entities/detalle-comanda.entity";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Bebida')
export class BebidaEntity {
    @PrimaryGeneratedColumn()
    @Index()
    idBebida: number;

    @Column({type:'varchar', length: 100, nullable:false})
    nombreBebida:string;

    @Column({type:'float', nullable:false})
    precioBebida:number;

    @Column({ type: 'int', nullable: false })
    stock: number;

    @Column({ type: 'varchar', length: 'max', nullable: false })
    url: string;

    @OneToMany(() => DetalleComandaEntity, (detalleComanda) => detalleComanda.bebida)
    detalleComanda: DetalleComandaEntity[];
}
