export interface Request {
    id: string;
    product_name: string;
    quantity: number;
    status: string;
    reason: string;
    price?: string;
    productLink?: string;
    deliveryPrice?: string;
    deliveryTime?: string;
    rejectReason?: string;
}

export interface Props {
    request: Request;
    onReasonChange: (no: string, newReason: string) => void;
}
