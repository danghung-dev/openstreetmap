import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
  Min,
  ArrayMinSize,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JSONSchema } from 'class-validator-jsonschema';

@JSONSchema({
  example: {
    lat: 10.780777562575,
    lon: 10.780777562575,
  },
})
export class GeoCoderAddressArg {
  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;

  @IsNumber()
  @IsOptional()
  zoom: number;

}

class AddressResponse {
  @IsString()
  house_number: string;
}

@JSONSchema({
  example: {
    lat: '10.7805709',
    lon: '106.6846634',
    address: {
        house_number: '270 A',
        road: 'Võ Thị Sáu',
        suburb: 'Quận 3',
        state: 'Thành phố Hồ Chí Minh',
        postcode: '7000000',
        country: 'Việt Nam',
        country_code: 'vn',
    },
  },
})
export class GeoCoderAddressResponse {
  @ValidateNested()
  address: AddressResponse;
}
