/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse } from "../models/BaseResponse";
import type { LoginDto } from "../models/LoginDto";
import type { SignUpDto } from "../models/SignUpDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AuthenticateService {
  /**
   * @param requestBody
   * @returns BaseResponse
   * @throws ApiError
   */
  public static authControllerSignUpWithEmailPassword(
    requestBody: SignUpDto
  ): CancelablePromise<BaseResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/auths/signup",
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * @param requestBody
   * @returns BaseResponse
   * @throws ApiError
   */
  public static authControllerLogin(
    requestBody: LoginDto
  ): CancelablePromise<BaseResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/auths/login",
      body: requestBody,
      mediaType: "application/json"
    });
  }
  /**
   * @returns BaseResponse
   * @throws ApiError
   */
  public static authControllerSignWithGoogle(): CancelablePromise<BaseResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/auths/google/login"
    });
  }
  /**
   * @returns BaseResponse
   * @throws ApiError
   */
  public static authControllerCallBackGoogle(): CancelablePromise<BaseResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/auths/google/callback"
    });
  }
  /**
   * @returns BaseResponse
   * @throws ApiError
   */
  public static authControllerSignWithFacebook(): CancelablePromise<BaseResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/auths/facebook/login"
    });
  }
  /**
   * @returns BaseResponse
   * @throws ApiError
   */
  public static authControllerCallBackFacebook(): CancelablePromise<BaseResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/auths/facebook/callback"
    });
  }
  /**
   * @param refreshToken
   * @returns BaseResponse
   * @throws ApiError
   */
  public static authControllerRefreshToken(
    refreshToken: string
  ): CancelablePromise<BaseResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/auths/refreshToken/{refreshToken}",
      path: {
        refreshToken: refreshToken
      }
    });
  }
  /**
   * @returns BaseResponse
   * @throws ApiError
   */
  public static authControllerLogout(): CancelablePromise<BaseResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/auths/logout"
    });
  }
  /**
   * @returns BaseResponse
   * @throws ApiError
   */
  public static authControllerLogoutAll(): CancelablePromise<BaseResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/auths/logout-all"
    });
  }
}
