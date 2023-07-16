var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Type, Transform } from "class-transformer";
export class inventarios {
    constructor(ID, bodega, producto, cantidad, createdBy, updateBy, createdAt, updatedAt, deletedAt) {
        this.id = ID;
        this.id_bodega = bodega;
        this.id_producto = producto;
        this.cantidad = cantidad;
        this.created_by = createdBy;
        this.update_by = updateBy;
        this.created_at = createdAt;
        this.updated_at = updatedAt;
        this.deleted_at = deletedAt;
    }
}
__decorate([
    Expose({ name: "id" }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], inventarios.prototype, "id", void 0);
__decorate([
    Expose({ name: "id_bodega" }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], inventarios.prototype, "id_bodega", void 0);
__decorate([
    Expose({ name: "id_producto" }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], inventarios.prototype, "id_producto", void 0);
__decorate([
    Expose({ name: "cantidad" }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], inventarios.prototype, "cantidad", void 0);
__decorate([
    Expose({ name: "created_by" }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], inventarios.prototype, "created_by", void 0);
__decorate([
    Expose({ name: "update_by" }),
    Transform(({ value }) => parseInt(value), { toClassOnly: true }),
    __metadata("design:type", Number)
], inventarios.prototype, "update_by", void 0);
__decorate([
    Expose({ name: 'created_at' }),
    Type(() => Date),
    __metadata("design:type", Date)
], inventarios.prototype, "created_at", void 0);
__decorate([
    Expose({ name: 'updated_at' }),
    Type(() => Date),
    __metadata("design:type", Date)
], inventarios.prototype, "updated_at", void 0);
__decorate([
    Expose({ name: 'deleted_at' }),
    Type(() => Date),
    __metadata("design:type", Date)
], inventarios.prototype, "deleted_at", void 0);
