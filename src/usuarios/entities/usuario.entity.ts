import { ComandaEntity } from "@drink/comanda/entities/comanda.entity";
import { MesaEntity } from "@drink/mesas/entities/mesa.entity";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Usuarios')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    @Index()
    idUsuario: number;

    @Column({type:'varchar', length: 100, nullable:false})
    nombreUsuario:string;

    @Column({type:'varchar', length: 100, nullable:false})
    apellidoPat:string;

    @Column({type:'varchar', length: 100, nullable:false})
    apellidoMat:string;

    @Column({type:'varchar', length: 300, nullable:false})
    contrasena:string;

    @Column({type:'int', nullable:false})
    rol:number;

    @OneToMany(() => MesaEntity, (mesa) => mesa.usuario)
    mesa: MesaEntity[];

    // @OneToMany(() => ComandaEntity, (comanda) => comanda.usuario)
    // comanda: ComandaEntity[];
}
