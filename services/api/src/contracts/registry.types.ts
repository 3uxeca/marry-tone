import type { ContractTypeName, ContractTypeRegistry } from "@marrytone/contracts";

export type ExistingContractTypeName = ContractTypeName;
export type ContractTypeByName<TypeName extends ExistingContractTypeName> = ContractTypeRegistry[TypeName];

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ContractRouteDefinition<
  RouteId extends string,
  Method extends HttpMethod,
  Path extends string,
  RequestTypeName extends ExistingContractTypeName,
  ResponseTypeName extends ExistingContractTypeName,
  RequestType = ContractTypeByName<RequestTypeName>,
  ResponseType = ContractTypeByName<ResponseTypeName>,
> {
  readonly routeId: RouteId;
  readonly method: Method;
  readonly path: Path;
  readonly requestTypeName: RequestTypeName;
  readonly responseTypeName: ResponseTypeName;
  readonly __requestType?: RequestType;
  readonly __responseType?: ResponseType;
}

export type AnyContractRoute = ContractRouteDefinition<
  string,
  HttpMethod,
  string,
  ExistingContractTypeName,
  ExistingContractTypeName,
  ContractTypeByName<ExistingContractTypeName>,
  ContractTypeByName<ExistingContractTypeName>
>;

export type RouteRequest<TRoute extends AnyContractRoute> = TRoute extends ContractRouteDefinition<
  string,
  HttpMethod,
  string,
  ExistingContractTypeName,
  ExistingContractTypeName,
  infer RequestType,
  unknown
>
  ? RequestType
  : never;

export type RouteResponse<TRoute extends AnyContractRoute> = TRoute extends ContractRouteDefinition<
  string,
  HttpMethod,
  string,
  ExistingContractTypeName,
  ExistingContractTypeName,
  unknown,
  infer ResponseType
>
  ? ResponseType
  : never;

export function defineRoute<
  RouteId extends string,
  Method extends HttpMethod,
  Path extends string,
  RequestTypeName extends ExistingContractTypeName,
  ResponseTypeName extends ExistingContractTypeName,
>(
  route: ContractRouteDefinition<RouteId, Method, Path, RequestTypeName, ResponseTypeName>,
): ContractRouteDefinition<RouteId, Method, Path, RequestTypeName, ResponseTypeName> {
  return route;
}
