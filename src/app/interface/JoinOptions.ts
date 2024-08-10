
export interface JoinOptions {
    alias: string;
    innerJoinAndSelect: {
      [key: string]: string;
    };
  }