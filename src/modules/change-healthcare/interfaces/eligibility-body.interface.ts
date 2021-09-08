interface EncounterRequestBody {
  beginningDateOfService: string;
  endDateOfService: string;
  serviceTypeCodes?: string[];
  ProcedureId?: string;
}

interface SubcriberRequestBody {
  memberId: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  ssn: string;
  idCard: string;
}

interface ProviderRequestBody {
  organizationName: string;
  npi: string;
  serviceProviderNumber?: string;
  providerCode?: string;
  referenceIdentification?: string;
}

interface DependentRequestBody {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  groupNumber: string;
}

interface ProviderResponse {
  providerName: string;
  entityIdentifier: string;
  entityType: string;
  npi: string;
}

interface SubcriberResponse {
  firstName: string;
  lastName: string;
  gender: string;
  entityIdentifier: string;
  entityType: string;
  dateOfBirth: string;
  ssn: string;
  provider: Object;
}

interface SubscriberTraceNumbersResponse {
  traceTypeCode: string;
  traceType: string;
  referenceIdentification: string;
  originatingCompanyIdentifier: string;
}

interface PayerResponse {
  entityIdentifier: string;
  entityType: string;
  name: string;
  payorIdentification: string;
}

interface PlanInformationResponse {
  socialSecurityNumber: string;
}

interface PlanDateInformationResponse {
  plan: string;
}

interface PlanStatusResponse {
  statusCode: string;
  status: string;
  planDetails: string;
  serviceTypeCodes: string[];
}

interface BenefitsInformationResponse {
  code: string;
  name: string;
  coverageLevelCode: string;
  coverageLevel: string;
  serviceTypeCodes: string[];
  serviceTypes: string[];
  insuranceTypeCode: string;
  insuranceType: string;
  planCoverage: string;
  benefitsDateInformation: {
    benefit: string;
  };
}
interface EligibilityResponseSuccessInterface {
  controlNumber: string;
  reassociationKey: string;
  provider: ProviderResponse;
  subcriber: SubcriberResponse;
  subscriberTraceNumbers: SubscriberTraceNumbersResponse[];
  payer: PayerResponse;
  planInformation: PlanInformationResponse;
  planDateInformation: PlanDateInformationResponse;
  planStatus: PlanStatusResponse[];
  benefitsInformation: BenefitsInformationResponse[];
}

interface EligibilityResponseErrorInterface {
  error: string;
  error_description: string;
  traceId: string;
}

export interface EligibilityRequestBodyInterface {
  controlNumber: string;
  tradingPartnerServiceId: string;
  encounter: EncounterRequestBody;
  subscriber: SubcriberRequestBody;
  provider: ProviderRequestBody;
  dependents?: DependentRequestBody[];
}

export interface EligibilityResponse
  extends EligibilityResponseSuccessInterface,
    EligibilityResponseErrorInterface {}
