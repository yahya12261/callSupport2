export enum OrderByOperation {
    DESC = 'desc',
    ASC = 'asc'
  }
  export const   validateOrderOperation = (op: string): "ASC" | "DESC" => {
    switch (op) {
      case 'DESC':
        return "DESC";
      case 'ASC':
        return "ASC";
      default:
        return "ASC";
    }
  };