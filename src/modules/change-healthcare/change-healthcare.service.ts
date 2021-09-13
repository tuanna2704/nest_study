import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import { CHANGE_HEALTHCARE_OPTIONS } from './constants';
import {
  ChangeHealthcareOptions,
  EligibilityRequestBodyInterface,
  EligibilityResponse,
} from './interfaces';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { padStart } from 'lodash';

@Injectable()
export class ChangeHealthcareService implements OnModuleInit {
  accessToken = '';

  constructor(
    private http: HttpService,
    @Inject(CHANGE_HEALTHCARE_OPTIONS)
    private _options: ChangeHealthcareOptions,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  onModuleInit() {
    this.refreshAccessToken();
  }

  async getMedicalnetworkEligibility(
    eligibilityBody: EligibilityRequestBodyInterface,
  ): Promise<AxiosResponse<EligibilityResponse>> {
    const { host } = this._options;
    try {
      const controlNumber = await this.setControlNumber();
      return await firstValueFrom(
        this.http.post(
          `${host}/medicalnetwork/eligibility/v3`,
          { ...eligibilityBody, ...{ controlNumber } },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          },
        ),
      );
    } catch ({ response }: any) {
      // response is instance of AxiosResponse
      if (response.data.error === 'access_token_expired') {
        await this.refreshAccessToken();
        return this.getMedicalnetworkEligibility(eligibilityBody);
      }
      return response;
    }
  }

  private async refreshAccessToken(): Promise<void> {
    const { host, client_id, client_secret, grant_type } = this._options;
    const {
      data: { access_token },
    } = await firstValueFrom(
      this.http.post(`${host}/apip/auth/v2/token`, {
        client_id,
        client_secret,
        grant_type,
      }),
    );
    this.accessToken = access_token;
  }

  private async setControlNumber(): Promise<string> {
    let controlNumber = (await this.cache.get('control_number')) as
      | null
      | number;
    if (controlNumber === 999999999) {
      controlNumber = null;
    }

    await this.cache.set('control_number', controlNumber + 1, { ttl: 0 });
    return padStart(controlNumber + 1, 9, '0');
  }
}
