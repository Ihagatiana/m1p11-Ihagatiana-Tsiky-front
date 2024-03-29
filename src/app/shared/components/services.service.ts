import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { PaginatedResponse, PaginationQuery } from '../dtos/pagination.dto';
import { CreateServiceDto, UpdateServiceDto } from './services/dto/service.dto';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  public base_url = environment.baseUrl;
  constructor(private readonly httpService: HttpClient) {}
  getAll(params?: PaginationQuery) {
    return this.httpService.get<PaginatedResponse<Service>>(
      `${this.base_url}/services`,
      {
        params,
      }
    );
  }

  findOne(id: Service['_id']) {
    return this.httpService.get<Service>(`${this.base_url}/services/${id}`);
  }

  create(service: CreateServiceDto) {
    const formData = new FormData();

    formData.append('name', service.name);
    formData.append('description', service.description);
    formData.append('duration', JSON.stringify(service.duration));
    formData.append('photos', service.photos);
    formData.append('price', service.price.toString());
    formData.append('comission', service.comission.toString());
    return this.httpService.post<Service>(
      `${this.base_url}/services`,
      formData
    );
  }

  update(id: Service['_id'], service: UpdateServiceDto) {
    return this.httpService.put<Service>(
      `${this.base_url}/services/${id}`,
      service
    );
  }
  delete(id: Service['_id']) {
    return this.httpService.delete<Service>(`${this.base_url}/services/${id}`);
  }
}

export type Service = {
  _id: string;
  name: string;
  price: number;
  duration: Time;
  // duration: number;
  description: string;
  images?: any;
  displayedPrice: string;
  comission: number;
};
