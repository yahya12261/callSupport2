export enum MethodTypes {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
export const getMethodType = (methodString: string): MethodTypes => {
  switch (methodString) {
    case 'POST':
      return MethodTypes.POST;
    case 'GET':
      return MethodTypes.GET;
    case 'PUT':
      return MethodTypes.PUT;
    case 'PATCH':
      return MethodTypes.PATCH;
    case 'DELETE':
      return MethodTypes.DELETE;
    default:
      throw new Error(`Invalid HTTP method: ${methodString}`);
  }
};