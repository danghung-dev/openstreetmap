//#region import
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Req,
  UseBefore,
  JsonController,
  Patch,
  QueryParam,
  QueryParams,
  Authorized,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import {
  GeoCoderAddressResponse,
  GeoCoderAddressArg,
} from './address.interface';
import axios, { AxiosRequestConfig } from 'axios';

//#region import
@JsonController('/address')
export class LocationController {
  @Authorized()
  @Get('/latlng')
  @ResponseSchema(GeoCoderAddressResponse)
  async getAddress(@QueryParams() query: GeoCoderAddressArg) {
    try {
      const option: AxiosRequestConfig = {
        url: `http://nominatim.danghung.xyz/reverse?lat=${query.lat}&lon=${
          query.lon
        }&zoom=17&format=json&accept-language=vi`,
        method: 'GET',
      };
      const response = await axios(option);
      const { data } = response;
      // const result = {
      //   address: {
      //     house_number: address.house_number || undefined,
      //     suburb: address.suburb,
      //     road: address.road,
      //     town: address.town,
      //     county: address.county,
      //     state: address.state,
      //     country: address.county,
      //   },
      // };
      const result = {
        address: data.address,
        display_name: data.display_name,
      };
      return result;
    } catch (error) {
      console.log('error', error);
    }
  }
}
