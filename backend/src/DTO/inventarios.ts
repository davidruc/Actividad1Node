import {Expose, Type, Transform} from "class-transformer";
import {IsInt, IsDate, MaxLength} from 'class-validator';
import 'reflect-metadata';

export class inventarios{
    @IsInt()
    @Expose({ name: 'id' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id: number;
    @Expose({name: "id_bodega"})
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id_bodega ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id_bodega: number;
    @Expose({name: "id_producto"})
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id_producto ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id_producto: number;
    @Expose({name: "cantidad"})
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato de cantidad ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    cantidad: number;

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
    @IsInt()
    @Expose({name: 'idInventario'})
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el parámetro ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
        idInventario: number;

    constructor(
        ID: number,
        bodega: number,
        producto: number,
        cantidad: number,
        createdBy: number,
        updateBy: number,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
        Idingresado: number
    ) {
        this.id = ID;
        this.id_bodega = bodega;
        this.id_producto = producto;
        this.cantidad = cantidad;
        this.created_by = createdBy;
        this.update_by = updateBy;
        this.created_at = createdAt;
        this.updated_at = updatedAt;
        this.deleted_at = deletedAt;
        this.idInventario = Idingresado;
    }

}
