import {InjectionToken} from '@angular/core';

export let ROUTES_CONFIG = new InjectionToken('routes.config');

const basePaths = {
  articles: 'articles',
  add: 'new',
};

const routesNames = {
  home: '',
  error404: '404',
  articles: {
    basePath: basePaths.articles
  }
};

export const RoutesConfig: any = {
  routesNames,
  routes: {
    home: `/${routesNames.home}`,
    error404: `/${routesNames.error404}`,
    articles: {
      detail: getDetail
    }
  }
};

export function getDetail(id) {
  return `/${basePaths.articles}/${id}`;
}
export function getNew() {
  return `/${basePaths.articles}/${basePaths.add}`;
}
