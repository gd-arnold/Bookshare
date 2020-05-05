import { ICourierService } from './courier-service';
import { ICity } from './city';

export interface IDeliveryInfo {
    id: string;
    address: string;
    courierService: ICourierService;
    city: ICity;
}