import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export class JWTService {
  private static readonly SECRET_KEY = 'your_super_secret_key';
  private static readonly ALGORITHM = 'HS256';
  private static readonly EXPIRATION_TIME = '8h';

  /**
   * Generates a JWT token with the provided user UUID.
   * @param userUUID - The UUID of the user.
   * @returns The generated JWT token.
   */
  public static generateJWT(userUUID: string): string {
    const payload = { userUUID };
    return jwt.sign(payload, JWTService.SECRET_KEY, {
      algorithm: JWTService.ALGORITHM,
      expiresIn: JWTService.EXPIRATION_TIME,
    });
  }

  /**
   * Decrypts and verifies a JWT token.
   * @param token - The JWT token to be decrypted.
   * @returns The payload of the JWT token if the verification is successful, otherwise returns null.
   */
  public static decryptJWT(token: string): any {
    try {
      return jwt.verify(token, JWTService.SECRET_KEY, {
        algorithms: [JWTService.ALGORITHM],
      });
    } catch (error) {
      console.error('Error decrypting JWT:', error);
      return null;
    }
  }
}