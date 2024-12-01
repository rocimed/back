import { BebidaEntity } from "@drink/bebidas/entities/bebida.entity";
import { ComandaEntity } from "@drink/comanda/entities/comanda.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('DetalleComanda')
export class DetalleComandaEntity {
    @PrimaryGeneratedColumn()
    @Index()
    idDetalleComanda: number;

    @Column({type:'float', nullable:false})
    cantidad:number;
    
    @Column({type:'float', nullable:false})
    precio:number;

    @Column({type:'int', nullable:false})
    estatusDetalle:number;

    @Column({type:'int', nullable:false})
    fkIdComanda:number;

    @Column({type:'int', nullable:false})
    fkIdBebida:number;

    @ManyToOne(() => ComandaEntity, (comanda) => comanda.detalleComanda)
    @JoinColumn({name: 'fkIdComanda', referencedColumnName: 'idComanda'})
    comanda: ComandaEntity

    @ManyToOne(() => BebidaEntity, (bebida) => bebida.detalleComanda)
    @JoinColumn({name: 'fkIdBebida', referencedColumnName: 'idBebida'})
    bebida: BebidaEntity
}
