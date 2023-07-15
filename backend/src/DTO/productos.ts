import {Expose, Type, Transform} from "class-transformer";

export class productos{
    @Expose({name: "id"})
    @Transform(({ value })=> parseInt(value), {toClassOnly: true})
    ID: number;
    @Expose({name: "nombre"})
    @Type(()=> String)
    nombre_bodega: String;
    @Expose({name: "descripcion"})
    @Type(()=> String)
    detalles: String;
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
        this.ID = ID;
        this.nombre_bodega = nom_user;
        this.detalles = descript;
        this.estado = estado_user;
        this.created_by = createdBy;
        this.update_by = updateBy;
        this.created_at = createdAt;
        this.updated_at = updatedAt;
        this.deleted_at = deletedAt;
    }

    get nombreId(): string {
        return `${this.ID} - ${this.nombre_bodega}`;
    }
}
