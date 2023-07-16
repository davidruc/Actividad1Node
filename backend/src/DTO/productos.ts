import {Expose, Transform} from "class-transformer";
import {IsInt, IsDate, MaxLength} from 'class-validator';
import 'reflect-metadata';

export class productos{
    @IsInt()
    @Expose({ name: 'id' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id: number;
    @Expose({name: "nombre"})
    @MaxLength(255, {message: ()=>{throw {status: 401, message: `El parametro nombre no puede superar los 255 caracteres`}}})
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre incumple los parametros acordados`};},{ toClassOnly: true})
    nombre: String;
    @Expose({name: "descripcion"})
    @MaxLength(255, {message: ()=>{throw {status: 401, message: `El parametro descripción no puede pasar los 255 caracteres`}}})
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato descripcion incumple los parametros acordados`};},{ toClassOnly: true})
    descripcion: String;
    @Expose({ name: 'estado' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del estado ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    estado: number;

    @Expose({ name: 'created_by' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato de la persona que creó el registro ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    created_by: number;
    @Expose({ name: 'update_by' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato de la persona que actualizó el registro es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    update_by: number;
    @IsDate()
    @Expose({ name: 'created_at' })
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || typeof value === "undefined") return(value); else throw {status: 400, message:`el parámetro ingresado para fecha no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
    created_at: Date;
    @IsDate()
    @Expose({ name: 'updated_at' })
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || typeof value === "undefined") return(value); else throw {status: 400, message:`el parámetro ingresado para fecha no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
    updated_at: Date;
    @IsDate()
    @Expose({ name: 'deleted_at' })
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || typeof value === "undefined") return(value); else throw {status: 400, message:`el parámetro ingresado para fecha no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
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
