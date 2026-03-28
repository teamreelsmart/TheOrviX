declare module "jsonwebtoken" {
  export interface SignOptions {
    expiresIn?: string | number;
  }

  const jwt: {
    sign(payload: object, secretOrPrivateKey: string, options?: SignOptions): string;
    verify(token: string, secretOrPublicKey: string): unknown;
  };

  export default jwt;
}
