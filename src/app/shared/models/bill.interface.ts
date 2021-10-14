export interface Bills {
    NumeroFactura: number;
    Fecha: Date;
    TipodePago: string;
    Detalle: Detalle[];
    DocumentoCliente: number;
    NombreCliente: string;
    Descuento: number;
    IVA: number;
    id: string;
}

export interface Detalle {
    Item: number;
    Producto: string;
    Cantidad: number;
    PrecioUnitario: number;
}