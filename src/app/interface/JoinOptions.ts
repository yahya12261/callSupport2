
export interface JoinOptions {
    alias: string;
    leftJoinAndSelect: {
      [key: string]: string;
    };
  }