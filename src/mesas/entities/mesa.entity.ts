import { ComandaEntity } from "@drink/comanda/entities/comanda.entity";
import { UsuarioEntity } from "@drink/usuarios/entities/usuario.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Mesas')
export class MesaEntity {
    @PrimaryGeneratedColumn()
    @Index()
    idMesa: number;

    @Column({type:'varchar', length: 100, nullable:false})
    nombreMesa:string;

    @Column({type:'int', nullable:false})
    estatusMesa:number;

    @Column({type:'int', nullable:false})
    fkIdUsuario:number;

    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.mesa)
    @JoinColumn({name: 'fkIdUsuario', referencedColumnName: 'idUsuario'})
    usuario: UsuarioEntity

    @OneToMany(() => ComandaEntity, (comanda) => comanda.mesa)
    comanda: ComandaEntity[];
}
