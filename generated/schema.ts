/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export type paths = {
  "/users": {
    /** 新規ユーザーの作成 */
    post: operations["postUser"];
  };
  "/tests": {
    /** テスト：メールの一覧を取得 */
    get: operations["getTests"];
    /** テスト：新規メールの作成 */
    post: operations["postTest"];
  };
};

export type webhooks = Record<string, never>;

export type components = {
  schemas: {
    readonly UserBase: {
      /** @example 山田 */
      readonly familyNameKanji: string;
      /** @example 太郎 */
      readonly givenNameKanji: string;
      /** @example やまだ */
      readonly familyNameKana: string;
      /** @example たろう */
      readonly givenNameKana: string;
      /** @example 卵 */
      readonly allergy?: string;
    };
    readonly User: components["schemas"]["UserBase"] & {
      /** @example true */
      readonly isAttend: boolean;
      /** @example 1234567 */
      readonly zipCode: string;
      /** @example 東京都ｘｘ区ｘｘｘ 1-1-1 */
      readonly address1: string;
      /** @example ｘｘマンション 101号室 */
      readonly address2: string;
      /**
       * Format: email 
       * @example yamada@example.com
       */
      readonly email: string;
      /**
       * Format: ^0\d{9,10}$ 
       * @example 9012345678
       */
      readonly tel?: string;
      /** @example おめでとう！ */
      readonly message?: string;
    };
    readonly UserValidationError: readonly ({
        /**
         * @example email 
         * @enum {string}
         */
        readonly name: "familyNameKanji" | "givenNameKanji" | "familyNameKana" | "givenNameKana" | "allergy" | "isAttend" | "zipCode" | "address1" | "address2" | "email" | "tel" | "message" | "children";
        /** @example email is invalid. */
        readonly reason: string;
      })[];
    readonly Test: {
      /**
       * Format: email 
       * @example wedding@example.com
       */
      readonly email: string;
    };
    readonly TestValidationError: readonly ({
        /**
         * @example email 
         * @enum {string}
         */
        readonly name: "email";
        /** @example email is invalid. */
        readonly reason: string;
      })[];
    readonly NotFound: {
      /** @example Not found. */
      readonly message: string;
    };
  };
  responses: {
    /** @description 単一ユーザーのレスポンスボディ */
    readonly User: {
      content: {
        readonly "application/json": components["schemas"]["User"];
      };
    };
    /** @description ユーザーバリデーションエラーのレスポンスボディ */
    readonly UserValidationError: {
      content: {
        readonly "application/json": components["schemas"]["UserValidationError"];
      };
    };
    /** @description 単一テストのレスポンスボディ */
    readonly Test: {
      content: {
        readonly "application/json": components["schemas"]["Test"];
      };
    };
    /** @description 複数テストのレスポンスボディ */
    readonly Tests: {
      content: {
        readonly "application/json": readonly (components["schemas"]["Test"])[];
      };
    };
    /** @description テストバリデーションエラーのレスポンスボディ */
    readonly TestValidationError: {
      content: {
        readonly "application/json": components["schemas"]["TestValidationError"];
      };
    };
    /** @description 共通の404エラーレスポンスボディ */
    readonly NotFound: {
      content: {
        readonly "application/json": components["schemas"]["NotFound"];
      };
    };
  };
  parameters: never;
  requestBodies: {
    /** @description 新規ユーザーの作成用リクエストボディ */
    readonly PostUser: {
      readonly content: {
        readonly "application/json": components["schemas"]["User"] & {
          readonly children: readonly (components["schemas"]["UserBase"])[];
        };
      };
    };
    /** @description テスト：新規メールの作成用リクエストボディ */
    readonly PostTest: {
      readonly content: {
        readonly "application/json": components["schemas"]["Test"];
      };
    };
  };
  headers: never;
  pathItems: never;
};

export type external = Record<string, never>;

export type operations = {

  postUser: {
    /** 新規ユーザーの作成 */
    readonly requestBody: components["requestBodies"]["PostUser"];
    responses: {
      201: components["responses"]["User"];
      404: components["responses"]["NotFound"];
      422: components["responses"]["UserValidationError"];
    };
  };
  getTests: {
    /** テスト：メールの一覧を取得 */
    responses: {
      200: components["responses"]["Tests"];
      404: components["responses"]["NotFound"];
    };
  };
  postTest: {
    /** テスト：新規メールの作成 */
    readonly requestBody: components["requestBodies"]["PostTest"];
    responses: {
      201: components["responses"]["Test"];
      404: components["responses"]["NotFound"];
      422: components["responses"]["TestValidationError"];
    };
  };
};
