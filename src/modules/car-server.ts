import { DataCar } from "./interfaces";

export class Server {

  baseUrl: string;
  path: {
    garage: string,
    winners: string
  };

  constructor() {
    this.baseUrl = 'http://127.0.0.1:3000',
    this.path = {
      garage: '/garage',
      winners: '/winners',
    }
  }

  async getAllCars() {
    const response = await fetch(`${this.baseUrl}${this.path.garage}`);
    const data = await response.json();
    return data;
  }

  async getCar(id: number) {
    const response = await fetch(`${this.baseUrl}${this.path.garage}/${id}`);
    const data = await response.json();
    return data;
  }

  async addCar(car: DataCar) {
    const response = await fetch(`${this.baseUrl}${this.path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car),
    });

    const carCreated: DataCar = await response.json();
    return carCreated;
  }

  async removeCar(id: number) {
    const response = await fetch(`${this.baseUrl}${this.path.garage}/${id}`, {
      method: 'DELETE',
    });
    const carDeleted = await response.json();

    return carDeleted;
  }

  async updateCar(id: number, data: DataCar) {
    const response = await fetch(`${this.baseUrl}${this.path.garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const car = await response.json();

    return car;
  }

}