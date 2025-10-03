// config/configuration.ts
export enum NodeEnv {
  Dev = 'development',
  Prod = 'production',
}

export interface DatabaseConfig {
  url: string;
}

export interface EnvironmentVariables {
  nodeEnv: NodeEnv;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC:string
//   database: DatabaseConfig;
}

export default (): EnvironmentVariables => {
  const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
  const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
   const ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC = process.env.ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC;
//   const dbUrl = process.env.DATABASE_URL;

  if (!JWT_ACCESS_SECRET) {
    throw new Error('JWT secret is not set in env');
  }

  if (!JWT_REFRESH_SECRET) {
    throw new Error('JWT refresh secret is not set in env');
  }

  if (!ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC) {
    throw new Error('Access token time is not set in env');
  }
//   if (!dbUrl) {
//     throw new Error('DATABASE_URL is not set in env');
//   }

  return {
    nodeEnv: process.env.NODE_ENV === NodeEnv.Prod ? NodeEnv.Prod : NodeEnv.Dev,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC
    // database: {
    //   url: dbUrl,
    // },
  };
};
