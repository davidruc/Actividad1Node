import {Expose, Type, Transform} from "class-transformer";

export class productos{
    @Expose({name: "id"})
    @Transform(({ value })=> parseInt(value), {toClassOnly: true})
    id: number;
    @Expose({name: "nombre"})
    @Type(()=> String)
    nombre: String;
    @Expose({name: "descripcion"})
    @Type(()=> String)
    descripcion: String;
    @Expose({ name: 'estado' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    estado: number;

    @Expose({ name: 'created_by' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    created_by: number;

    @Expose({ name: 'update_by' })
    @Transform(({ value }) => parseInt(value), { toClassOnly: true })
    update_by: number;

    @Expose({ name: 'created_at' })
    @Type(() => Date)
    created_at: Date;

    @Expose({ name: 'updated_at' })
    updated_at: Date;

    @Expose({ name: 'deleted_at' })
    deleted_at: Date;

    constructor(
        ID: number,
        nom_user: string,
        descript: string,
        estado_user: number,
        createdBy: number,
        updateBy: number,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    ) {
        this.id = ID;
        this.nombre = nom_user;
        this.descripcion = descript;
        this.estado = estado_user;
        this.created_by = createdBy;
        this.update_by = updateBy;
        this.created_at = createdAt;
        this.updated_at = updatedAt;
        this.deleted_at = deletedAt;
    }

}
