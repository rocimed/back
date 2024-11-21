import { DetalleComandaEntity } from "@drink/detalle-comanda/entities/detalle-comanda.entity";
import { MesaEntity } from "@drink/mesas/entities/mesa.entity";
import { UsuarioEntity } from "@drink/usuarios/entities/usuario.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Comanda')
export class ComandaEntity {
    @PrimaryGeneratedColumn()
    @Index()
    idComanda: number;

    @Column({type:'date', nullable: false})
    fechaComanda:Date;

    @Column({type:'int', nullable:false})
    estatusComanda:number;

    @Column({type:'float', nullable:false})
    total:number;

    @Column({type:'varchar', length: 100, nullable:false})
    metodoPago:string;

    @Column({type:'int', nullable:false})
    fkIdMesa:number;

    @ManyToOne(() => MesaEntity, (mesa) => mesa.comanda)
    @JoinColumn({name: 'fkIdMesa', referencedColumnName: 'idMesa'})
    mesa: MesaEntity

    @OneToMany(() => DetalleComandaEntity, (detalleComanda) => detalleComanda.comanda)
    detalleComanda: DetalleComandaEntity[];

}
