declare namespace Express {
  export interface Request {
    user?: any; // attach decoded token
  }
}
