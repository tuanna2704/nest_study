### Quick Installation
Add environment below into .env file
```bash
# CHANGE_HEALTHCARE
CHANGE_HEALTHCARE_HOST=https://sandbox.apis.changehealthcare.com
CHANGE_HEALTHCARE_CLIENT_ID=xE8iAyIN4bzDklOU1x1CRCzwtvWtcdnK
CHANGE_HEALTHCARE_CLIENT_SECRET=YUNHfItlWTjrHAfy
CHANGE_HEALTHCARE_GRANT_TYPE=client_credentials
```

In src/app.module.ts. Add ChangeHealthcareModule and register configuration. For Example: 
```typescript
// src/app.module.ts
import { ChangeHealthcareModule } from 'src/modules/change-healthcare';

@Module({
  imports: [
    ChangeHealthcareModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          host: configService.get<string>('CHANGE_HEALTHCARE_HOST'),
          client_id: configService.get<string>('CHANGE_HEALTHCARE_CLIENT_ID'),
          client_secret: configService.get<string>('CHANGE_HEALTHCARE_CLIENT_SECRET'),
          grant_type: configService.get<string>('CHANGE_HEALTHCARE_GRANT_TYPE'),
        }
      }
    }),
    // Or using static configuration
    // ChangeHealthcareModule.register({
    //   host: 'CHANGE_HEALTHCARE_HOST',
    //   client_id: 'CHANGE_HEALTHCARE_CLIENT_ID',
    //   client_secret: 'CHANGE_HEALTHCARE_CLIENT_SECRET',
    //   grant_type: 'CHANGE_HEALTHCARE_GRANT_TYPE',
    // }), 
    ...
  ],
  ...
})
export class AppModule {}
```
### Usage
Inject ChangeHealthcareService into anywhere you want into app module. For Example: 
```typescript
// src/app.controller.ts
import { ChangeHealthcareService } from 'src/modules/change-healthcare';

@Controller()
export class AppController {
  constructor(
    private changeHealthcare: ChangeHealthcareService,
  ) {}

  @Post('get_medical_network_eligibility')
  async healthCheck(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.changeHealthcare.getMedicalnetworkEligibility(req.body);
    return res.status(response.status).json(response.data)
  }
}
```
