/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export type paths = {
  "/hello": {
    /** テスト実行 */
    get: operations["getHello"];
  };
  "/users": {
    /** 新規ユーザーの作成 */
    post: operations["postUsers"];
  };
  "/users/{userEmail}": {
    /** 指定したメールアドレスのユーザーを取得 */
    get: operations["getUserByEmail"];
  };
};

export type webhooks = Record<string, never>;

export type components = {
  schemas: {
    readonly Hello: {
      /** @example Hello World!!! */
      readonly message: string;
    };
    readonly User: {
      /**
       * Format: email 
       * @example wedding@example.com
       */
      readonly email: string;
      /** @example Wedding Taro */
      readonly name: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
};

export type external = Record<string, never>;

export type operations = {

  getHello: {
    /** テスト実行 */
    responses: {
      /** @description OK */
      200: {
        content: {
          readonly "application/json": components["schemas"]["Hello"];
        };
      };
    };
  };
  postUsers: {
    /** 新規ユーザーの作成 */
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": components["schemas"]["User"];
      };
    };
    responses: {
      /** @description CREATED */
      201: never;
    };
  };
  getUserByEmail: {
    /** 指定したメールアドレスのユーザーを取得 */
    parameters: {
        /** @description メールアドレス */
      readonly path: {
        userEmail: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          readonly "application/json": components["schemas"]["User"];
        };
      };
    };
  };
};
