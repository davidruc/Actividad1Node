var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from "class-transformer";
import { IsInt, IsDate, MaxLength } from 'class-validator';
import 'reflect-metadata';
export class productos {
    constructor(ID, nom_user, descript, estado_user, createdBy, updateBy, createdAt, updatedAt, deletedAt) {
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
__decorate([
    IsInt(),
    Expose({ name: 'id' }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del id ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], productos.prototype, "id", void 0);
__decorate([
    Expose({ name: "nombre" }),
    MaxLength(255, { message: () => { throw { status: 401, message: `El parametro nombre no puede superar los 255 caracteres` }; } }),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato nombre incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], productos.prototype, "nombre", void 0);
__decorate([
    Expose({ name: "descripcion" }),
    MaxLength(255, { message: () => { throw { status: 401, message: `El parametro descripción no puede pasar los 255 caracteres` }; } }),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato descripcion incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], productos.prototype, "descripcion", void 0);
__decorate([
    Expose({ name: 'estado' }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del estado ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], productos.prototype, "estado", void 0);
__decorate([
    Expose({ name: 'created_by' }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato de la persona que creó el registro ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], productos.prototype, "created_by", void 0);
__decorate([
    Expose({ name: 'update_by' }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato de la persona que actualizó el registro es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], productos.prototype, "update_by", void 0);
__decorate([
    IsDate(),
    Expose({ name: 'created_at' }),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value) || typeof value === "undefined")
        return (value);
    else
        throw { status: 400, message: `el parámetro ingresado para fecha no es válido, debe seguir la sintaxis AAAA-MM-DD` }; }, { toClassOnly: true }),
    __metadata("design:type", Date)
], productos.prototype, "created_at", void 0);
__decorate([
    IsDate(),
    Expose({ name: 'updated_at' }),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value) || typeof value === "undefined")
        return (value);
    else
        throw { status: 400, message: `el parámetro ingresado para fecha no es válido, debe seguir la sintaxis AAAA-MM-DD` }; }, { toClassOnly: true }),
    __metadata("design:type", Date)
], productos.prototype, "updated_at", void 0);
__decorate([
    IsDate(),
    Expose({ name: 'deleted_at' }),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value) || typeof value === "undefined")
        return (value);
    else
        throw { status: 400, message: `el parámetro ingresado para fecha no es válido, debe seguir la sintaxis AAAA-MM-DD` }; }, { toClassOnly: true }),
    __metadata("design:type", Date)
], productos.prototype, "deleted_at", void 0);
