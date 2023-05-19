import { Controller, Get } from '@nestjs/common';
import { AccountsService } from 'modules/accounts/accounts.service';
import { LocationsService } from 'modules/locations/locations.service';
import { TypesService } from 'modules/types/types.service';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(
    private readonly tripsService: TripsService,
    private readonly locationsService: LocationsService,
    private readonly accountsService: AccountsService,
    private readonly typesService: TypesService,
  ) {}

  @Get()
  async trips() {
    const trips = await this.tripsService.finds();
    return await Promise.all(
      trips.map(async (trip) => {
        const sub = await Promise.all([
          this.locationsService.findById(trip.locationStartId),
          this.locationsService.findById(trip.locationEndId),
          this.accountsService.findById(trip.hostId),
          this.typesService.findById(trip.typeId),
        ]);
        return {
          ...trip.dataValues,
          locationStart: sub[0]?.name,
          locationEnd: sub[1]?.name,
          host: sub[2]?.email,
          type: sub[3]?.name,
        };
      }),
    );
  }
}
