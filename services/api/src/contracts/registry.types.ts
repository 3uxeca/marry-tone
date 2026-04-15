export type ContractNamespace = typeof import("@marrytone/contracts");
export type ExistingContractTypeName = keyof ContractNamespace & string;

export type ContractTypeByName<TypeName extends string> = TypeName extends ExistingContractTypeName
  ? ContractNamespace[TypeName]
  : unknown;

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ContractRouteDefinition<
  RouteId extends string,
  Method extends HttpMethod,
  Path extends string,
  RequestTypeName extends string,
  ResponseTypeName extends string,
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
  string,
  string,
  unknown,
  unknown
>;

export type RouteRequest<TRoute extends AnyContractRoute> = TRoute extends ContractRouteDefinition<
  string,
  HttpMethod,
  string,
  string,
  string,
  infer RequestType,
  unknown
>
  ? RequestType
  : never;

export type RouteResponse<TRoute extends AnyContractRoute> = TRoute extends ContractRouteDefinition<
  string,
  HttpMethod,
  string,
  string,
  string,
  unknown,
  infer ResponseType
>
  ? ResponseType
  : never;

export function defineRoute<
  RouteId extends string,
  Method extends HttpMethod,
  Path extends string,
  RequestTypeName extends string,
  ResponseTypeName extends string,
>(
  route: ContractRouteDefinition<RouteId, Method, Path, RequestTypeName, ResponseTypeName>,
): ContractRouteDefinition<RouteId, Method, Path, RequestTypeName, ResponseTypeName> {
  return route;
}
