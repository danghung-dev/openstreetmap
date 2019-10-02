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
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { GeoCoderAddressResponse, GeoCoderAddressArg } from './address.interface';

//#region import
@JsonController('/address')
export class LocationController {
  @Get('/latlng')
  @ResponseSchema(GeoCoderAddressResponse)
  async getAddress(@QueryParams() query: GeoCoderAddressArg) {
    console.log('pram', query);
    return {a: 1};
  }

}
