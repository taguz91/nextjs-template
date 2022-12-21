import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { getApiKeyHeader } from 'src/helpers/app';

import {
  ForbiddenException,
  NotFoundError,
  ServerError,
  UnauthorizedError,
  UnprocesableDataError,
} from './errors/common';

export class Api {
  static api: null | AxiosInstance = null;

  static getApi(token?: string): AxiosInstance {
    if (this.api === null) {
      const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_URL_BASE,
      });

      this.api = instance;
    }

    if (token) {
      // set JWT or API KEY
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      this.api.defaults.headers.common['X-Api-Key'] = getApiKeyHeader();
    }

    return this.api;
  }

  static isServer() {
    return typeof window === 'undefined';
  }

  static async get<T>(
    url: string,
    token?: string,
    params?: Record<string, any>,
  ): Promise<T | undefined> {
    try {
      const response = await this.getApi(token).get<T>(url, {
        params: params,
      });

      return this.response(response);
    } catch (err) {
      this.error(err);
    }
  }

  static async post<T>(
    url: string,
    token?: string,
    body?: Record<string, any>,
  ): Promise<T | undefined> {
    try {
      const response = await this.getApi(token).post<T>(url, body);

      return this.response(response);
    } catch (err) {
      this.error(err);
    }
  }

  static async put<T>(
    url: string,
    token?: string,
    body?: Record<string, any>,
  ): Promise<T | undefined> {
    try {
      const response = await this.getApi(token).put<T>(url, body);

      return this.response(response);
    } catch (err) {
      this.error(err);
    }
  }

  static response(response: AxiosResponse) {
    return response.data;
  }

  static error(error: any | AxiosError) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }

    if (error.response && error.response?.status < 500) {
      const status = error.response?.status;

      const data = error.response.data;

      switch (status) {
        case 401:
          throw new UnauthorizedError(data?.errorDescripcion || 'Inicia sesion');

        case 403:
          throw new ForbiddenException(data?.errorDescripcion || 'Sin permisos');

        case 404:
          throw new NotFoundError(data?.errorDescripcion || 'No encontrado');

        case 422:
          throw new UnprocesableDataError(data?.errors, data?.summary || []);

        default:
          throw new Error(data?.errorDescripcion || 'Error al procesar tu solicitud');
      }
    }

    throw new ServerError(
      `A ocurrido un error con el servidor, ponganse en contacto con el administrador del sitio.\nCodigo: ${
        error?.response?.data?.code || '00-00-00'
      }`,
    );
  }
}
