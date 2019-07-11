import {InjectionToken} from '@angular/core';

export let ENDPOINTS_CONFIG = new InjectionToken('endpoints.config');

export const EndpointsConfig: any = {
  articles: {
    list: 'articles',
    detail: getDetail,
    add: getNew
  }
};

export function getDetail(id) {
  return `/articles/${id}`;
}
export function getNew() {
  return `/articles/new`;
}
